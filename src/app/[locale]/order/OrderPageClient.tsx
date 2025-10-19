'use client'

import { useCartStore } from '@/store/slices/cart'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { CreditCard, User, Mail, Phone, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { CartItem } from '@/store/slices/cart'
import { PaymentService } from '@/services/payment.service'
import { useAuthStore } from '@/store/slices/auth'
import { UserService } from '@/services/user.service'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import z from 'zod'

interface UserInfo {
  fullName: string
  email: string
  phone?: string
}

interface OrderData {
  items: CartItem[]
  userInfo: UserInfo
  paymentMethod: 'cod' | 'vnpay'
  totals: {
    subtotal: number
    discount: number
    total: number
  }
}

function formatPrice (price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

export default function OrderPageClient () {
  const { items } = useCartStore()
  const router = useRouter()
  const pathname = usePathname()
  const locale = pathname?.split('/')?.[1] || 'vi'

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: ''
    }
  })

  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: '',
    email: '',
    phone: ''
  })

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vnpay'>('vnpay')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { token, user } = useAuthStore()

  const [loading, setLoading] = useState<boolean>(true)
  // Selected items for checkout (from cart selection)
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([])
  const [selectedTotals, setSelectedTotals] = useState({
    subtotal: 0,
    discount: 0,
    total: 0
  })

  const computeTotals = (arr: CartItem[]) => {
    const st = arr.reduce((s, it) => s + it.price * (it.quantity ?? 1), 0)
    const dis = arr.reduce((s, it) => {
      const original = (it as any).originalPrice ?? it.price
      return s + Math.max(0, (original - it.price)) * (it.quantity ?? 1)
    }, 0)
    return {
      subtotal: st,
      discount: dis,
      total: st
    }
  }

  // Enforce authentication: redirect to login if not logged in (hydration-safe)
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Peek persisted auth to avoid redirecting before Zustand rehydrates
    let persistedToken: string | null = null
    let persistedUser: unknown = null
    try {
      const raw = localStorage.getItem('auth-storage')
      if (raw) {
        const parsed = JSON.parse(raw)
        persistedToken = parsed?.state?.token ?? null
        persistedUser = parsed?.state?.user ?? null
      }
    } catch {}

    const hasAuth = Boolean(token || persistedToken)
    const hasUser = Boolean(user || persistedUser)

    if (!hasAuth || !hasUser) {
      const current = window.location.pathname || `/${locale}/order`
      router.replace(`/${locale}/login?redirect=${encodeURIComponent(current)}`)
    }
  }, [token, user, router, locale])

  // Prefill user info from profile to improve UX
  useEffect(() => {
    if (user) {
      setUserInfo(prev => ({
        ...prev,
        fullName: prev.fullName || user.fullName || '',
        email: prev.email || user.email || ''
      }))
    }
  }, [user])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('auth-storage')
        if (!token) {
          toast.error('Bạn chưa đăng nhập, vui lòng đăng nhập lại')
          router.push('/login')
          return
        }

        const res = await UserService.getProfile()
        if (res.user) setUserInfo(res.user)
        else {
          toast.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại')
          router.push('/login')
        }
      } catch (error: unknown) {
        toast.error('Không thể tải thông tin, vui lòng đăng nhập lại')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [router])

  // Hydrate danh sách checkout từ localStorage (ưu tiên checkout_items), fallback sang items trong store
  useEffect(() => {
    try {
      const rawItems = typeof window !== 'undefined' ? localStorage.getItem('checkout_items') : null
      const rawTotals = typeof window !== 'undefined' ? localStorage.getItem('checkout_totals') : null

      if (rawItems) {
        const parsedItems = JSON.parse(rawItems) as CartItem[]
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          setSelectedItems(parsedItems)
          if (rawTotals) {
            const t = JSON.parse(rawTotals) as { subtotal: number; discount: number; total: number }
            setSelectedTotals(t)
          } else {
            setSelectedTotals(computeTotals(parsedItems))
          }
          return
        }
      }

      // Fallback: nếu chưa có checkout_items nhưng store có items thì dùng tạm
      if (items.length > 0) {
        setSelectedItems(items)
        setSelectedTotals(computeTotals(items))
        return
      }

      // Không có gì để thanh toán -> quay lại giỏ hàng
      router.push(`/${locale}/cart`)
    } catch {
      router.push(`/${locale}/cart`)
    }
  }, [items, router, locale])

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateForm = (): boolean => {
    if (!userInfo.fullName.trim()) {
      toast.error('Vui lòng nhập họ tên')
      return false
    }
    if (!userInfo.email.trim()) {
      toast.error('Vui lòng nhập email')
      return false
    }
    // Phone is optional; validate format only if provided
    if (userInfo.phone && userInfo.phone.trim()) {
      const phoneRegex = /^[0-9]{10,11}$/
      if (!phoneRegex.test(userInfo.phone.replace(/\s/g, ''))) {
        toast.error('Số điện thoại không hợp lệ')
        return false
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userInfo.email)) {
      toast.error('Email không hợp lệ')
      return false
    }

    return true
  }

  const handleSubmitOrder = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      if (paymentMethod === 'vnpay') {
        if (!token) {
          toast.error('Bạn cần đăng nhập để thanh toán.')
          return
        }
        const courseIds = selectedItems.map(i => i._id)
        const first = selectedItems[0]?.courseName || 'Khóa học'
        const extra = selectedItems.length - 1
        const orderInfo =
          extra > 0
            ? `${first} +${extra} khóa khác`
            : `Thanh toán khóa học: ${first}`
        const res = await PaymentService.createVNPayPayment(
          { courseIds, orderInfo },
          token
        )
        if (res.success && res.paymentUrl) {
          localStorage.setItem('checkout_items', JSON.stringify(selectedItems))
          localStorage.setItem('checkout_totals', JSON.stringify(selectedTotals))
          window.location.href = res.paymentUrl
          return
        } else {
          throw new Error('Không nhận được paymentUrl từ server')
        }
      } else {
        const orderId = Date.now().toString()
        const orderData: OrderData = {
          items: selectedItems,
          userInfo,
          paymentMethod,
          totals: selectedTotals
        }
        localStorage.setItem(`order_${orderId}`, JSON.stringify(orderData))
        // Tùy yêu cầu: có thể chỉ nên xóa các item đã thanh toán thay vì clear toàn bộ giỏ
        toast.success('Đặt hàng thành công!')
        router.push(`/${locale}/order-success?id=${orderId}&payment=cod`)
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi đặt hàng')
      console.error('Order error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (selectedItems.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
            Giỏ hàng trống
          </h2>
          <p className='text-gray-600 mb-4'>
            Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng
          </p>
          <button
            onClick={() => router.push(`/${locale}/cart`)}
            className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
          >
            Quay lại giỏ hàng
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <button
            onClick={() => router.back()}
            className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4'
          >
            <ArrowLeft className='h-4 w-4' />
            <ArrowLeft className='h-4 w-4' />
            Quay lại
          </button>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Đặt hàng</h1>
          <p className='text-gray-600'>Hoàn tất thông tin để đặt hàng</p>
        </div>

        <div className='lg:grid lg:grid-cols-12 lg:gap-8'>
          {/* Thông tin người dùng - Bên trái */}
          <div className='lg:col-span-7'>
            <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
              <h2 className='text-xl font-semibold mb-6 flex items-center gap-2'>
                <User className='h-5 w-5' />
                Thông tin người nhận
              </h2>

              <div className='space-y-4'>
                <Form {...form}>
                  <FormField
                    name={'fullName'}
                    render={({ field }) => (
                      <FormItem className='mb-5'>
                        <FormLabel>Họ và tên</FormLabel>
                        <FormControl>
                          <Input
                            type='text'
                            value={userInfo.fullName}
                            className='rounded-md py-5 border-primary'
                            onChange={e =>
                              handleInputChange('fullName', e.target.value)
                            }
                            placeholder='Nhập họ và tên'
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={'email'}
                    render={({ field }) => (
                      <FormItem className='mb-5'>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            value={userInfo.email}
                            className='rounded-md py-5 border-primary'
                            onChange={e =>
                              handleInputChange('email', e.target.value)
                            }
                            placeholder='example@email.com'
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={'phone'}
                    render={({ field }) => (
                      <FormItem className='mb-5'>
                        <FormLabel>Số điện thoại (không bắt buộc)</FormLabel>
                        <FormControl>
                          <Input
                            type='tel'
                            value={userInfo.phone}
                            onChange={e =>
                              handleInputChange('phone', e.target.value)
                            }
                            className='rounded-md py-5 border-primary'
                            placeholder='0123456789'
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Form>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className='bg-white rounded-lg shadow-sm p-6 flex flex-col gap-6'>
              <h2 className='text-xl font-semibold flex items-center gap-2'>
                <CreditCard className='h-5 w-5' />
                Phương thức thanh toán
              </h2>

              <div className='space-y-3'>
                {/* VNPay */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'vnpay'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('vnpay')}
                >
                  <div className='flex items-center gap-3'>
                    <input
                      type='radio'
                      name='payment'
                      value='vnpay'
                      checked={paymentMethod === 'vnpay'}
                      onChange={() => setPaymentMethod('vnpay')}
                      className='text-blue-600'
                    />
                    <div className='w-5 h-5 bg-blue-600 rounded flex items-center justify-center'>
                      <span className='text-white text-xs font-bold'>V</span>
                    </div>
                    <div>
                      <div className='font-medium'>Thanh toán VNPay</div>
                      <div className='text-sm text-gray-500'>
                        Thanh toán trực tuyến qua VNPay
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className='text-xl font-semibold mb-6 flex items-center gap-2'>
                  Thông tin đơn hàng
                </h2>

                {/* Danh sách sản phẩm */}
                <div className='space-y-4 mb-6'>
                  {selectedItems.map((item: CartItem) => (
                    <div key={item._id} className='flex gap-3'>
                      <img
                        src={item.thumbnail}
                        alt={item.courseName}
                        width={64}
                        height={64}
                        className='w-16 h-16 object-cover rounded-lg'
                      />
                      <div className='flex-1'>
                        <h4 className='font-medium text-sm line-clamp-2'>
                          {item.courseName}
                        </h4>
                        <p className='text-xs text-gray-500'>{item.instructor}</p>
                        <div className='flex justify-between items-center mt-1'>
                          <span className='text-xs text-gray-500'>
                            x{item.quantity}
                          </span>
                          <span className='font-medium text-sm text-[#ff9500]'>
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
            </div>
          </div>

          {/* Thông tin đơn hàng - Bên phải */}
          <div className='lg:col-span-5 mt-8 lg:mt-0'>
            <div className='bg-white rounded-lg shadow-sm p-6 sticky top-8 flex flex-col gap-6'>
              <h2 className='text-xl font-semibold'>Thông tin đơn hàng</h2>

              {/* Tổng tiền */}
              <div className='space-y-2 flex flex-col gap-2'>
                <div className='flex justify-between text-sm'>
                  <span>Tạm tính</span>
                  <span>{formatPrice(selectedTotals.subtotal)}</span>
                </div>
                {selectedTotals.discount > 0 && (
                  <div className='flex justify-between text-sm text-green-600'>
                    <span>Tiết kiệm</span>
                    <span>-{formatPrice(selectedTotals.discount)}</span>
                  </div>
                )}
               <hr className="bg-[#d9d9d9] h-[1px] border-0" />
                <div className='flex justify-between text-lg font-semibold'>
                  <span>Tổng cộng</span>
                  <span className='text-[#ff9500]'>{formatPrice(selectedTotals.total)}</span>
                </div>
              </div>

              {/* Nút đặt hàng */}
              <Button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className=' h-10 p-[11px] bg-[#ffa500] hover:bg-[#ff9500] rounded-[5px] font-medium text-black text-base leading-6 transition-colors'
              >
                {isSubmitting ? 'Đang xử lý...' : 'Thanh toán'}
              </Button>

              <p className='text-xs text-gray-500 text-center'>
                Bằng việc đặt hàng, bạn đồng ý với điều khoản sử dụng của Wishzy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

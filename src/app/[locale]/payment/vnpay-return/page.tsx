'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PaymentService, VNPayVerifyResult } from '@/services/payment.service'
import { useCartStore } from '@/store/slices/cart'
import { Button } from '@/components/ui/button'

export default function VNPayReturnPage () {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const locale = useMemo(() => pathname?.split('/')?.[1] || 'vi', [pathname])
  const clearCart = useCartStore(s => s.clearCart)
  const clearedRef = useRef(false)

  const [result, setResult] = useState<VNPayVerifyResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        const params = new URLSearchParams(searchParams?.toString())
        const verify = await PaymentService.verifyReturn(params)
        // Clear cart once if payment is successful
        if (
          !clearedRef.current &&
          verify?.isSuccess &&
          verify?.vnp_ResponseCode === '00'
        ) {
          // Clear cart and persist owned courses locally for UX guard
          try {
            const raw = localStorage.getItem('checkout_items')
            const items: Array<{ _id: string }> = raw ? JSON.parse(raw) : []
            const newIds = Array.isArray(items)
              ? items.map(i => i._id).filter(Boolean)
              : []
            const ownedRaw = localStorage.getItem('owned_courses')
            const ownedSet = new Set<string>(
              ownedRaw ? JSON.parse(ownedRaw) : []
            )
            newIds.forEach(id => ownedSet.add(id))
            localStorage.setItem(
              'owned_courses',
              JSON.stringify(Array.from(ownedSet))
            )
          } catch {}
          clearCart()
          clearedRef.current = true
        }
        setResult(verify)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Có lỗi xảy ra')
      } finally {
        setLoading(false)
      }
    }
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onGoMyCourses = () => router.push(`/${locale}/my-courses`)
  const onGoHome = () => router.push(`/${locale}`)

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <div className='bg-white rounded-xl shadow-sm w-full max-w-xl p-8 text-center'>
        {loading && (
          <>
            <div className='animate-pulse h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4' />
            <div className='animate-pulse h-4 bg-gray-200 rounded w-3/4 mx-auto' />
          </>
        )}

        {!loading && error && (
          <>
            <h1 className='text-2xl font-semibold text-red-600 mb-2'>
              Xác thực thất bại
            </h1>
            <p className='text-gray-600 mb-6'>{error}</p>
            <Button className='h-10 px-[11px] py-0 rounded-[5px] font-medium text-base leading-6 transition-colors' onClick={onGoHome}>Về trang chủ</Button>
          </>
        )}

        {!loading && !error && result && (
          <>
            {result.isSuccess && result.vnp_ResponseCode === '00' ? (
              <>
                <h1 className='text-2xl font-semibold text-green-600 mb-2'>
                  Thanh toán thành công
                </h1>
                <p className='text-gray-600 mb-6'>
                  Bạn đã được ghi nhận thanh toán. Khóa học sẽ được mở khóa cho
                  tài khoản của bạn.
                </p>
                <div className='flex gap-3 justify-center'>
                  <Button
                    className='h-10 px-[11px] py-0 bg-[#ffa500] hover:bg-[#ff9500] rounded-[5px] font-medium text-base leading-6 transition-colors'
                    onClick={onGoMyCourses}
                  >
                    Vào khóa học của tôi
                  </Button>
                  <Button className='h-10 px-[11px] py-0 rounded-[5px] font-medium text-base leading-6 transition-colors' onClick={onGoHome}>Về trang chủ</Button>
                </div>
              </>
            ) : (
              <>
                <h1 className='text-2xl font-semibold text-red-600 mb-2'>
                  Thanh toán thất bại
                </h1>
                <p className='text-gray-600 mb-6'>
                  {result.message || 'VNPay trả về trạng thái thất bại.'}
                </p>
                <Button
                  onClick={onGoHome}
                  className='h-10 px-[11px] py-0 bg-[#ffa500] hover:bg-[#ff9500] rounded-[5px] font-medium text-base leading-6 transition-colors'
                >
                  Về trang chủ
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

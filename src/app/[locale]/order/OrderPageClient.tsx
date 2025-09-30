'use client';

import { useCartStore } from "@/store/slices/cart";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CreditCard, MapPin, User, Mail, Phone, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { CartItem } from "@/store/slices/cart";
import { PaymentService } from "@/services/payment.service";
import { useAuthStore } from "@/store/slices/auth";

interface UserInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

interface OrderData {
  items: CartItem[];
  userInfo: UserInfo;
  paymentMethod: 'cod' | 'vnpay';
  totals: {
    subtotal: number;
    discount: number;
    total: number;
  };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}

export default function OrderPageClient() {
  const { items, subtotal, discount, total, clearCart, replaceCart } = useCartStore();
  const router = useRouter();
  const pathname = usePathname();
  const locale = (pathname?.split('/')?.[1] || 'vi');
  
  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vnpay'>('vnpay');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useAuthStore();

  // Hydrate giỏ hàng từ checkout_items nếu Zustand rỗng, sau đó mới quyết định redirect
  useEffect(() => {
    if (items.length > 0) return; // đã có giỏ hàng
    try {
      const rawItems = localStorage.getItem('checkout_items');
      if (rawItems) {
        const parsedItems = JSON.parse(rawItems) as CartItem[];
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          replaceCart(parsedItems);
          return; // đã hydrate, không redirect
        }
      }
      // nếu không hydrate được thì redirect về cart để thêm sản phẩm
      router.push(`/${locale}/cart`);
    } catch {
      router.push(`/${locale}/cart`);
    }
  }, [items.length, router, locale, replaceCart]);

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!userInfo.fullName.trim()) {
      toast.error('Vui lòng nhập họ tên');
      return false;
    }
    if (!userInfo.email.trim()) {
      toast.error('Vui lòng nhập email');
      return false;
    }
    if (!userInfo.phone.trim()) {
      toast.error('Vui lòng nhập số điện thoại');
      return false;
    }
    if (!userInfo.address.trim()) {
      toast.error('Vui lòng nhập địa chỉ');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      toast.error('Email không hợp lệ');
      return false;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(userInfo.phone.replace(/\s/g, ''))) {
      toast.error('Số điện thoại không hợp lệ');
      return false;
    }

    return true;
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (items.length !== 1) {
        toast.error('Vui lòng thanh toán 1 khóa học mỗi lần.');
        return;
      }

      const courseId = items[0]._id;

      if (paymentMethod === 'vnpay') {
        if (!token) {
          toast.error('Bạn cần đăng nhập để thanh toán.');
          return;
        }
        const res = await PaymentService.createVNPayPayment(
          {
            courseId,
            courseSlug: items[0].slug,
            orderInfo: `Thanh toán khóa học: ${items[0].courseName}`,
          },
          token
        );
        if (res.success && res.paymentUrl) {
          localStorage.setItem('checkout_items', JSON.stringify(items));
          window.location.href = res.paymentUrl;
          return;
        } else {
          throw new Error('Không nhận được paymentUrl từ server');
        }
      } else {
        const orderId = Date.now().toString();
        const orderData: OrderData = {
          items,
          userInfo,
          paymentMethod,
          totals: { subtotal, discount, total },
        };
        localStorage.setItem(`order_${orderId}`, JSON.stringify(orderData));
        clearCart();
        toast.success('Đặt hàng thành công!');
        router.push(`/${locale}/order-success?id=${orderId}&payment=cod`);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi đặt hàng');
      console.error('Order error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-4">Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng</p>
          <button
            onClick={() => router.push(`/${locale}/cart`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại giỏ hàng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đặt hàng</h1>
          <p className="text-gray-600">Hoàn tất thông tin để đặt hàng</p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Thông tin người dùng - Bên trái */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User className="h-5 w-5" />
                Thông tin người nhận
              </h2>
              
              <div className="space-y-4">
                {/* Họ tên */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    value={userInfo.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập họ và tên"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0123456789"
                    />
                  </div>
                </div>

                {/* Địa chỉ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ nhận hàng *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <textarea
                      value={userInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập địa chỉ chi tiết (số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố)"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Phương thức thanh toán
              </h2>
              
              <div className="space-y-3">
                {/* COD */}
                {/* <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('cod')}
                  >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-blue-600"
                    />
                    <Truck className="h-5 w-5 text-gray-600" />
                    <div>
                      <div className="font-medium">Thanh toán khi nhận hàng (COD)</div>
                      <div className="text-sm text-gray-500">Thanh toán bằng tiền mặt khi nhận khóa học</div>
                    </div>
                  </div>
                </div> */}

                {/* VNPay */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'vnpay' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('vnpay')}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="vnpay"
                      checked={paymentMethod === 'vnpay'}
                      onChange={() => setPaymentMethod('vnpay')}
                      className="text-blue-600"
                    />
                    <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">V</span>
                    </div>
                    <div>
                      <div className="font-medium">Thanh toán VNPay</div>
                      <div className="text-sm text-gray-500">Thanh toán trực tuyến qua VNPay</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin đơn hàng - Bên phải */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Thông tin đơn hàng</h2>
              
              {/* Danh sách sản phẩm */}
              <div className="space-y-4 mb-6">
                {items.map((item: CartItem) => (
                  <div key={item._id} className="flex gap-3">
                    <img
                      src={item.thumbnail}
                      alt={item.courseName}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">{item.courseName}</h4>
                      <p className="text-xs text-gray-500">{item.instructor}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">x{item.quantity}</span>
                        <span className="font-medium text-sm">{formatPrice(item.price)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tổng tiền */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tạm tính</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Tiết kiệm</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Tổng cộng</span>
                  <span className="text-blue-600">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Nút đặt hàng */}
              <button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Đang xử lý...' : 'Thanh toán'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Bằng việc đặt hàng, bạn đồng ý với điều khoản sử dụng của Wishzy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

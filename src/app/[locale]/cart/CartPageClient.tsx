'use client';

import { useCartStore } from "@/store/slices/cart";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CartService, Course } from "@/services/cart.service";

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}

export default function CartPageClient() {
  const { 
    items, 
    subtotal, 
    discount, 
    total, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    addItem 
  } = useCartStore();
  const router = useRouter();
  const pathname = usePathname();
  const locale = (pathname?.split('/')?.[1] || 'vi');
  const [loading, setLoading] = useState(true);

  // Load sample courses from API when cart is empty
  useEffect(() => {
    const loadSampleCourses = async () => {
      try {
        if (items.length === 0) {
          const response = await CartService.getCourseList({ limit: 3 });
          const coursesData = response.courses || [];
          
          // Convert API courses to cart items format
          coursesData.forEach((course: Course) => {
            const cartItem = {
              ...course,
              instructor: course?.createdBy?.fullName ?? 'Giảng viên',
              originalPrice: course.price * 1.5, // Mock original price
            };
            addItem(cartItem);
          });
        }
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSampleCourses();
  }, [items.length, addItem]);

  const handleQuantityDecrease = (_id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(_id, currentQuantity - 1);
    } else {
      removeItem(_id);
    }
  };

  const handleQuantityIncrease = (_id: string, currentQuantity: number) => {
    updateQuantity(_id, currentQuantity + 1);
  };

  const handleRemoveItem = (_id: string) => {
    removeItem(_id);
  };

  const handleProceedToCheckout = () => {
    if (items.length > 0) {
      // Save cart data to localStorage for order page
      localStorage.setItem('checkout_items', JSON.stringify(items));
      localStorage.setItem('checkout_totals', JSON.stringify({
        subtotal,
        discount,
        total
      }));
      
      // Navigate to order/checkout page
      router.push(`/${locale}/order`);
    }
  };

  const handleContinueShopping = () => {
    router.push(`/${locale}/courses`);
  };

  const handleExploreCourses = () => {
    router.push(`/${locale}/courses`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Giỏ hàng của bạn</h1>
          <p className="text-gray-600">{items.length} khóa học trong giỏ hàng</p>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-600 mb-8">Hãy thêm một số khóa học vào giỏ hàng của bạn</p>
            <button 
              onClick={handleExploreCourses}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Khám phá khóa học
            </button>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Khóa học đã chọn</h2>
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Xóa tất cả
                    </button>
                  </div>

                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item._id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                        <div className="flex-shrink-0">
                          <img
                            src={item.thumbnail || '/placeholder-course.jpg'}
                            alt={item.courseName}
                            width={96}
                            height={64}
                            className="w-24 h-16 object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-lg font-medium text-gray-900 mb-1">
                                {item.courseName}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">Giảng viên: {item.instructor}</p>
                              
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                <span>{item.totalDuration} giờ</span>
                                <span>•</span>
                                <span>Level: {item.level}</span>
                                <span>•</span>
                                <span>{item.numberOfStudents} học viên</span>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-blue-600">
                                  {formatPrice(item.price)}
                                </span>
                                {item.originalPrice && item.originalPrice > item.price && (
                                  <span className="text-sm text-gray-500 line-through">
                                    {formatPrice(item.originalPrice)}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3 ml-4">
                              <button
                                onClick={() => handleQuantityDecrease(item._id, item.quantity)}
                                className="p-1 rounded-full hover:bg-gray-100"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityIncrease(item._id, item.quantity)}
                                className="p-1 rounded-full hover:bg-gray-100"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleRemoveItem(item._id)}
                                className="p-1 rounded-full hover:bg-red-50 text-red-600 ml-2"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-semibold mb-6">Tóm tắt đơn hàng</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Tiết kiệm</span>
                      <span className="font-medium">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Tổng cộng</span>
                    <span className="text-blue-600">{formatPrice(total)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Tiến hành thanh toán
                  <ArrowRight className="h-4 w-4" />
                </button>
                
                <div className="mt-4 text-center">
                  <button 
                    onClick={handleContinueShopping}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>

                {/* Coupon Section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium mb-3">Mã giảm giá</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      Áp dụng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

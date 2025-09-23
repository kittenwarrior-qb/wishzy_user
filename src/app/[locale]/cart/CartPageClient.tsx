'use client';

import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Dữ liệu mẫu - sau này thay bằng API
const sampleCartData = [
  {
    id: 1,
    title: "Khóa học React từ cơ bản đến nâng cao",
    instructor: "Nguyễn Văn A",
    price: 299000,
    originalPrice: 599000,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    duration: "40 giờ",
    lessons: 120,
  },
  {
    id: 2,
    title: "JavaScript ES6+ và Modern Web Development",
    instructor: "Trần Thị B",
    price: 199000,
    originalPrice: 399000,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
    duration: "30 giờ",
    lessons: 85,
  },
  {
    id: 3,
    title: "UI/UX Design với Figma",
    instructor: "Lê Văn C",
    price: 249000,
    originalPrice: 499000,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    duration: "25 giờ",
    lessons: 60,
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}

export default function CartPageClient() {
  const { items, subtotal, discount, total, removeItem, updateQuantity, clearCart, addItem } = useCart();
  const router = useRouter();

  // Thêm dữ liệu mẫu vào cart khi component mount (chỉ nếu cart trống)
  useEffect(() => {
    if (items.length === 0) {
      sampleCartData.forEach(item => {
        addItem(item);
      });
    }
  }, [items.length, addItem]);

  const handleQuantityDecrease = (id: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    } else {
      removeItem(id);
    }
  };

  const handleQuantityIncrease = (id: number, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleRemoveItem = (id: number) => {
    removeItem(id);
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
      router.push('/order');
    }
  };

  const handleContinueShopping = () => {
    router.push('/courses');
  };

  const handleExploreCourses = () => {
    router.push('/courses');
  };

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
                    <h2 className="text-xl font-semibold">Khóa học đã chọn</h2>
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Xóa tất cả
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg">
                        {/* Course Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            width={200}
                            height={120}
                            className="w-full sm:w-48 h-32 object-cover rounded-lg"
                          />
                        </div>
                        
                        {/* Course Info */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 mb-2">Giảng viên: {item.instructor}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <span>{item.duration}</span>
                            <span>•</span>
                            <span>{item.lessons} bài học</span>
                          </div>
                          
                          {/* Price and Actions */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl font-bold text-blue-600">{formatPrice(item.price)}</span>
                              {item.originalPrice > item.price && (
                                <span className="text-lg text-gray-400 line-through">{formatPrice(item.originalPrice)}</span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-3">
                              {/* Quantity Controls */}
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button 
                                  onClick={() => handleQuantityDecrease(item.id, item.quantity)}
                                  className="p-2 hover:bg-gray-100 transition-colors"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-2 font-medium">{item.quantity}</span>
                                <button 
                                  onClick={() => handleQuantityIncrease(item.id, item.quantity)}
                                  className="p-2 hover:bg-gray-100 transition-colors"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              
                              {/* Remove Button */}
                              <button 
                                onClick={() => handleRemoveItem(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Xóa khỏi giỏ hàng"
                              >
                                <Trash2 className="h-5 w-5" />
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

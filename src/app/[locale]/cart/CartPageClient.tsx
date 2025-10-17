'use client';

import { useEffect, useMemo, useState } from "react";
import { useCartStore } from "@/store/slices/cart";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}

export default function CartPageClient() {
  const { 
    items, 
    removeItem, 
    clearCart 
  } = useCartStore();
  const router = useRouter();
  const pathname = usePathname();
  const locale = (pathname?.split('/')?.[1] || 'vi');
  // Cart page should only reflect items that user explicitly added to cart (persisted by Zustand)

  // Selection state: default select all items; keep in sync when cart changes
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    // When items change, keep only still-existing selections; if none, select all by default
    const itemIds = items.map(i => i._id);
    const kept = selectedIds.filter(id => itemIds.includes(id));
    setSelectedIds(kept.length ? kept : itemIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const allSelected = items.length > 0 && selectedIds.length === items.length;
  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? [] : items.map(i => i._id));
  };

  const selectedItems = useMemo(() => items.filter(i => selectedIds.includes(i._id)), [items, selectedIds]);
  const selSubtotal = useMemo(() => selectedItems.reduce((s, it) => s + it.price * it.quantity, 0), [selectedItems]);
  const selDiscount = useMemo(() => selectedItems.reduce((s, it) => {
    const original = it.originalPrice ?? it.price;
    return s + Math.max(0, (original - it.price)) * it.quantity;
  }, 0), [selectedItems]);
  const selTotal = selSubtotal; // No extra fees here

  const handleRemoveItem = (_id: string) => {
    removeItem(_id);
  };

  const handleProceedToCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error('Vui lòng chọn ít nhất 1 khóa học để thanh toán');
      return;
    }

    // Save only selected items and their computed totals
    localStorage.setItem('checkout_items', JSON.stringify(selectedItems));
    localStorage.setItem('checkout_totals', JSON.stringify({
      subtotal: selSubtotal,
      discount: selDiscount,
      total: selTotal,
    }));

    // Navigate to order/checkout page
    router.push(`/${locale}/order`);
  };

  const handleContinueShopping = () => {
    router.push(`/${locale}/courses`);
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
              onClick={handleContinueShopping}
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
                    <div className="flex items-center gap-4">
                      <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 bg-orange-500 checked:bg-orange-500"
                          checked={allSelected}
                          onChange={toggleSelectAll}
                        />
                        Chọn tất cả
                      </label>
                      <button
                        onClick={clearCart}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Xóa tất cả
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item._id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                        {/* Select Checkbox */}
                        <div className="pt-1">
                          <input
                            type="checkbox"
                            className="h-4 w-4 bg-orange-500  checked:bg-orange-500"
                            checked={selectedIds.includes(item._id)}
                            onChange={() => toggleSelect(item._id)}
                          />
                        </div>
                        <div className="flex-shrink-0">
                          <div className="relative w-24 h-16">
                            <img
                              src={item.thumbnail || '/placeholder-course.jpg'}
                              alt={item.courseName}
                              width={96}
                              height={96}
                              className="object-cover rounded-lg"
                            />
                          </div>
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
                            <div className="flex items-center">
                              <button
                                onClick={() => handleRemoveItem(item._id)}
                                className="p-1 rounded-full hover:bg-red-50 text-red-600"
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
                    <span className="font-medium">{formatPrice(selSubtotal)}</span>
                  </div>
                  {selDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Tiết kiệm</span>
                      <span className="font-medium">-{formatPrice(selDiscount)}</span>
                    </div>
                  )}
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-orange-500 font-semibold">
                    <span>Tổng cộng</span>
                    <span className="text-orange-600">{formatPrice(selTotal)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-[orange] text-white py-3 px-4 rounded-lg hover:bg-[orange]/80 transition-colors font-medium flex items-center justify-center gap-2"
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


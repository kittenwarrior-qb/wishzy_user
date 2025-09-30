'use client';

import { useCartStore } from "@/store/slices/cart";
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface CartIconProps {
  className?: string;
}

export default function CartIcon({ className = '' }: CartIconProps) {
  const { getItemCount, items, total } = useCartStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const itemCount = mounted ? getItemCount() : 0;
  const pathname = usePathname();
  const router = useRouter();
  const locale = (pathname?.split('/')?.[1] || 'vi');
  const [open, setOpen] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  return (
    <div 
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href={`/${locale}/cart`} className="relative inline-flex items-center">
        <ShoppingCart className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </Link>

      {mounted && open && (
        <div className="absolute right-0 top-8 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
          <div className="p-3 border-b border-gray-100 font-medium">Giỏ hàng</div>
          {(items?.length || 0) === 0 ? (
            <div className="p-4 text-sm text-gray-500">Chưa có sản phẩm nào</div>
          ) : (
            <div className="max-h-80 overflow-auto">
              {items.slice(0, 5).map((item) => (
                <div key={item._id} className="flex gap-3 p-3 border-b border-gray-100 last:border-b-0">
                  <div className="relative w-14 h-10 flex-shrink-0">
                    <img
                      src={item.thumbnail || '/placeholder-course.jpg'}
                      alt={item.courseName}
                      width={56}
                      height={56}
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{item.courseName}</div>
                    <div className="text-xs text-gray-500 truncate">{item.instructor}</div>
                    <div className="text-xs text-gray-700 mt-1">{item.quantity} x {formatPrice(item.price)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-3 border-t border-gray-100">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-600">Tổng cộng</span>
              <span className="font-semibold text-blue-600">{formatPrice(mounted ? total : 0)}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/${locale}/cart`)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Xem giỏ hàng
              </button>
              <button
                onClick={() => router.push(`/${locale}/order`)}
                className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

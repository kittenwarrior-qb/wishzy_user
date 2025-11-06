'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useCartStore, type CartItem } from '@/store/slices/cart'
import Image from 'next/image'

const CartComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { getItemCount, items, removeItem, total } = useCartStore()

  const cartItemCount = getItemCount()
  const totalPrice = total
  const cartItems: CartItem[] = items

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId)
  }

  return (
    <div
      className='relative'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href='/cart'>
        <Button
          variant='ghost'
          size='icon'
          className='w-9 h-9 p-0 rounded-full hover:bg-[#ccc] transition-colors relative'
        >
          <ShoppingCart className='w-5 h-5 text-[#000]' />
          {cartItemCount > 0 && (
            <span className='absolute -top-1 -right-1 bg-[#ffa500] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium'>
              {cartItemCount > 99 ? '99+' : cartItemCount}
            </span>
          )}
        </Button>
      </Link>

      {isOpen && cartItems.length > 0 && (
        <div className='absolute right-0 top-full w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50'>
          <div className='p-4'>
            <h3 className='text-lg font-semibold text-gray-900 mb-3'>
              Giỏ hàng của bạn
            </h3>

            <div className='space-y-3 max-h-64 overflow-y-auto'>
              {cartItems.map(item => (
                <div
                  key={item._id}
                  className='flex items-center gap-3 p-2 hover:bg-gray-50 rounded'
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.courseName}
                    width={48}
                    height={48}
                    className='object-cover rounded'
                  />
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-gray-900 truncate'>
                      {item.courseName}
                    </p>
                    <p className='text-xs text-gray-400 truncate'>
                      {item.grade.gradeName} - {item.subject.subjectName}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {item.price.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                  <Button
                    variant='ghost'
                    onClick={e => {
                      e.preventDefault()
                      handleRemoveItem(item._id)
                    }}
                  >
                    <X className='w-4 h-4 text-gray-400' />
                  </Button>
                </div>
              ))}
            </div>

            <div className='border-t border-gray-200 mt-3 pt-3'>
              <div className='flex justify-between items-center mb-3'>
                <span className='text-base font-semibold text-gray-900'>
                  Tổng cộng:
                </span>
                <span className='text-lg font-bold text-[#ffa500]'>
                  {totalPrice.toLocaleString('vi-VN')}đ
                </span>
              </div>

              <Link href='/cart' className='w-full'>
                <Button className='w-full h-10 p-[11px] bg-[#ffa500] hover:bg-[#ff9500] rounded-[5px] font-medium text-black text-base leading-6 transition-colors'>
                  Xem giỏ hàng
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {isOpen && cartItems.length === 0 && (
        // Removed mt-2 for a seamless transition
        <div className='absolute right-0 top-full w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50'>
          <div className='p-4 text-center'>
            <ShoppingCart className='w-12 h-12 text-gray-300 mx-auto mb-2' />
            <p className='text-gray-500 text-sm mb-3'>
              Giỏ hàng của bạn đang trống
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartComponent

'use client';

import { useCart, CartItem } from '@/contexts/CartContext';
import { toast } from 'sonner';

export function useAddToCart() {
  const { addItem } = useCart();

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    try {
      addItem(product);
      toast.success(`Đã thêm "${product.title}" vào giỏ hàng!`);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
      console.error('Error adding to cart:', error);
    }
  };

  return { addToCart };
}

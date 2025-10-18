'use client';

import { useAddToCart } from '@/hooks/useAddToCart';
import { CartItem } from "@/store/slices/cart";
import { ShoppingCart, Plus } from 'lucide-react';
import { useCartStore } from '@/store/slices/cart';
import { Button } from '../ui/button';

interface AddToCartButtonProps {
  product: Omit<CartItem, 'quantity'>;
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
  inCartLabel?: string;
}

export default function AddToCartButton({ 
  product, 
  variant = 'primary', 
  size = 'md',
  className = '',
  label = 'Thêm vào giỏ hàng',
  inCartLabel = 'Đã trong giỏ'
}: AddToCartButtonProps) {
  const { addToCart } = useAddToCart();
  const { hasItem, hasOwned } = useCartStore();
  const inCart = hasItem(product._id);
  const isOwned = hasOwned(product._id);

  const handleAddToCart = () => {
    addToCart(product);
  };
  if (variant === 'icon') {
    return (
      <Button
        onClick={handleAddToCart}
        disabled={inCart || isOwned}
      variant={'outline'}
        className={`rounded-lg transition-colors ${(inCart || isOwned) ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
        title={isOwned ? 'Bạn đã sở hữu khoá học' : 'Thêm vào giỏ hàng'}
      >
        <Plus className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={inCart || isOwned}
      variant={'outline'}
      className={`h-10 p-[11px] bg-[#ffa500] hover:bg-[#ff9500] rounded-[5px] font-medium text-black text-base leading-6 transition-colors ${className}`}
    >
      <ShoppingCart className="h-4 w-4" />
      {isOwned ? 'Đã sở hữu' : (inCart ? inCartLabel : label)}
    </Button>
    
  );
}

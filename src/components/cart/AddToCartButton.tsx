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
      className={`rounded-lg transition-colors font-medium flex items-center gap-2 ${(inCart || isOwned) ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
    >
      <ShoppingCart className="h-4 w-4" />
      {isOwned ? 'Đã sở hữu' : (inCart ? inCartLabel : label)}
    </Button>
  );
}

// Example usage:
/*
const exampleProduct = {
  id: 1,
  title: "Complete React Development Course",
  instructor: "John Doe",
  price: 299000,
  originalPrice: 599000,
  image: "https://example.com/image.jpg",
  duration: "40 hours",
  lessons: 120,
};

// In your component:
<AddToCartButton product={exampleProduct} />
<AddToCartButton product={exampleProduct} variant="secondary" size="sm" />
<AddToCartButton product={exampleProduct} variant="icon" />
*/

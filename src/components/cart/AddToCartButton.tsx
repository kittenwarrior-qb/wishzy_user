'use client';

import { useAddToCart } from '@/hooks/useAddToCart';
import { CartItem } from "@/store/slices/cart";
import { ShoppingCart, Plus } from 'lucide-react';
import { useCartStore } from '@/store/slices/cart';

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
  const { hasItem } = useCartStore();
  const inCart = hasItem(product._id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    icon: 'bg-blue-600 text-white hover:bg-blue-700 p-2'
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleAddToCart}
        disabled={inCart}
        className={`${variantClasses[variant]} rounded-lg transition-colors ${inCart ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
        title="Thêm vào giỏ hàng"
      >
        <Plus className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={inCart}
      className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-lg transition-colors font-medium flex items-center gap-2 ${inCart ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
    >
      <ShoppingCart className="h-4 w-4" />
      {inCart ? inCartLabel : label}
    </button>
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

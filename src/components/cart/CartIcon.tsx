'use client';

import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface CartIconProps {
  className?: string;
}

export default function CartIcon({ className = '' }: CartIconProps) {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <Link href="/cart" className={`relative inline-flex items-center ${className}`}>
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}

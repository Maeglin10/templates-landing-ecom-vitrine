import React from 'react';
import type { CartItem } from '@/context/CartContext';

interface CartContextType {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

export function useCart(): CartContextType {
  // Client-side only hook framework mock 
  if (typeof window === 'undefined') {
    return {
      items: [],
      total: 0,
      addItem: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
      clear: () => {},
    };
  }

  const CartContext = require('@/context/CartContext').CartContext;
  const context = React.useContext(CartContext) as unknown as CartContextType;
  return context;
}

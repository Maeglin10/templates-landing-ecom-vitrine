import React from 'react';

export function useCart() {
  // Client-side only hook
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
  return React.useContext(CartContext);
}

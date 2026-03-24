'use client';

import React, { createContext, ReactNode, useState, useEffect, useCallback } from 'react';
import * as cartService from '@/lib/cart';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const cart = cartService.getCart();
    setItems(cart.items);
    setTotal(cart.total);
    setHydrated(true);
  }, []);

  const addItem = useCallback((item: CartItem) => {
    cartService.addToCart(item);
    const cart = cartService.getCart();
    setItems(cart.items);
    setTotal(cart.total);
  }, []);

  const removeItem = useCallback((productId: string) => {
    cartService.removeFromCart(productId);
    const cart = cartService.getCart();
    setItems(cart.items);
    setTotal(cart.total);
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    cartService.updateQuantity(productId, quantity);
    const cart = cartService.getCart();
    setItems(cart.items);
    setTotal(cart.total);
  }, []);

  const clear = useCallback(() => {
    cartService.clearCart();
    setItems([]);
    setTotal(0);
  }, []);

  if (!hydrated) {
    return <>{children}</>;
  }

  return (
    <CartContext.Provider value={{ items, total, addItem, removeItem, updateQuantity, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

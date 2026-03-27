"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface WishlistCtx {
  items: string[];
  toggle: (productId: string) => void;
  isWished: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistCtx>({
  items: [],
  toggle: () => {},
  isWished: () => false,
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  const toggle = (id: string) => {
    setItems((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      try { localStorage.setItem("wishlist", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  return (
    <WishlistContext.Provider value={{ items, toggle, isWished: (id) => items.includes(id) }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);

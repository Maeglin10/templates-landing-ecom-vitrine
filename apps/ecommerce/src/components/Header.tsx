'use client';

import Link from 'next/link';
import { Container, ThemeToggle } from '@repo/ui';
import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';

export function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-stone-200 dark:border-neutral-800">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-black tracking-tighter">
          Store
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/products" className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
            Shop
          </Link>
          <Link href="/blog" className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
            Journal
          </Link>
          <Link href="/account" className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
            Account
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/cart" className="relative p-2 hover:bg-stone-100 dark:hover:bg-neutral-900 rounded-xl transition-colors">
            <ShoppingBag className="w-5 h-5 text-stone-700 dark:text-stone-300" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>
        </div>
      </Container>
    </header>
  );
}

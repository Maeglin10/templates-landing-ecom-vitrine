'use client';

import Link from 'next/link';
import { Container, ThemeToggle } from '@repo/ui';

export function Header() {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <Container className="flex items-center justify-between py-6">
        <Link href="/" className="text-2xl font-bold">
          Store
        </Link>
        <nav className="flex items-center gap-8">
          <Link href="/products" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
            Shop
          </Link>
          <Link href="/blog" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/cart" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
            Cart
          </Link>
          <Link href="/account" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
            Account
          </Link>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}

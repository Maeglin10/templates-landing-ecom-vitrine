'use client';

import Link from 'next/link';
import { Container } from '@repo/ui';

export function Header() {
  return (
    <header className="border-b border-neutral-200">
      <Container className="flex items-center justify-between py-6">
        <Link href="/" className="text-2xl font-bold">
          Store
        </Link>
        <nav className="flex items-center gap-8">
          <Link href="/products" className="text-neutral-600 hover:text-neutral-900">
            Shop
          </Link>
          <Link href="/cart" className="relative">
            <span className="text-neutral-600 hover:text-neutral-900">Cart</span>
          </Link>
          <Link href="/account" className="text-neutral-600 hover:text-neutral-900">
            Account
          </Link>
        </nav>
      </Container>
    </header>
  );
}

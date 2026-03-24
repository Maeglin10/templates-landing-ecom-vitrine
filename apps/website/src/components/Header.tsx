'use client';

import Link from 'next/link';
import { Container } from '@repo/ui';

export function Header() {
  return (
    <header className="border-b border-neutral-200">
      <Container className="py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Website
          </Link>
          <div className="flex gap-8">
            <Link href="/services" className="text-neutral-600 hover:text-neutral-900">
              Services
            </Link>
            <Link href="/about" className="text-neutral-600 hover:text-neutral-900">
              About
            </Link>
            <Link href="/blog" className="text-neutral-600 hover:text-neutral-900">
              Blog
            </Link>
            <Link href="/contact" className="text-neutral-600 hover:text-neutral-900">
              Contact
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}

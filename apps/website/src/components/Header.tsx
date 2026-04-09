'use client';

import Link from 'next/link';
import { Container, TemplateSwitcher } from '@repo/ui';

export function Header() {
  return (
    <header className="border-b border-neutral-200 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <Container className="py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              Website
            </Link>
            <div className="hidden md:flex gap-6">
              <Link href="/services" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                Services
              </Link>
              <Link href="/about" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                About
              </Link>
              <Link href="/blog" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <TemplateSwitcher />
          </div>
        </nav>
      </Container>
    </header>
  );
}

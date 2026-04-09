'use client';

import { Container, TemplateSwitcher } from '@repo/ui';
import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-foreground/5">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-black tracking-tighter">
          Landing
        </Link>
        <TemplateSwitcher />
      </Container>
    </header>
  );
}

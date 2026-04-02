import { Container, Section } from '@repo/ui';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Section className="border-t border-border bg-muted/50 mt-auto">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} WebStudio. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Qui sommes-nous
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
            <Link href="/cgv" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              CGV
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

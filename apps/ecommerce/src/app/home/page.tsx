import { Container, Section, Button } from '@repo/ui';
import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: 'Home',
  };
}

export default function Home() {
  return (
    <main>
      <Section className="bg-neutral-50">
        <Container>
          <div className="space-y-6 text-center">
            <h1 className="text-5xl font-bold">Welcome to Our Store</h1>
            <p className="text-xl text-neutral-600">
              Discover our curated collection of quality products
            </p>
            <Link href="/products">
              <Button size="lg">Shop Now</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}

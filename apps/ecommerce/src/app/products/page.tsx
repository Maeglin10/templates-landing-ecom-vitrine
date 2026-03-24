'use client';

import { Container, Section, Button, Card } from '@repo/ui';
import Link from 'next/link';
import { formatCurrency } from '@repo/lib';

const mockProducts = [
  {
    id: '1',
    name: 'Premium Product',
    slug: 'premium-product',
    price: 99.99,
    image: 'https://via.placeholder.com/300x300?text=Product+1',
    description: 'High-quality product for daily use',
  },
  {
    id: '2',
    name: 'Deluxe Item',
    slug: 'deluxe-item',
    price: 149.99,
    image: 'https://via.placeholder.com/300x300?text=Product+2',
    description: 'Premium features and design',
  },
  {
    id: '3',
    name: 'Standard Option',
    slug: 'standard-option',
    price: 49.99,
    image: 'https://via.placeholder.com/300x300?text=Product+3',
    description: 'Great value for money',
  },
];

export default function Products() {
  return (
    <main>
      <Section className="bg-neutral-50">
        <Container>
          <h1 className="text-4xl font-bold">Our Products</h1>
          <p className="mt-4 text-neutral-600">Explore our full collection</p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {mockProducts.map((product) => (
              <Card key={product.id}>
                <div className="space-y-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-neutral-600">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">{formatCurrency(product.price)}</span>
                    <Link href={`/products/${product.slug}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}

'use client';

import { Container, Section, Button } from '@repo/ui';
import Link from 'next/link';
import { useState } from 'react';
import { formatCurrency } from '@repo/lib';
import { useCart } from '@/hooks/useCart';
import { trackCustomEvent } from '@repo/analytics';

const mockProduct = {
  id: '1',
  name: 'Premium Product',
  slug: 'premium-product',
  price: 99.99,
  image: 'https://via.placeholder.com/500x500?text=Premium+Product',
  description: 'High-quality product for daily use',
  details: 'This product is crafted with premium materials and features advanced technology.',
  stock: 10,
};

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const cart = useCart();

  const handleAddToCart = () => {
    cart.addItem({
      productId: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      quantity,
      image: mockProduct.image,
    });
    trackCustomEvent('add_to_cart', {
      productId: mockProduct.id,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main>
      <Section className="bg-neutral-50">
        <Container>
          <Link href="/products" className="text-neutral-600 hover:text-neutral-900">
            ← Back to Products
          </Link>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div>
              <img
                src={mockProduct.image}
                alt={mockProduct.name}
                className="h-96 w-full rounded-lg object-cover"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold">{mockProduct.name}</h1>
              <p className="mt-4 text-2xl font-semibold">{formatCurrency(mockProduct.price)}</p>

              <p className="mt-6 text-neutral-600">{mockProduct.details}</p>

              <p className="mt-4 text-sm text-neutral-500">Stock: {mockProduct.stock} available</p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <label htmlFor="quantity" className="font-medium">
                    Quantity:
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={mockProduct.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                    className="w-20 rounded-lg border border-neutral-300 px-3 py-2"
                  />
                </div>

                <Button size="lg" onClick={handleAddToCart} className="w-full">
                  {added ? 'Added to Cart!' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

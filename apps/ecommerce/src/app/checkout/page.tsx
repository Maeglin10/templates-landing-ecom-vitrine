'use client';

import { Container, Section, Input, Button } from '@repo/ui';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@repo/lib';
import { useFormBuilder } from '@repo/forms';
import { useState } from 'react';
import { trackCustomEvent } from '@repo/analytics';

const checkoutFields = [
  { name: 'email', label: 'Email', type: 'email' as const, required: true },
  { name: 'name', label: 'Full Name', type: 'text' as const, required: true },
  { name: 'address', label: 'Address', type: 'text' as const, required: true },
  { name: 'city', label: 'City', type: 'text' as const, required: true },
  { name: 'zip', label: 'ZIP Code', type: 'text' as const, required: true },
];

export default function Checkout() {
  const cart = useCart();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const { formData, errors, handleChange, handleSubmit } = useFormBuilder({
    fields: checkoutFields,
    onSubmit: async (data) => {
      setProcessing(true);
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: data,
            items: cart.items,
            total: cart.total,
          }),
        });

        if (!response.ok) throw new Error('Checkout failed');

        trackCustomEvent('checkout_completed', { total: cart.total });
        setSuccess(true);
        cart.clear();
      } finally {
        setProcessing(false);
      }
    },
  });

  if (success) {
    return (
      <main>
        <Section className="bg-neutral-50">
          <Container>
            <div className="mx-auto max-w-2xl text-center py-12">
              <h1 className="text-4xl font-bold">Order Confirmed!</h1>
              <p className="mt-4 text-neutral-600">
                Thank you for your purchase. You'll receive an order confirmation email shortly.
              </p>
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  return (
    <main>
      <Section className="bg-neutral-50">
        <Container>
          <h1 className="text-4xl font-bold">Checkout</h1>

          <div className="mt-12 grid gap-12 md:grid-cols-3">
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-neutral-200 bg-white p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <Input
                    label="Full Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                </div>

                <Input
                  label="Address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <Input
                    label="City"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                  />
                  <Input
                    label="ZIP Code"
                    name="zip"
                    type="text"
                    value={formData.zip}
                    onChange={handleChange}
                    error={errors.zip}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full"
                >
                  {processing ? 'Processing...' : 'Complete Order'}
                </Button>
              </form>
            </div>

            <div className="rounded-lg border border-neutral-200 bg-white p-6 h-fit">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="mt-6 space-y-4 border-t border-neutral-200 pt-6">
                {cart.items.map((item) => (
                  <div key={item.productId} className="flex justify-between">
                    <span className="text-sm">{item.name} x {item.quantity}</span>
                    <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-neutral-200 pt-4 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>{formatCurrency(cart.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

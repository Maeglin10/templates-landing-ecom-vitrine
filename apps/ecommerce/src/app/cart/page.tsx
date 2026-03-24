'use client';

import { Container, Section, Button } from '@repo/ui';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@repo/lib';
import { trackCustomEvent } from '@repo/analytics';

export default function Cart() {
  const cart = useCart();

  const handleCheckout = () => {
    trackCustomEvent('checkout_started', { total: cart.total });
    // Navigate to checkout
  };

  if (cart.items.length === 0) {
    return (
      <main>
        <Section className="bg-neutral-50">
          <Container>
            <div className="flex flex-col items-center justify-center space-y-6 py-12 text-center">
              <h1 className="text-4xl font-bold">Your Cart is Empty</h1>
              <p className="text-neutral-600">Start shopping to add items to your cart</p>
              <Link href="/products">
                <Button>Continue Shopping</Button>
              </Link>
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
          <h1 className="text-4xl font-bold">Shopping Cart</h1>

          <div className="mt-12 grid gap-12 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              {cart.items.map((item) => (
                <div key={item.productId} className="flex gap-6 rounded-lg border border-neutral-200 bg-white p-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-neutral-600">{formatCurrency(item.price)}</p>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => cart.updateQuantity(item.productId, parseInt(e.target.value))}
                      className="mt-2 w-20 rounded-lg border border-neutral-300 px-2 py-1"
                    />
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                    <button
                      onClick={() => cart.removeItem(item.productId)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-neutral-200 bg-white p-6 h-fit">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="mt-6 space-y-4 border-t border-neutral-200 pt-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>{formatCurrency(cart.total)}</span>
                </div>
                <Link href="/checkout" className="block w-full">
                  <Button onClick={handleCheckout} className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/products" className="block w-full">
                  <button className="w-full rounded-lg border border-neutral-300 px-4 py-2 hover:bg-neutral-50">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

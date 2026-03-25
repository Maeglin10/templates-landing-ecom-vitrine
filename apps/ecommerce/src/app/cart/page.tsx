"use client";

import { useCart } from "@/context/CartContext";
import { Container, Section, Button } from "@repo/ui";
import { formatCurrency } from "@repo/lib";
import { useState } from "react";
import { trackCustomEvent } from "@repo/analytics";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const cart = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    trackCustomEvent("checkout_started", { total: cart.total });
    router.push("/checkout");
    setLoading(false);
  };

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
        <Section>
          <Container className="max-w-2xl text-center py-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="w-24 h-24 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center">
                <ShoppingCart className="w-10 h-10 text-stone-400" />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tighter mb-3">Your cart is empty</h1>
                <p className="text-stone-500">Looks like you haven&apos;t added anything yet.</p>
              </div>
              <Link href="/products">
                <Button size="lg">Explore Products</Button>
              </Link>
            </motion.div>
          </Container>
        </Section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
      <Section>
        <Container>
          <h1 className="text-4xl font-black tracking-tighter mb-12">Shopping Cart</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item, i) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-5 bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-stone-100 dark:border-neutral-800 shadow-sm"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 relative flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold truncate">{item.name}</h3>
                    <p className="text-stone-500 text-sm mt-1">{formatCurrency(item.price)}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => cart.updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        className="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center hover:bg-stone-200 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-semibold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => cart.updateQuantity(item.productId, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center hover:bg-stone-200 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="font-bold text-lg">{formatCurrency(item.price * item.quantity)}</span>
                    <button
                      onClick={() => cart.removeItem(item.productId)}
                      className="text-stone-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="h-fit bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-stone-100 dark:border-neutral-800 shadow-sm sticky top-28">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.items.length} items)</span>
                  <span>{formatCurrency(cart.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>
              <div className="border-t border-stone-100 dark:border-neutral-800 mt-5 pt-5 flex justify-between font-black text-xl">
                <span>Total</span>
                <span>{formatCurrency(cart.total)}</span>
              </div>
              <Button
                className="w-full mt-6"
                size="lg"
                onClick={handleCheckout}
                isLoading={loading}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Go to Checkout
              </Button>
              <Link href="/products" className="block mt-3 text-center text-sm text-stone-500 hover:text-stone-900 transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

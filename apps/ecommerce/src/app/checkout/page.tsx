"use client";

import { useCart } from "@/context/CartContext";
import { Container, Section, Input, Button } from "@repo/ui";
import { formatCurrency } from "@repo/lib";
import { useFormBuilder } from "@repo/forms";
import { useState } from "react";
import { trackCustomEvent } from "@repo/analytics";
import { motion } from "framer-motion";
import { CheckCircle, CreditCard } from "lucide-react";

const checkoutFields = [
  { name: "email", label: "Email", type: "email" as const, required: true },
  { name: "name", label: "Full Name", type: "text" as const, required: true },
  { name: "address", label: "Street Address", type: "text" as const, required: true },
  { name: "city", label: "City", type: "text" as const, required: true },
  { name: "zip", label: "ZIP Code", type: "text" as const, required: true },
];

export default function CheckoutPage() {
  const cart = useCart();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  const { formData, errors, handleChange, handleSubmit } = useFormBuilder({
    fields: checkoutFields,
    onSubmit: async (data) => {
      setProcessing(true);
      setStripeError(null);
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer: { email: data.email, name: data.name },
            items: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          setStripeError(result.error ?? "Checkout failed");
          setProcessing(false);
          return;
        }

        trackCustomEvent("checkout_initiated", { total: cart.total });

        // Redirect to Stripe hosted checkout
        if (result.url) {
          window.location.href = result.url;
        } else {
          setSuccess(true);
          cart.clear();
        }
      } catch {
        setStripeError("An unexpected error occurred. Please try again.");
      } finally {
        setProcessing(false);
      }
    },
  });

  if (success) {
    return (
      <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
        <Section>
          <Container className="max-w-2xl text-center py-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h1 className="text-4xl font-black tracking-tighter">Order Confirmed!</h1>
              <p className="text-stone-500 text-lg">
                Thank you for your purchase. A confirmation email will be sent to you shortly.
              </p>
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
          <h1 className="text-4xl font-black tracking-tighter mb-12">Checkout</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-stone-100 dark:border-neutral-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-5 h-5 text-stone-500" />
                  <h2 className="text-xl font-bold">Billing Information</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="you@email.com" />
                  <Input label="Full Name" name="name" type="text" value={formData.name} onChange={handleChange} error={errors.name} placeholder="John Doe" />
                </div>
                <Input label="Street Address" name="address" type="text" value={formData.address} onChange={handleChange} error={errors.address} placeholder="123 Main St" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="City" name="city" type="text" value={formData.city} onChange={handleChange} error={errors.city} placeholder="Paris" />
                  <Input label="ZIP Code" name="zip" type="text" value={formData.zip} onChange={handleChange} error={errors.zip} placeholder="75001" />
                </div>

                {stripeError && (
                  <p className="text-red-500 text-sm bg-red-50 rounded-xl p-3">{stripeError}</p>
                )}

                <Button type="submit" size="lg" isLoading={processing} className="w-full mt-2">
                  {processing ? "Redirecting to payment..." : `Pay ${formatCurrency(cart.total)}`}
                </Button>
                <p className="text-xs text-stone-400 text-center mt-2">
                  🔒 Secured by Stripe. We never store your card details.
                </p>
              </form>
            </div>

            <div className="h-fit bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-stone-100 dark:border-neutral-800 shadow-sm sticky top-28">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                {cart.items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-stone-600 dark:text-stone-400">
                    <span>{item.name} × {item.quantity}</span>
                    <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-stone-100 dark:border-neutral-800 mt-4 pt-4 flex justify-between font-black text-lg">
                <span>Total</span>
                <span>{formatCurrency(cart.total)}</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

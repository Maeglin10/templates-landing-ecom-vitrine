"use client";

import { Container, Section, Button } from "@repo/ui";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
      <Section>
        <Container className="max-w-2xl text-center py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-black tracking-tighter mb-4">Order Confirmed!</h1>
              <p className="text-stone-500 text-lg leading-relaxed">
                Thank you for your purchase. A confirmation email has been sent to you with all the details.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/products">
                <Button>Continue Shopping</Button>
              </Link>
              <Link href="/account">
                <Button variant="outline">View Orders</Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
}

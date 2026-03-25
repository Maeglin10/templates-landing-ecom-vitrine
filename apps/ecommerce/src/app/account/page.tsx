"use client";

import { Container, Section, Button, Card } from "@repo/ui";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const mockOrders = [
  { id: "ORD-001", date: "March 20, 2026", status: "Delivered", total: 299.99, items: 2 },
  { id: "ORD-002", date: "March 10, 2026", status: "Processing", total: 99.99, items: 1 },
];

const statusIcon = {
  Delivered: <CheckCircle className="w-4 h-4 text-green-500" />,
  Processing: <Clock className="w-4 h-4 text-yellow-500" />,
  Shipped: <Package className="w-4 h-4 text-blue-500" />,
};

const statusColor = {
  Delivered: "text-green-600 bg-green-50 dark:bg-green-900/20",
  Processing: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20",
  Shipped: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
};

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
      <Section>
        <Container className="max-w-3xl">
          <div className="mb-12">
            <h1 className="text-4xl font-black tracking-tighter mb-2">My Account</h1>
            <p className="text-stone-500">Manage your orders and account details.</p>
          </div>

          {/* Orders */}
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Order History
            </h2>

            <div className="space-y-4">
              {mockOrders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-stone-100 dark:border-neutral-800 shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-stone-100 dark:bg-stone-800 rounded-xl flex items-center justify-center">
                      <Package className="w-5 h-5 text-stone-500" />
                    </div>
                    <div>
                      <p className="font-bold">{order.id}</p>
                      <p className="text-sm text-stone-500">{order.date} · {order.items} item{order.items > 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${statusColor[order.status as keyof typeof statusColor]}`}>
                      {statusIcon[order.status as keyof typeof statusIcon]}
                      {order.status}
                    </span>
                    <span className="font-bold text-lg">€{order.total.toFixed(2)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-16 p-6 bg-stone-100 dark:bg-stone-900 rounded-2xl text-center">
            <p className="text-stone-500 mb-4">Full authentication (login, register, password reset) can be activated by connecting NextAuth.js or Clerk.</p>
            <Link href="/products">
              <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}

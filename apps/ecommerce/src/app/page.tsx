"use client";
import Link from "next/link";
import Image from "next/image";
import { Button, Container, Section } from "@repo/ui";
import { ArrowRight, Star, Truck, RotateCcw, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { products, categories } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useState } from "react";

const featuredProducts = products.slice(0, 6);

const categoryImages: Record<string, string> = {
  Lighting: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
  Furniture: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  Decor: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80",
};

const categoryDescriptions: Record<string, string> = {
  Lighting: "Illuminate with intention",
  Furniture: "Pieces built to last",
  Decor: "Details that define a space",
};

const trustBadges = [
  { icon: <Truck className="w-5 h-5" />, label: "Free delivery", sublabel: "On orders over €150" },
  { icon: <RotateCcw className="w-5 h-5" />, label: "30-day returns", sublabel: "Hassle-free exchanges" },
  { icon: <Shield className="w-5 h-5" />, label: "Secure payment", sublabel: "SSL encrypted checkout" },
  { icon: <Star className="w-5 h-5" />, label: "4.8/5 rating", sublabel: "From 800+ verified buyers" },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function HomePage() {
  const cart = useCart();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const handleQuickAdd = (product: typeof featuredProducts[0], e: React.MouseEvent) => {
    e.preventDefault();
    cart.addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`);
    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => setAddedIds((prev) => { const s = new Set(prev); s.delete(product.id); return s; }), 2000);
  };

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950">

      {/* Hero */}
      <Section className="relative overflow-hidden pt-8 pb-0" spacing="none">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[3/2] md:aspect-[2/1] rounded-[2.5rem] overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80"
              alt="Lumière — Elevate your space"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute inset-0 flex flex-col items-center justify-end p-10 md:p-16 text-white text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xs font-bold uppercase tracking-[0.3em] mb-4 opacity-70"
              >
                Spring Collection 2026
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-tight"
              >
                Elevate Your Space
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white/70 max-w-lg mb-8 text-lg"
              >
                Premium home decor crafted for those who believe their surroundings should inspire them.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3 justify-center"
              >
                <Link href="/products">
                  <Button size="lg" className="bg-white text-stone-900 hover:bg-stone-100 font-bold px-8 h-12 rounded-2xl">
                    Shop the Collection
                  </Button>
                </Link>
                <Link href="/products?category=Lighting">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white border border-white/30 hover:bg-white/10 h-12 rounded-2xl"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    New Arrivals
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Trust badges */}
      <Section className="py-8">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex items-center gap-3 bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-stone-100 dark:border-neutral-800">
                <div className="text-stone-400">{badge.icon}</div>
                <div>
                  <p className="text-sm font-bold text-stone-800 dark:text-stone-100">{badge.label}</p>
                  <p className="text-xs text-stone-400">{badge.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Products */}
      <Section spacing="xl">
        <Container>
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black tracking-tighter">Featured Pieces</h2>
              <p className="text-stone-500 mt-1">Our most loved objects, selected for you.</p>
            </div>
            <Link href="/products">
              <Button variant="ghost" className="font-semibold hidden sm:flex" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View all
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group cursor-pointer flex flex-col"
              >
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="relative w-full aspect-[4/5] bg-stone-100 dark:bg-stone-900 rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`w-full py-2.5 rounded-xl text-sm font-bold shadow-xl transition-colors ${
                          addedIds.has(product.id)
                            ? "bg-green-600 text-white"
                            : "bg-white text-stone-900 hover:bg-stone-50"
                        }`}
                      >
                        {addedIds.has(product.id) ? "Added!" : `Quick Add — ${formatCurrency(product.price)}`}
                      </button>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold bg-white/90 text-stone-700 px-2 py-0.5 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="px-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm tracking-tight leading-tight">{product.name}</h3>
                    <div className="flex items-center gap-1 text-xs ml-2 flex-shrink-0">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-stone-500">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-stone-500 text-sm mt-1">{formatCurrency(product.price)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link href="/products">
              <Button variant="ghost" rightIcon={<ArrowRight className="h-4 w-4" />}>View all products</Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Category sections */}
      <Section className="py-16">
        <Container>
          <h2 className="text-3xl font-black tracking-tighter mb-10">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link key={cat} href={`/products?category=${cat}`} className="group block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[4/5] rounded-3xl overflow-hidden"
                >
                  <Image
                    src={categoryImages[cat] ?? ""}
                    alt={cat}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <p className="text-xs uppercase tracking-widest opacity-70 mb-1">{categoryDescriptions[cat]}</p>
                    <h3 className="text-2xl font-black">{cat}</h3>
                    <div className="flex items-center gap-1 text-sm mt-2 opacity-80">
                      Shop now <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Section className="pb-20">
        <Container>
          <div className="rounded-3xl bg-stone-900 dark:bg-stone-800 text-white p-12 md:p-16 text-center">
            <h2 className="text-3xl font-black tracking-tighter mb-3">Discover first.</h2>
            <p className="text-stone-400 mb-8 max-w-md mx-auto">
              Subscribe to our newsletter for new arrivals, styling inspiration, and exclusive offers.
            </p>
            <NewsletterForm />
            <p className="text-stone-500 text-xs mt-4">No spam, ever. Unsubscribe at any time.</p>
          </div>
        </Container>
      </Section>
    </main>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    toast.success("You're on the list!");
  };

  if (submitted) {
    return (
      <p className="text-green-400 font-semibold flex items-center justify-center gap-2">
        <ArrowRight className="w-4 h-4" /> You&apos;re subscribed — welcome to Lumière!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
      />
      <button
        type="submit"
        className="bg-white text-stone-900 font-bold px-7 py-3 rounded-2xl hover:bg-stone-100 transition-colors text-sm flex-shrink-0"
      >
        Subscribe
      </button>
    </form>
  );
}

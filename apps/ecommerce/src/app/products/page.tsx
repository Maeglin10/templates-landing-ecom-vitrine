"use client";

import { Container, Section } from "@repo/ui";
import Link from "next/link";
import { formatCurrency } from "@repo/lib";
import { useCart } from "@/context/CartContext";
import { trackCustomEvent } from "@repo/analytics";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const mockProducts = [
  {
    id: "1", name: "Minimal Alpha Chair", slug: "minimal-alpha-chair", price: 499,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    description: "Premium minimalist chair for modern spaces.", rating: 4.9,
  },
  {
    id: "2", name: "Concrete Desk Lamp", slug: "concrete-desk-lamp", price: 129,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    description: "Industrial concrete base with warm LED.", rating: 4.7,
  },
  {
    id: "3", name: "Lounge Concept Sofa", slug: "lounge-concept-sofa", price: 1899,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    description: "Modular sofa designed for contemporary living.", rating: 5.0,
  },
  {
    id: "4", name: "Monochrome Planter", slug: "monochrome-planter", price: 85,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    description: "Matte black ceramic planter, handcrafted.", rating: 4.8,
  },
  {
    id: "5", name: "Oak Wood Shelf", slug: "oak-wood-shelf", price: 349,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    description: "Solid oak floating shelf with brass brackets.", rating: 4.6,
  },
  {
    id: "6", name: "Brass Table Clock", slug: "brass-table-clock", price: 195,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    description: "Brushed brass minimalist table clock.", rating: 4.9,
  },
];

function ProductCard({ product }: { product: (typeof mockProducts)[number] }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    cart.addItem({ productId: product.id, name: product.name, price: product.price, quantity: 1, image: product.image });
    trackCustomEvent("add_to_cart", { productId: product.id });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      className="group relative flex flex-col"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900 mb-4">
          <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex gap-2">
              <button
                onClick={handleAdd}
                className="h-10 px-4 bg-white text-stone-900 rounded-xl text-sm font-bold shadow-xl flex items-center gap-2 hover:bg-stone-50 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                {added ? "Added!" : "Add"}
              </button>
              <div className="h-10 w-10 bg-white text-stone-900 rounded-xl shadow-xl flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-base tracking-tight leading-tight max-w-[75%]">{product.name}</h3>
          <div className="flex items-center gap-1 text-xs font-bold mt-0.5">
            <Star className="w-3 h-3 fill-stone-900 dark:fill-white" />
            <span>{product.rating}</span>
          </div>
        </div>
        <p className="text-stone-500 text-sm mt-1">{formatCurrency(product.price)}</p>
      </div>
    </motion.div>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
      <Section>
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <h1 className="text-5xl font-black tracking-tighter">Collection</h1>
              <p className="text-stone-500 mt-2">Curated objects for the discerning eye.</p>
            </div>
            <p className="text-sm text-stone-400">{mockProducts.length} products</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
            {mockProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}

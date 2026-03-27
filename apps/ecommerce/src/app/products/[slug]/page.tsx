"use client";

import { useCart } from "@/context/CartContext";
import { Container, Section, Button, Card } from "@repo/ui";
import { formatCurrency } from "@repo/lib";
import { trackCustomEvent } from "@repo/analytics";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ArrowLeft, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return (
      <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
        <Section>
          <Container className="max-w-2xl text-center py-24">
            <h1 className="text-3xl font-bold mb-3">Product not found</h1>
            <p className="text-stone-500">The product you are looking for does not exist.</p>
            <div className="mt-8">
              <Link href="/products">
                <Button variant="outline">Back to Products</Button>
              </Link>
            </div>
          </Container>
        </Section>
      </main>
    );
  }
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cart.addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
    });
    trackCustomEvent("add_to_cart", { productId: product.id, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
      <Section>
        <Container>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors text-sm mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Images */}
            <div className="space-y-4">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-full aspect-square rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-900 shadow-2xl"
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all ${
                      selectedImage === i ? "ring-2 ring-stone-900 dark:ring-white" : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-stone-200"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-stone-500">{product.rating} ({product.reviewCount} reviews)</span>
                </div>
                <h1 className="text-4xl font-black tracking-tighter leading-tight">{product.name}</h1>
                <p className="text-3xl font-bold mt-3">{formatCurrency(product.price)}</p>
              </div>

              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{product.description}</p>

              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center gap-3 bg-stone-100 dark:bg-stone-900 rounded-xl px-4 py-2">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="text-stone-500 hover:text-stone-900 transition-colors">−</button>
                  <span className="font-bold w-6 text-center">{quantity}</span>
                  <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} className="text-stone-500 hover:text-stone-900 transition-colors">+</button>
                </div>
                <span className="text-xs text-stone-400">{product.stock} in stock</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  leftIcon={added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                >
                  {added ? "Added to Cart!" : "Add to Cart"}
                </Button>
                <Link href="/checkout">
                  <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                    Buy Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

"use client";

import { useCart } from "@/context/CartContext";
import { Container, Section, Button, Breadcrumb } from "@repo/ui";
import { formatCurrency } from "@repo/lib";
import { trackCustomEvent } from "@repo/analytics";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ArrowLeft, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock product - in production this would be fetched via Prisma based on slug
const getMockProduct = (slug: string) => ({
  id: "1",
  slug,
  name: "Premium Product",
  price: 99.99,
  image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
  description: "Crafted for those who demand precision. The ultimate blend of form and function.",
  details: [
    "Premium materials, designed to last",
    "Handcrafted in limited quantities",
    "Free returns within 30 days",
    "Free worldwide shipping",
  ],
  rating: 4.9,
  reviewCount: 128,
  stock: 10,
  images: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&h=600&fit=crop",
  ],
});

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getMockProduct(params.slug);
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
          <Breadcrumb crumbs={[
            { label: "Accueil", href: "/" },
            { label: "Produits", href: "/products" },
            { label: product.name },
          ]} />

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
                {product.stock < 5 && product.stock > 0 && (
                  <span className="text-xs font-bold text-red-500 bg-red-50 dark:bg-red-950 px-2 py-0.5 rounded-full">
                    Plus que {product.stock} !
                  </span>
                )}
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

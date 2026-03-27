"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { formatCurrency } from "@repo/lib";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { trackCustomEvent } from "@repo/analytics";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number | string;
  images: string[];
  stock: number;
  description?: string;
}

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const { toggle, isWished } = useWishlist();
  const wished = isWished(product.id);
  const image = product.images[0] ?? "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop";

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    cart.addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      image,
    });
    trackCustomEvent("add_to_cart", { productId: product.id });
    toast.success(`${product.name} ajouté au panier`);
  };

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product.id);
    toast(wished ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  return (
    <motion.div
      className="group relative flex flex-col"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900 mb-4">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex gap-2">
              <button
                onClick={handleAdd}
                className="h-10 px-4 bg-white text-stone-900 rounded-xl text-sm font-bold shadow-xl flex items-center gap-2 hover:bg-stone-50 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Ajouter
              </button>
              <button
                onClick={handleWish}
                className="h-10 w-10 bg-white text-stone-900 rounded-xl shadow-xl flex items-center justify-center hover:bg-stone-50 transition-colors"
                aria-label="Favoris"
              >
                <Heart className={`w-4 h-4 ${wished ? "fill-red-500 text-red-500" : ""}`} />
              </button>
            </div>
          </div>
          {product.stock < 5 && product.stock > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              Plus que {product.stock}
            </div>
          )}
        </div>
      </Link>
      <div className="px-1">
        <h3 className="font-bold text-base tracking-tight leading-tight">{product.name}</h3>
        <p className="text-stone-500 text-sm mt-1">{formatCurrency(Number(product.price))}</p>
      </div>
    </motion.div>
  );
}

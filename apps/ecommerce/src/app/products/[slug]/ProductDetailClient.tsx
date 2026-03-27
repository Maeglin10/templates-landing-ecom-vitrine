"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@repo/ui";
import { formatCurrency } from "@repo/lib";
import { trackCustomEvent } from "@repo/analytics";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ArrowLeft, Heart, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  authorName: string | null;
  createdAt: string;
}

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string[];
    stock: number;
    tags: string[];
    categoryName: string;
    categorySlug: string;
    avgRating: number | null;
    reviewCount: number;
    reviews: Review[];
  };
}

export function ProductDetailClient({ product }: ProductDetailProps) {
  const cart = useCart();
  const { toggle, isWished } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const wished = isWished(product.id);

  const handleAddToCart = () => {
    cart.addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0] ?? "",
    });
    trackCustomEvent("add_to_cart", { productId: product.id, quantity });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors text-sm mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Image gallery */}
        <div className="space-y-4">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full aspect-square rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-900 shadow-2xl"
          >
            {product.images[selectedImage] && (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            )}
          </motion.div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all ${
                    selectedImage === i
                      ? "ring-2 ring-stone-900 dark:ring-white"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            {product.avgRating !== null && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.avgRating!)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-stone-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-stone-500">
                  {product.avgRating.toFixed(1)} ({product.reviewCount} review
                  {product.reviewCount !== 1 ? "s" : ""})
                </span>
              </div>
            )}
            <h1 className="text-4xl font-black tracking-tighter leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-bold mt-3">
              {formatCurrency(product.price)}
            </p>
          </div>

          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            {product.description}
          </p>

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center gap-3 bg-stone-100 dark:bg-stone-900 rounded-xl px-4 py-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-stone-500 hover:text-stone-900 transition-colors"
              >
                −
              </button>
              <span className="font-bold w-6 text-center">{quantity}</span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                className="text-stone-500 hover:text-stone-900 transition-colors"
              >
                +
              </button>
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
              leftIcon={<ShoppingCart className="w-5 h-5" />}
            >
              Add to Cart
            </Button>
            <button
              onClick={() => toggle(product.id)}
              className={`p-4 rounded-2xl border-2 transition-colors ${
                wished
                  ? "border-red-400 bg-red-50 dark:bg-red-950 text-red-500"
                  : "border-stone-200 dark:border-stone-700 hover:border-stone-400"
              }`}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={`w-5 h-5 ${wished ? "fill-red-500 text-red-500" : ""}`}
              />
            </button>
            <Link href="/checkout">
              <Button variant="outline" size="lg">
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">
            Customer Reviews ({product.reviewCount})
          </h2>
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-100 dark:border-stone-800"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-stone-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-sm">
                    {review.authorName ?? "Anonymous"}
                  </span>
                  <span className="text-xs text-stone-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {review.comment && (
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

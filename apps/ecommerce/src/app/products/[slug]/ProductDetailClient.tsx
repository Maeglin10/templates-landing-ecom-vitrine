"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ArrowLeft, Heart, CheckCircle } from "lucide-react";
import { Button } from "@repo/ui";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

interface RelatedProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  stock: number;
}

interface ProductData {
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
  details?: string[];
  reviews: {
    id: string;
    rating: number;
    comment: string | null;
    authorName: string;
    createdAt: string;
  }[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProductDetailClient({
  product,
  relatedProducts = [],
}: {
  product: ProductData;
  relatedProducts?: RelatedProduct[];
}) {
  const cart = useCart();
  const wishlist = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  const wished = wishlist.isWished(product.id);

  const handleAddToCart = () => {
    cart.addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0] ?? "",
    });
    setAdded(true);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleWishlist = () => {
    wishlist.toggle(product.id);
    toast(wished ? "Removed from wishlist" : "Added to wishlist");
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

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-stone-400 mb-8">
        <Link href="/" className="hover:text-stone-700 dark:hover:text-stone-200 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-stone-700 dark:hover:text-stone-200 transition-colors">Products</Link>
        <span>/</span>
        <Link href={`/products?category=${product.categorySlug}`} className="hover:text-stone-700 dark:hover:text-stone-200 transition-colors">{product.categoryName}</Link>
        <span>/</span>
        <span className="text-stone-600 dark:text-stone-300">{product.name}</span>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full aspect-square rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-900 shadow-xl"
          >
            {product.images[selectedImage] && (
              <Image
                src={product.images[selectedImage]!}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            )}
          </motion.div>

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
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 block">
              {product.categoryName}
            </span>

            {product.avgRating !== null && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.avgRating!)
                          ? "fill-amber-400 text-amber-400"
                          : "text-stone-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-stone-500">
                  {product.avgRating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            <h1 className="text-4xl font-black tracking-tighter leading-tight mb-3">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-stone-900 dark:text-white">
              {formatCurrency(product.price)}
            </p>
          </div>

          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            {product.description}
          </p>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Product details list */}
          {product.details && product.details.length > 0 && (
            <div className="bg-stone-50 dark:bg-neutral-900 rounded-2xl p-5 space-y-2">
              {product.details.map((detail, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-stone-700 dark:text-stone-300">{detail}</span>
                </div>
              ))}
            </div>
          )}

          {/* Quantity & Stock */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">Quantity:</span>
            <div className="flex items-center gap-3 bg-stone-100 dark:bg-stone-900 rounded-xl px-4 py-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors w-5 h-5 flex items-center justify-center"
              >
                -
              </button>
              <span className="font-bold w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors w-5 h-5 flex items-center justify-center"
              >
                +
              </button>
            </div>
            <span className="text-xs text-stone-400">{product.stock} in stock</span>
            {product.stock < 5 && product.stock > 0 && (
              <span className="text-xs font-bold text-red-500 bg-red-50 dark:bg-red-950 px-2 py-0.5 rounded-full">
                Only {product.stock} left!
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button
              size="lg"
              className={`flex-1 transition-colors ${added ? "bg-green-600 hover:bg-green-700" : ""}`}
              onClick={handleAddToCart}
              leftIcon={added ? <CheckCircle className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
            >
              {added ? "Added to cart!" : "Add to Cart"}
            </Button>

            <button
              onClick={handleToggleWishlist}
              className={`p-3 rounded-xl border-2 transition-colors ${
                wished
                  ? "bg-red-50 dark:bg-red-950 border-red-300 dark:border-red-800 text-red-500"
                  : "bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-400 hover:text-red-500"
              }`}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-5 h-5 ${wished ? "fill-red-500" : ""}`} />
            </button>

            <Link href="/checkout">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Buy Now
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 pt-2 border-t border-stone-100 dark:border-stone-800">
            {["Free delivery over €150", "30-day returns", "Secure payment"].map((badge) => (
              <span key={badge} className="text-xs text-stone-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="text-2xl font-black tracking-tighter mb-8">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((related) => (
              <Link key={related.id} href={`/products/${related.slug}`} className="group block">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900 mb-3">
                  {related.images[0] && (
                    <Image
                      src={related.images[0]}
                      alt={related.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <h3 className="font-bold text-sm tracking-tight">{related.name}</h3>
                <p className="text-stone-500 text-sm mt-0.5">{formatCurrency(related.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

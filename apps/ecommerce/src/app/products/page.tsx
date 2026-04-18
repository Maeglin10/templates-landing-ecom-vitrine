"use client";

import { useState, useMemo } from "react";
import { Container, Section } from "@repo/ui";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/products";
import { Search, X, SlidersHorizontal } from "lucide-react";

const priceRanges = [
  { label: "All prices", min: 0, max: Infinity },
  { label: "Under €50", min: 0, max: 50 },
  { label: "€50 – €150", min: 50, max: 150 },
  { label: "€150 – €300", min: 150, max: 300 },
  { label: "Over €300", min: 300, max: Infinity },
];

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState(0);

  const range = priceRanges[priceRange]!;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || p.category === category;
      const matchesPrice = p.price >= range.min && p.price <= range.max;
      return matchesQuery && matchesCategory && matchesPrice;
    });
  }, [query, category, range]);

  const hasFilters = query || category || priceRange !== 0;

  const clearAll = () => {
    setQuery("");
    setCategory("");
    setPriceRange(0);
  };

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
      <Section>
        <Container>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-5xl font-black tracking-tighter">Collection</h1>
              <p className="text-stone-500 mt-2">Curated objects for the discerning home.</p>
            </div>
            <p className="text-sm text-stone-400">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center mb-10">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="pl-9 pr-4 py-2 border rounded-xl text-sm bg-white dark:bg-neutral-900 dark:border-neutral-700 w-56 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-shadow"
              />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-xl px-3 py-2 text-sm bg-white dark:bg-neutral-900 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-shadow"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Price range */}
            <div className="flex items-center gap-1">
              <SlidersHorizontal className="w-4 h-4 text-stone-400" />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="border rounded-xl px-3 py-2 text-sm bg-white dark:bg-neutral-900 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-shadow"
              >
                {priceRanges.map((r, i) => (
                  <option key={i} value={i}>{r.label}</option>
                ))}
              </select>
            </div>

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap mb-10">
            <button
              onClick={() => setCategory("")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                !category
                  ? "bg-stone-900 dark:bg-white text-white dark:text-stone-900"
                  : "bg-stone-100 dark:bg-neutral-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-neutral-700"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(category === c ? "" : c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  category === c
                    ? "bg-stone-900 dark:bg-white text-white dark:text-stone-900"
                    : "bg-stone-100 dark:bg-neutral-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-neutral-700"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-stone-400">
              <p className="text-lg font-medium mb-2">No products match your filters.</p>
              <button onClick={clearAll} className="text-sm underline hover:text-stone-600 transition-colors">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    images: product.images,
                    stock: product.stock,
                    description: product.description,
                  }}
                />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}

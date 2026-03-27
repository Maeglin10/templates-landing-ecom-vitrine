"use client";

import { useRouter, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { useTransition } from "react";

interface Category { id: string; name: string; slug: string; }
interface SearchParams { q?: string; category?: string; tag?: string; }

export function ProductFilters({
  categories,
  searchParams,
}: {
  categories: Category[];
  searchParams: SearchParams;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(
      Object.entries(searchParams).filter(([, v]) => v != null) as [string, string][]
    );
    if (value) params.set(key, value);
    else params.delete(key);
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  };

  const clearAll = () => startTransition(() => router.push(pathname));
  const hasFilters = Object.values(searchParams).some(Boolean);

  return (
    <div className={`flex flex-wrap gap-3 items-center mb-8 ${isPending ? "opacity-60" : ""} transition-opacity`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          defaultValue={searchParams.q ?? ""}
          onChange={(e) => update("q", e.target.value)}
          placeholder="Rechercher..."
          className="pl-9 pr-4 py-2 border rounded-xl text-sm bg-white dark:bg-neutral-900 dark:border-neutral-700 w-56"
        />
      </div>
      <select
        value={searchParams.category ?? ""}
        onChange={(e) => update("category", e.target.value)}
        className="border rounded-xl px-3 py-2 text-sm bg-white dark:bg-neutral-900 dark:border-neutral-700"
      >
        <option value="">Toutes catégories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.slug}>{c.name}</option>
        ))}
      </select>
      {hasFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
        >
          <X className="w-3 h-3" /> Effacer
        </button>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  searchParams: { q?: string; category?: string; tag?: string; page?: string };
}

export function ProductPagination({ page, totalPages, searchParams }: Props) {
  const pathname = usePathname();

  function buildHref(p: number) {
    const params = new URLSearchParams();
    if (searchParams.q) params.set("q", searchParams.q);
    if (searchParams.category) params.set("category", searchParams.category);
    if (searchParams.tag) params.set("tag", searchParams.tag);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-16">
      {page > 1 ? (
        <Link
          href={buildHref(page - 1)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-stone-200 dark:border-stone-700 text-sm font-medium hover:bg-stone-50 dark:hover:bg-neutral-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Précédent
        </Link>
      ) : (
        <span className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-50 dark:bg-neutral-950 border border-stone-100 dark:border-stone-800 text-sm font-medium text-stone-300 dark:text-stone-600 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
          Précédent
        </span>
      )}

      <span className="text-sm text-stone-500">
        Page {page} / {totalPages}
      </span>

      {page < totalPages ? (
        <Link
          href={buildHref(page + 1)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-stone-200 dark:border-stone-700 text-sm font-medium hover:bg-stone-50 dark:hover:bg-neutral-800 transition-colors"
        >
          Suivant
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-50 dark:bg-neutral-950 border border-stone-100 dark:border-stone-800 text-sm font-medium text-stone-300 dark:text-stone-600 cursor-not-allowed">
          Suivant
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </div>
  );
}

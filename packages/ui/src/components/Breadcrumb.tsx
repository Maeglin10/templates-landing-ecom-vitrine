import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb { label: string; href?: string; }

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-stone-400 mb-6" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3" />}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-stone-700 dark:text-stone-200 font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

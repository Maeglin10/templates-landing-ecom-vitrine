export function ProductSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-3">
      <div className="aspect-[3/4] rounded-2xl bg-stone-200 dark:bg-neutral-800" />
      <div className="h-4 bg-stone-200 dark:bg-neutral-800 rounded-full w-3/4" />
      <div className="h-3 bg-stone-200 dark:bg-neutral-800 rounded-full w-1/3" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

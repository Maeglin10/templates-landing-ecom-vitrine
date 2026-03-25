export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-neutral-950">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 rounded-full border-4 border-stone-200 border-t-stone-900 animate-spin" />
        <p className="text-stone-400 text-sm font-medium tracking-widest uppercase">Loading...</p>
      </div>
    </main>
  );
}

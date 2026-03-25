export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 rounded-full border-4 border-foreground/10 border-t-foreground animate-spin" />
        <p className="text-foreground/50 text-sm font-medium tracking-widest uppercase">Loading...</p>
      </div>
    </main>
  );
}

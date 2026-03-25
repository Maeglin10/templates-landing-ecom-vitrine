"use client";
import { Button } from "@repo/ui";
import { motion } from "framer-motion";

export default function Error({
  error, reset,
}: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center px-4 max-w-lg">
        <div className="text-7xl font-black tracking-tighter text-foreground/10 mb-4">500</div>
        <h1 className="text-3xl font-black mb-4">Something went wrong</h1>
        <p className="text-foreground/60 mb-8">{error.message ?? "An unexpected error occurred."}</p>
        <Button onClick={reset}>Try again</Button>
      </motion.div>
    </main>
  );
}

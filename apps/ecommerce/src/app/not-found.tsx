import Link from "next/link";
import { Button } from "@repo/ui";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-neutral-950">
      <div className="text-center px-4 max-w-lg">
        <div className="text-9xl font-black tracking-tighter text-stone-200 dark:text-stone-900 mb-0 leading-none">404</div>
        <h1 className="text-3xl font-black -mt-6 mb-4">Page not found</h1>
        <p className="text-stone-500 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/"><Button>Back to Home</Button></Link>
      </div>
    </main>
  );
}

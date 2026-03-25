import Link from "next/link";
import { Button } from "@repo/ui";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4 max-w-lg">
        <div className="text-9xl font-black tracking-tighter text-foreground/5 mb-0 leading-none">404</div>
        <h1 className="text-3xl font-black -mt-6 mb-4">Page not found</h1>
        <p className="text-foreground/60 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </main>
  );
}

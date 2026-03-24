import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next-Gen Commerce",
  description: "Modern, scalable eCommerce template powered by Turborepo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen antialiased bg-stone-50 text-stone-900 selection:bg-stone-900 selection:text-white dark:bg-neutral-950 dark:text-neutral-50`}>
        {children}
      </body>
    </html>
  );
}

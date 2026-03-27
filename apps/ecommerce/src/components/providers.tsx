"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { AppProgressBar } from "next-nprogress-bar";
import { WishlistProvider } from "@/context/WishlistContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <WishlistProvider>
          {children}
        </WishlistProvider>
        <Toaster position="bottom-right" richColors />
        <AppProgressBar color="#292524" height="2px" options={{ showSpinner: false }} shallowRouting />
      </ThemeProvider>
    </SessionProvider>
  );
}

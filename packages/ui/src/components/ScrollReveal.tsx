"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  className,
}: ScrollRevealProps) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: prefersReduced ? 0 : duration,
        delay: prefersReduced ? 0 : delay,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

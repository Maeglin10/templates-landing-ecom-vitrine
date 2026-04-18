"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

export interface AnimatedHeroProps {
  headline: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaPrimaryHref?: string;
  ctaSecondaryHref?: string;
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

export function AnimatedHero({
  headline,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  ctaPrimaryHref = "#",
  ctaSecondaryHref = "#",
  className,
}: AnimatedHeroProps) {
  const prefersReduced = usePrefersReducedMotion();
  const dur = (d: number) => (prefersReduced ? 0 : d);

  // Split headline into words
  const words = headline.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.08,
        delayChildren: prefersReduced ? 0 : 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        duration: dur(0.6),
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: dur(0.7),
        delay: prefersReduced ? 0 : 0.4 + words.length * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
      },
    },
  };

  const ctaDelay = prefersReduced ? 0 : 0.6 + words.length * 0.08;

  const ctaVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        delay: ctaDelay,
        duration: dur(0.6),
      },
    },
  };

  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 text-center",
        className
      )}
    >
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-1/4 -left-1/4 h-[60vmax] w-[60vmax] rounded-full bg-primary/30 blur-[140px]"
          animate={
            prefersReduced
              ? {}
              : {
                  x: [0, 80, -40, 0],
                  y: [0, -60, 60, 0],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 h-[50vmax] w-[50vmax] rounded-full bg-violet-500/20 blur-[160px]"
          animate={
            prefersReduced
              ? {}
              : {
                  x: [0, -70, 50, 0],
                  y: [0, 50, -70, 0],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>

      {/* Split-text headline */}
      <motion.h1
        className="mb-6 max-w-5xl text-5xl font-black tracking-tight md:text-7xl lg:text-8xl leading-[1.1] text-balance"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label={headline}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="inline-block mr-[0.25em] last:mr-0"
            style={{ willChange: "transform" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      {/* Subtitle fade-up */}
      <motion.p
        className="mb-12 max-w-2xl text-lg text-foreground/60 md:text-xl text-balance"
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
      >
        {subtitle}
      </motion.p>

      {/* CTA buttons with spring entrance */}
      <motion.div
        className="flex flex-col items-center gap-4 sm:flex-row"
        variants={ctaVariants}
        initial="hidden"
        animate="visible"
      >
        <a
          href={ctaPrimaryHref}
          className="inline-flex h-14 items-center justify-center rounded-2xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {ctaPrimary}
        </a>
        <a
          href={ctaSecondaryHref}
          className="inline-flex h-14 items-center justify-center rounded-2xl border border-foreground/10 bg-transparent px-8 text-base font-semibold text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {ctaSecondary}
        </a>
      </motion.div>
    </section>
  );
}

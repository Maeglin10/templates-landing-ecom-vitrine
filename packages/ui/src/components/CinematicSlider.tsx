"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../utils";

export interface SlideItem {
  headline: string;
  subline: string;
  /** URL for the background image */
  image: string;
  cta?: string;
  ctaHref?: string;
}

export interface CinematicSliderProps {
  slides: SlideItem[];
  className?: string;
  /** Auto-advance interval in milliseconds. Default: 5000 */
  interval?: number;
}

const slideVariants = {
  enter: {
    opacity: 0,
    scale: 0.95,
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.08,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  },
};

const textVariants = {
  enter: { opacity: 0, y: 30 },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.25,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

export function CinematicSlider({
  slides,
  className,
  interval = 5000,
}: CinematicSliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setTimeout(next, interval);
    return () => clearTimeout(timer);
  }, [current, paused, interval, next, slides.length]);

  if (!slides.length) return null;

  const slide = slides[current];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-black",
        className
      )}
      style={{ minHeight: "100svh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Cinematic slider"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
          style={{ willChange: "transform, opacity" }}
          aria-hidden="false"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

          {/* Text content */}
          <motion.div
            key={`text-${current}`}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex flex-col items-center justify-end pb-32 px-6 text-center text-white"
          >
            <h2 className="mb-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl lg:text-7xl text-balance drop-shadow-2xl">
              {slide.headline}
            </h2>
            <p className="mb-8 max-w-2xl text-lg text-white/80 text-balance drop-shadow">
              {slide.subline}
            </p>
            {slide.cta && slide.ctaHref && (
              <a
                href={slide.ctaHref}
                className="inline-flex h-14 items-center justify-center rounded-2xl bg-white px-8 text-base font-semibold text-black shadow-2xl transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                {slide.cta}
              </a>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-8"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-8"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Navigation dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2" role="tablist" aria-label="Slide navigation">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                i === current
                  ? "h-3 w-8 bg-white"
                  : "h-3 w-3 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      {slides.length > 1 && !paused && (
        <motion.div
          key={`progress-${current}`}
          className="absolute bottom-0 left-0 z-20 h-1 bg-white/60"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: interval / 1000, ease: "linear" }}
        />
      )}
    </div>
  );
}

"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../utils";

export interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Parallax speed factor for the background (0 = no parallax, 1 = full scroll speed). Default: 0.4 */
  speed?: number;
  /** Optional background image URL */
  backgroundImage?: string;
  /** Optional background element rendered behind children */
  backgroundElement?: React.ReactNode;
}

export function ParallaxSection({
  children,
  className,
  speed = 0.4,
  backgroundImage,
  backgroundElement,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map scroll progress [0,1] → y displacement in pixels
  // At speed=0.4, the background moves 40% as fast as the scroll
  const yTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {/* Parallax background layer */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: yTransform, willChange: "transform" }}
        aria-hidden="true"
      >
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        {backgroundElement}
      </motion.div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

"use client";
import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../utils";

export interface SectionProps extends Omit<HTMLMotionProps<"section">, "ref" | "children"> {
  animated?: boolean;
  spacing?: "sm" | "md" | "lg" | "xl" | "none";
  children?: React.ReactNode;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, animated = true, spacing = "lg", children, ...props }, ref) => {
    const spacings = {
      none: "py-0",
      sm: "py-12 md:py-16",
      md: "py-16 md:py-24",
      lg: "py-24 md:py-32",
      xl: "py-32 md:py-48",
    };

    const variants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.21, 0.47, 0.32, 0.98],
        },
      },
    };

    const MotionSection = motion.section;

    return (
      <MotionSection
        ref={ref}
        initial={animated ? "hidden" : "visible"}
        whileInView={animated ? "visible" : undefined}
        viewport={{ once: true, margin: "-100px" }}
        variants={animated ? variants : undefined}
        className={cn("w-full relative overflow-hidden", spacings[spacing], className)}
        {...props}
      >
        {children}
      </MotionSection>
    );
  }
);

Section.displayName = "Section";

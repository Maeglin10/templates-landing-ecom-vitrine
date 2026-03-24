"use client";
import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../utils";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "ref" | "children"> {
  glass?: boolean;
  children?: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "relative overflow-hidden rounded-[2rem] border",
          glass
            ? "glass-panel border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-xl"
            : "bg-card border-foreground/5 shadow-2xl shadow-black/5 dark:shadow-white/5",
          "p-8",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 dark:from-white/10 dark:to-white/0 pointer-events-none rounded-[2rem]" />
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

Card.displayName = "Card";

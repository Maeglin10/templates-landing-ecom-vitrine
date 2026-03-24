"use client";
import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-transparent",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent",
      outline:
        "border border-foreground/10 bg-transparent hover:bg-foreground/5 text-foreground",
      ghost: "hover:bg-foreground/5 text-foreground border border-transparent",
      glass:
        "bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 text-foreground hover:bg-white/20 dark:hover:bg-black/20 shadow-xl",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-base",
      icon: "h-10 w-10",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative inline-flex items-center justify-center rounded-2xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 overflow-hidden",
          variants[variant],
          sizes[size],
          (disabled || isLoading) && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            leftIcon
          )}
          {children}
          {!isLoading && rightIcon}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

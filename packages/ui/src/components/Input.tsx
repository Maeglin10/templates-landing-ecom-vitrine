"use client";
import React, { forwardRef } from "react";
import { cn } from "../utils";
import { motion } from "framer-motion";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, icon, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 relative w-full">
        {label && (
          <label className="text-sm font-medium text-foreground/80 pl-1">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none z-10">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            onFocus={(e) => {
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              props.onBlur?.(e);
            }}
            className={cn(
              "w-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3.5 text-base transition-all duration-300",
              "focus:outline-none focus:bg-background focus:border-primary/50 focus:shadow-[0_0_15px_rgba(var(--primary),0.1)]",
              "placeholder:text-foreground/30",
              icon ? "pl-12" : "",
              error ? "border-destructive focus:border-destructive" : "",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-destructive pl-1 font-medium"
          >
            {error}
          </motion.span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

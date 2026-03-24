"use client";
import React, { forwardRef } from "react";
import { cn } from "../utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = "lg", className, children, ...props }, ref) => {
    const sizes = {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-7xl",
      xl: "max-w-[96rem]",
      full: "max-w-none",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full px-4 sm:px-6 lg:px-8",
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className = '', ...props }, ref) => (
    <section
      ref={ref}
      className={`w-full border-b border-neutral-100 py-16 md:py-24 ${className}`}
      {...props}
    />
  )
);

Section.displayName = 'Section';

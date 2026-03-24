import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-lg border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}
      {...props}
    />
  )
);

Card.displayName = 'Card';

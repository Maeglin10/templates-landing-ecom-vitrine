import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, className = '', ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-neutral-700">{label}</label>}
      <input
        ref={ref}
        className={`rounded-lg border border-neutral-300 bg-white px-4 py-2 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent disabled:bg-neutral-100 disabled:cursor-not-allowed ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
);

Input.displayName = 'Input';

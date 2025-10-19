"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variantClasses = {
      default: "bg-[var(--color-nusa-blue)] text-white hover:bg-[var(--color-deep-navy)] focus:ring-[var(--color-nusa-blue)]",
      outline: "border border-[var(--color-nusa-blue)] text-[var(--color-nusa-blue)] hover:bg-[var(--color-nusa-blue)] hover:text-white focus:ring-[var(--color-nusa-blue)]",
      ghost: "text-[var(--color-nusa-blue)] hover:bg-[var(--color-nusa-blue)]/10 focus:ring-[var(--color-nusa-blue)]"
    };

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg"
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

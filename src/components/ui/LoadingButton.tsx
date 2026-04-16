"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function LoadingButton({
  loading = false,
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled,
  className = "",
  ...props
}: LoadingButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-body font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-primary text-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary shadow-primary hover:shadow-lg hover:-translate-y-0.5",
    secondary:
      "bg-white text-foreground border border-slate-200 hover:border-primary hover:text-primary focus:ring-primary",
    ghost:
      "text-foreground hover:bg-slate-100 focus:ring-slate-300",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

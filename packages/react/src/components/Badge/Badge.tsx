"use client";

import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "brand" | "success" | "warning" | "error" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
  brand:
    "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-800/60",
  success:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60",
  warning:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60",
  error:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800/60",
  outline:
    "bg-transparent text-gray-700 border-gray-300 dark:text-gray-300 dark:border-gray-700",
};

const dotColors: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-gray-400 dark:bg-gray-500",
  brand: "bg-violet-600 dark:bg-violet-400",
  success: "bg-emerald-600 dark:bg-emerald-400",
  warning: "bg-amber-600 dark:bg-amber-400",
  error: "bg-red-600 dark:bg-red-400",
  outline: "bg-gray-500",
};

const sizeStyles: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-[11px] gap-1 rounded-md",
  md: "px-2.5 py-1 text-xs gap-1.5 rounded-lg",
};

export const Badge = ({
  children,
  variant = "default",
  size = "sm",
  dot = false,
  icon,
  className = "",
  ...props
}: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center font-medium border shadow-xs ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim()}
      {...props}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColors[variant]}`}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

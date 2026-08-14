"use client";

import React, { useState } from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "busy" | "offline" | "away";
  bot?: boolean;
}

const sizeStyles: Record<NonNullable<AvatarProps["size"]>, { box: string; text: string; status: string }> = {
  xs: { box: "h-6 w-6", text: "text-[10px]", status: "h-1.5 w-1.5" },
  sm: { box: "h-8 w-8", text: "text-xs", status: "h-2 w-2" },
  md: { box: "h-10 w-10", text: "text-sm", status: "h-2.5 w-2.5" },
  lg: { box: "h-12 w-12", text: "text-base", status: "h-3 w-3" },
  xl: { box: "h-16 w-16", text: "text-xl", status: "h-3.5 w-3.5" },
};

const statusColors: Record<NonNullable<AvatarProps["status"]>, string> = {
  online: "bg-emerald-500",
  busy: "bg-red-500",
  away: "bg-amber-500",
  offline: "bg-gray-400",
};

export const Avatar = ({
  src,
  alt = "",
  name,
  size = "md",
  status,
  bot = false,
  className = "",
  ...props
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const s = sizeStyles[size];

  const getInitials = (n?: string) => {
    if (!n) return bot ? "AI" : "?";
    return n
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className={`relative inline-flex shrink-0 select-none ${s.box} ${className}`.trim()}
      {...props}
    >
      <div
        className={`flex h-full w-full items-center justify-center overflow-hidden rounded-full font-medium ${
          bot
            ? "bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-xs"
            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
        } ${s.text}`}
      >
        {src && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || name || "Avatar"}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : bot ? (
          <svg className="h-3/5 w-3/5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </svg>
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {status && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-gray-900 ${s.status} ${statusColors[status]}`}
        />
      )}
    </div>
  );
};

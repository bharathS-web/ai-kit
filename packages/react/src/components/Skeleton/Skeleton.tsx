"use client";

import React from "react";

export interface SkeletonProps {
  variant?: "text" | "circular" | "rectangular" | "chat-bubble" | "tool-card";
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
}

export function Skeleton({
  variant = "rectangular",
  width,
  height,
  lines = 3,
  className = "",
}: SkeletonProps) {
  const baseShimmer =
    "animate-pulse bg-gray-200 dark:bg-gray-800/80 rounded-xl";

  if (variant === "circular") {
    return (
      <div
        className={`${baseShimmer} rounded-full ${className}`}
        style={{
          width: width || "40px",
          height: height || "40px",
        }}
      />
    );
  }

  if (variant === "text") {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`${baseShimmer} h-3.5 ${
              i === lines - 1 ? "w-3/4" : "w-full"
            }`}
          />
        ))}
      </div>
    );
  }

  if (variant === "chat-bubble") {
    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <div className={`${baseShimmer} h-9 w-9 rounded-full shrink-0`} />
        <div className="space-y-2 flex-1 max-w-md">
          <div className={`${baseShimmer} h-3 w-24`} />
          <div className={`${baseShimmer} h-16 w-full rounded-2xl`} />
        </div>
      </div>
    );
  }

  if (variant === "tool-card") {
    return (
      <div
        className={`rounded-2xl border border-gray-200 p-4 dark:border-gray-800 space-y-3 ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`${baseShimmer} h-8 w-8 rounded-xl`} />
            <div className={`${baseShimmer} h-4 w-32`} />
          </div>
          <div className={`${baseShimmer} h-5 w-16 rounded-full`} />
        </div>
        <div className={`${baseShimmer} h-12 w-full`} />
      </div>
    );
  }

  return (
    <div
      className={`${baseShimmer} ${className}`}
      style={{
        width: width || "100%",
        height: height || "100px",
      }}
    />
  );
}

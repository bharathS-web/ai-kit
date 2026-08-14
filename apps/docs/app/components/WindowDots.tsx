"use client";

import React from "react";

interface WindowDotsProps {
  size?: "sm" | "md";
  className?: string;
}

export function WindowDots({ size = "md", className = "" }: WindowDotsProps) {
  const dotSize = size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3";

  return (
    <div className={`flex items-center gap-1.5 select-none ${className}`}>
      <div
        className={`${dotSize} rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-xs`}
        title="Close"
      />
      <div
        className={`${dotSize} rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-xs`}
        title="Minimize"
      />
      <div
        className={`${dotSize} rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-xs`}
        title="Maximize"
      />
    </div>
  );
}

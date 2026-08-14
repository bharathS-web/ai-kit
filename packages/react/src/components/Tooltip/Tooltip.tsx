"use client";

import React, { useState, useRef, useEffect } from "react";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = "bottom",
  delay = 120,
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-800 border-x-transparent border-b-transparent border-4",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 dark:border-b-gray-800 border-x-transparent border-t-transparent border-4",
    left: "left-full top-1/2 -translate-y-1/2 border-l-gray-900 dark:border-l-gray-800 border-y-transparent border-r-transparent border-4",
    right: "right-full top-1/2 -translate-y-1/2 border-r-gray-900 dark:border-r-gray-800 border-y-transparent border-l-transparent border-4",
  };

  return (
    <div
      className="relative inline-flex items-center justify-center"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}

      {isVisible && (
        <div
          role="tooltip"
          className={`pointer-events-none absolute z-[100] whitespace-nowrap rounded-lg border border-gray-700/60 bg-gray-900 px-2.5 py-1 text-[11px] font-medium tracking-tight text-white shadow-2xl backdrop-blur-md dark:border-gray-700/80 dark:bg-[#181F2E] dark:text-gray-100 animate-in fade-in zoom-in-95 duration-100 ${positionClasses[position]} ${className}`}
        >
          {content}
          <div className={`absolute h-0 w-0 ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  );
}

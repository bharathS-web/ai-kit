"use client";

import React from "react";
import { Sparkles, Bot } from "lucide-react";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  suggestions?: string[];
  onSelectSuggestion?: (s: string) => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  suggestions,
  onSelectSuggestion,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center select-none ${className}`}
    >
      {/* Icon Badge */}
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-purple-50 text-brand-600 shadow-md shadow-brand-500/10 dark:bg-purple-950/60 dark:text-purple-300 mb-4 animate-in zoom-in-90 duration-200">
        {icon || <Bot className="h-7 w-7" />}
      </div>

      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        {description}
      </p>

      {/* Primary Action Button */}
      {action && <div className="mt-5">{action}</div>}

      {/* Suggested starter pills */}
      {suggestions && suggestions.length > 0 && (
        <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-md">
          {suggestions.map((suggestion, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSelectSuggestion?.(suggestion)}
              className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 shadow-2xs hover:border-brand-500 hover:text-brand-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-brand-400 transition-all active:scale-95"
            >
              <Sparkles className="h-3 w-3 text-brand-500" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

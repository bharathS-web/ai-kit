"use client";

import React, { useState } from "react";
import { ExternalLink, Globe, BookOpen } from "lucide-react";

export interface CitationProps {
  index?: number | string;
  title: string;
  url?: string;
  domain?: string;
  snippet?: string;
  favicon?: string;
  variant?: "inline" | "card";
  className?: string;
}

export function Citation({
  index,
  title,
  url,
  domain,
  snippet,
  favicon,
  variant = "inline",
  className = "",
}: CitationProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Extract domain if not provided
  const displayDomain =
    domain || (url ? url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0] : "");

  if (variant === "card") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3.5 shadow-xs hover:border-brand-500 hover:shadow-md transition-all dark:border-gray-800 dark:bg-gray-900/60 dark:hover:border-brand-500 ${className}`}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-brand-600 dark:bg-purple-950/70 dark:text-purple-300">
          {favicon ? (
            <img src={favicon} alt="" className="h-4 w-4 rounded-xs" />
          ) : (
            <BookOpen className="h-4 w-4" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {index !== undefined && (
              <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">
                [{index}]
              </span>
            )}
            <h4 className="truncate text-xs font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors">
              {title}
            </h4>
          </div>
          {snippet && (
            <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {snippet}
            </p>
          )}
          {displayDomain && (
            <div className="mt-2 flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500">
              <Globe className="h-3 w-3" />
              <span className="truncate">{displayDomain}</span>
            </div>
          )}
        </div>
        {url && (
          <ExternalLink className="h-3.5 w-3.5 text-gray-400 group-hover:text-brand-600 transition-colors shrink-0 mt-0.5" />
        )}
      </a>
    );
  }

  return (
    <span
      className={`relative inline-flex items-center align-baseline ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a
        href={url || "#"}
        target={url ? "_blank" : undefined}
        rel="noreferrer"
        className="inline-flex items-center gap-1 rounded-md border border-purple-200/80 bg-purple-50/80 px-1.5 py-0.5 text-[11px] font-semibold text-brand-700 shadow-2xs hover:bg-purple-100 hover:border-purple-300 dark:border-purple-900/60 dark:bg-purple-950/40 dark:text-purple-300 dark:hover:bg-purple-950/80 transition-all select-none mx-0.5"
      >
        {index !== undefined ? (
          <span className="font-mono">{index}</span>
        ) : (
          <Globe className="h-3 w-3" />
        )}
        <span className="max-w-[120px] truncate text-[10px] font-medium">
          {displayDomain || title}
        </span>
      </a>

      {/* Hover Preview Card Popover */}
      {isOpen && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 rounded-xl border border-gray-200 bg-white p-3.5 shadow-xl backdrop-blur-md dark:border-gray-800 dark:bg-gray-900 text-left z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-purple-100 text-brand-600 dark:bg-purple-950 dark:text-purple-300">
                <Globe className="h-3 w-3" />
              </div>
              <span className="truncate text-xs font-semibold text-gray-900 dark:text-white">
                {title}
              </span>
            </div>
            {url && (
              <ExternalLink className="h-3 w-3 text-gray-400 shrink-0 mt-0.5" />
            )}
          </div>

          {snippet && (
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
              &quot;{snippet}&quot;
            </p>
          )}

          {displayDomain && (
            <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px] text-gray-400 font-mono">
              <span className="truncate">{displayDomain}</span>
              {index !== undefined && <span>Citation #{index}</span>}
            </div>
          )}
        </div>
      )}
    </span>
  );
}

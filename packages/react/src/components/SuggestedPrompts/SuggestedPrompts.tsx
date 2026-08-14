"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export interface SuggestedPromptItem {
  id: string;
  title: string;
  description?: string;
  promptText?: string;
  icon?: React.ReactNode;
  tag?: string;
}

export interface SuggestedPromptsProps {
  prompts: SuggestedPromptItem[];
  onSelectPrompt?: (promptText: string) => void;
  layout?: "grid" | "horizontal";
  columns?: 2 | 3 | 4;
  className?: string;
}

export function SuggestedPrompts({
  prompts = [],
  onSelectPrompt,
  layout = "grid",
  columns = 2,
  className = "",
}: SuggestedPromptsProps) {
  const gridColsClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  if (layout === "horizontal") {
    return (
      <div
        className={`flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none ${className}`}
      >
        {prompts.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelectPrompt?.(p.promptText || p.title)}
            className="group flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-700 shadow-2xs hover:border-brand-500 hover:bg-purple-50/50 hover:text-brand-700 dark:border-gray-800 dark:bg-[#111827] dark:text-gray-300 dark:hover:border-brand-500 dark:hover:bg-purple-950/30 dark:hover:text-purple-300 transition-all active:scale-95"
          >
            {p.icon ? (
              <span className="text-gray-400 group-hover:text-brand-600 dark:group-hover:text-purple-300 transition-colors">
                {p.icon}
              </span>
            ) : (
              <Sparkles className="h-3.5 w-3.5 text-brand-500" />
            )}
            <span>{p.title}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid gap-3 select-none ${gridColsClasses[columns]} ${className}`}
    >
      {prompts.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onSelectPrompt?.(p.promptText || p.title)}
          className="group relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-2xs hover:border-brand-500 hover:shadow-md hover:-translate-y-0.5 dark:border-gray-800 dark:bg-[#111827] dark:hover:border-brand-500 transition-all active:scale-[0.99]"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-brand-600 dark:bg-purple-950/60 dark:text-purple-300 transition-colors group-hover:scale-110">
                {p.icon || <Sparkles className="h-4 w-4" />}
              </div>

              {p.tag && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  {p.tag}
                </span>
              )}
            </div>

            <h4 className="mt-3 text-xs font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-purple-300 transition-colors">
              {p.title}
            </h4>

            {p.description && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {p.description}
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Use prompt</span>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      ))}
    </div>
  );
}

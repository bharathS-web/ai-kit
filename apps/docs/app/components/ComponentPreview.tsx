"use client";

import React, { useState } from "react";
import { Check, Copy, Moon, Sun, Code2, Eye } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import { WindowDots } from "./WindowDots";
import { useTheme } from "./ThemeContext";
import { Tooltip } from "@inaicode/react";

interface ComponentPreviewProps {
  title?: string;
  code: string;
  children: React.ReactNode;
  align?: "center" | "start" | "between";
  className?: string;
}

export function ComponentPreview({
  title,
  code,
  children,
  align = "center",
  className = "",
}: ComponentPreviewProps) {
  const { theme: globalTheme } = useTheme();
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark" | null>(null);

  // Compute effective dark mode for this preview (defaults to global theme, or honors explicit toggle)
  const isDark = previewTheme !== null ? previewTheme === "dark" : globalTheme === "dark";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const togglePreviewTheme = () => {
    setPreviewTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="my-6">
      {/* Section Subheading + Controls bar */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        {title ? (
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2.5">
          {/* Canvas Dark/Light Toggle */}
          <Tooltip
            content={isDark ? "Switch preview to light" : "Switch preview to dark"}
            position="bottom"
          >
            <button
              onClick={togglePreviewTheme}
              className={`flex h-8 w-8 items-center justify-center rounded-xl border transition-all active:scale-95 ${
                isDark
                  ? "border-gray-800 bg-gray-900/60 text-amber-400 hover:bg-gray-800"
                  : "border-gray-200/80 bg-gray-50/80 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              aria-label="Toggle preview theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </Tooltip>

          {/* Copy Code Icon */}
          <Tooltip content={copied ? "Copied!" : "Copy code"} position="bottom">
            <button
              onClick={handleCopy}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200/80 bg-gray-50/50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-all active:scale-95 relative"
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </Tooltip>

          {/* Animated Sliding Pill Segmented Switch */}
          <div className="relative flex items-center p-0.5 rounded-xl bg-gray-100/90 dark:bg-gray-900/80 border border-gray-200/90 dark:border-gray-800 shadow-inner">
            {/* Smooth Floating Pill with Spring Easing */}
            <div
              className={`absolute top-0.5 bottom-0.5 w-7 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-black/5 dark:border-white/10 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                tab === "preview" ? "left-0.5 translate-x-0" : "left-0.5 translate-x-7"
              }`}
            />

            {/* Preview Button */}
            <Tooltip content="Preview component" position="bottom">
              <button
                onClick={() => setTab("preview")}
                aria-label="Preview component"
                className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200 active:scale-90 ${
                  tab === "preview"
                    ? "text-brand-600 dark:text-brand-400 font-semibold"
                    : "text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
                }`}
              >
                <Eye className="h-4 w-4" />
              </button>
            </Tooltip>

            {/* Code Button */}
            <Tooltip content="View code" position="bottom">
              <button
                onClick={() => setTab("code")}
                aria-label="View code"
                className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200 active:scale-90 ${
                  tab === "code"
                    ? "text-brand-600 dark:text-brand-400 font-semibold"
                    : "text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
                }`}
              >
                <Code2 className="h-4 w-4" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Main Container with Equal Dimensions */}
      <div className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs transition-all">
        {tab === "preview" ? (
          <div
            style={{ colorScheme: isDark ? "dark" : "light" }}
            className={`min-h-[220px] p-8 md:p-12 transition-all duration-300 ease-out flex flex-wrap gap-4 ${
              align === "center"
                ? "items-center justify-center"
                : align === "start"
                ? "items-start justify-start"
                : "items-center justify-between"
            } ${
              isDark
                ? "preview-dark bg-[#0F172A] text-white"
                : "preview-light bg-white text-gray-900"
            } ${className}`}
          >
            {children}
          </div>
        ) : (
          <div className="relative flex flex-col min-h-[220px] w-full min-w-0 max-w-full bg-white dark:bg-[#111827] text-xs font-mono text-gray-900 dark:text-gray-100 transition-all duration-300 ease-out">
            {/* macOS Window Title Bar */}
            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-gray-50/80 px-4 py-2 dark:border-gray-800 dark:bg-gray-900/60 select-none">
              {/* Traffic Light Dots */}
              <WindowDots size="sm" />

              {/* Copy Code button */}
              <button
                onClick={handleCopy}
                title="Copy code"
                aria-label="Copy code"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200/80 bg-white text-gray-500 shadow-xs hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-750 dark:hover:text-white transition-all active:scale-95"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            {/* Code Body - Centered vertically & padded to match Preview height */}
            <div className="flex-1 flex flex-col justify-center p-6 md:p-8 overflow-x-auto">
              <CodeBlock code={code} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

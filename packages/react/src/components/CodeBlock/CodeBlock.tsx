"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

export interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
  showLineNumbers?: boolean;
  allowCopy?: boolean;
  showWindowHeader?: boolean;
  maxHeight?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "typescript",
  fileName,
  showLineNumbers = false,
  allowCopy = true,
  showWindowHeader = true,
  maxHeight = "500px",
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split("\n");

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-200 bg-gray-950 text-gray-100 shadow-lg dark:border-gray-800 ${className}`}
    >
      {/* Top Header */}
      {showWindowHeader && (
        <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900/80 px-4 py-2.5 text-xs text-gray-400 select-none">
          <div className="flex items-center gap-3">
            {/* Window Dots */}
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#EC6A5E]" />
              <span className="h-3 w-3 rounded-full bg-[#F5BF4F]" />
              <span className="h-3 w-3 rounded-full bg-[#61C554]" />
            </div>

            {fileName ? (
              <span className="font-mono text-xs text-gray-300">{fileName}</span>
            ) : (
              <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gray-400">
                <Terminal className="h-3.5 w-3.5 text-brand-400" />
                <span>{language}</span>
              </div>
            )}
          </div>

          {allowCopy && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg border border-gray-700 bg-gray-800/80 px-2.5 py-1 text-xs font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-all active:scale-95"
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-gray-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Code Container */}
      <div
        className="overflow-x-auto p-4 font-mono text-xs leading-relaxed selection:bg-brand-500/30 selection:text-brand-200"
        style={{ maxHeight }}
      >
        <pre className="flex">
          {showLineNumbers && (
            <div
              className="mr-4 flex flex-col select-none text-right font-mono text-gray-600 dark:text-gray-600"
              aria-hidden="true"
            >
              {lines.map((_, i) => (
                <span key={i} className="leading-relaxed">
                  {i + 1}
                </span>
              ))}
            </div>
          )}
          <code className="flex-1 text-gray-200">{code}</code>
        </pre>
      </div>
    </div>
  );
}

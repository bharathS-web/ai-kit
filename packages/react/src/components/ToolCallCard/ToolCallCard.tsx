"use client";

import React, { useState } from "react";

export interface ToolCallCardProps {
  toolName: string;
  args?: Record<string, unknown> | string;
  result?: unknown;
  status?: "pending" | "running" | "success" | "error";
  durationMs?: number;
  className?: string;
}

export const ToolCallCard = ({
  toolName,
  args,
  result,
  status = "success",
  durationMs,
  className = "",
}: ToolCallCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusIcons: Record<NonNullable<ToolCallCardProps["status"]>, React.ReactNode> = {
    pending: <span className="h-2 w-2 rounded-full bg-gray-400" />,
    running: (
      <svg
        className="animate-spin h-3.5 w-3.5 text-violet-600 dark:text-violet-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    ),
    success: (
      <svg className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    error: (
      <svg className="h-3.5 w-3.5 text-red-600 dark:text-red-400" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };

  const formatPayload = (data: unknown) => {
    if (typeof data === "string") return data;
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/90 shadow-xs overflow-hidden text-xs ${className}`.trim()}
    >
      {/* Header Bar */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-gray-50/70 dark:bg-gray-850/60 hover:bg-gray-100/70 dark:hover:bg-gray-800 transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xs">
            {statusIcons[status]}
          </div>
          <span className="font-mono font-semibold text-gray-900 dark:text-white">
            {toolName}
          </span>
          {durationMs !== undefined && (
            <span className="text-[11px] text-gray-400 font-mono">
              {durationMs}ms
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-gray-400">
          <span className="text-[11px] uppercase tracking-wider font-semibold">
            {status}
          </span>
          <svg
            className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </button>

      {/* Expanded Payload View */}
      {isExpanded && (
        <div className="border-t border-gray-100 dark:border-gray-800 p-3 space-y-3 font-mono bg-white dark:bg-gray-900">
          {args && (
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
                Arguments
              </div>
              <pre className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-950/80 border border-gray-100 dark:border-gray-800 text-[11px] text-gray-800 dark:text-gray-200 overflow-x-auto">
                {formatPayload(args)}
              </pre>
            </div>
          )}

          {result !== undefined && (
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
                Result
              </div>
              <pre className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-950/80 border border-gray-100 dark:border-gray-800 text-[11px] text-gray-800 dark:text-gray-200 overflow-x-auto">
                {formatPayload(result)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

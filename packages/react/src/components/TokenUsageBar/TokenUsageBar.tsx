"use client";

import React from "react";
import { Cpu, Zap, AlertCircle } from "lucide-react";

export interface TokenUsageBarProps {
  promptTokens: number;
  completionTokens?: number;
  maxTokens: number;
  cost?: number | string;
  modelName?: string;
  showBreakdown?: boolean;
  className?: string;
}

export function TokenUsageBar({
  promptTokens,
  completionTokens = 0,
  maxTokens,
  cost,
  modelName,
  showBreakdown = true,
  className = "",
}: TokenUsageBarProps) {
  const totalTokens = promptTokens + completionTokens;
  const percentage = Math.min(100, Math.round((totalTokens / maxTokens) * 100));

  const promptPercentage = Math.min(
    100,
    (promptTokens / maxTokens) * 100
  );
  const completionPercentage = Math.min(
    100 - promptPercentage,
    (completionTokens / maxTokens) * 100
  );

  const formatTokens = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`;
    return num.toLocaleString();
  };

  const isNearLimit = percentage >= 85;
  const isCritical = percentage >= 95;

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-[#111827] select-none ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-brand-600 dark:bg-purple-950/60 dark:text-purple-300">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-xs text-gray-900 dark:text-white">
              <span>Context Window Usage</span>
              {modelName && (
                <span className="rounded bg-gray-100 px-1.5 py-0.2 font-mono text-[10px] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  {modelName}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span
            className={`font-bold ${
              isCritical
                ? "text-red-500"
                : isNearLimit
                ? "text-amber-500"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {formatTokens(totalTokens)}
          </span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500 dark:text-gray-400">
            {formatTokens(maxTokens)}
          </span>
          <span
            className={`rounded-md px-1.5 py-0.2 text-[10px] font-bold ${
              isCritical
                ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                : isNearLimit
                ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                : "bg-purple-100 text-brand-700 dark:bg-purple-950 dark:text-purple-300"
            }`}
          >
            {percentage}%
          </span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="mt-3 relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        {/* Prompt Segment */}
        <div
          className="absolute left-0 top-0 bottom-0 bg-brand-600 transition-all duration-300"
          style={{ width: `${promptPercentage}%` }}
        />
        {/* Completion Segment */}
        <div
          className="absolute top-0 bottom-0 bg-indigo-400 dark:bg-indigo-500 transition-all duration-300"
          style={{
            left: `${promptPercentage}%`,
            width: `${completionPercentage}%`,
          }}
        />
      </div>

      {/* Breakdown Legend & Cost */}
      {showBreakdown && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-600" />
              <span>Prompt: {formatTokens(promptTokens)}</span>
            </div>

            {completionTokens > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-400" />
                <span>Output: {formatTokens(completionTokens)}</span>
              </div>
            )}
          </div>

          {cost !== undefined && (
            <div className="font-mono text-gray-400 dark:text-gray-500">
              Est. Cost: <strong className="text-gray-700 dark:text-gray-300">${cost}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

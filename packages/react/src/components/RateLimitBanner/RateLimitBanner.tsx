"use client";

import React, { useState, useEffect } from "react";
import { Clock, AlertTriangle, RotateCcw, Zap } from "lucide-react";

export interface RateLimitBannerProps {
  limitType?: "tokens" | "requests" | "rate_limit";
  retryAfterSeconds?: number;
  limit?: number | string;
  onRetry?: () => void;
  onUpgrade?: () => void;
  variant?: "warning" | "error";
  className?: string;
}

export function RateLimitBanner({
  limitType = "rate_limit",
  retryAfterSeconds = 60,
  limit,
  onRetry,
  onUpgrade,
  variant = "warning",
  className = "",
}: RateLimitBannerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(retryAfterSeconds);

  useEffect(() => {
    setSecondsRemaining(retryAfterSeconds);
  }, [retryAfterSeconds]);

  useEffect(() => {
    if (secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const isReady = secondsRemaining === 0;

  const isError = variant === "error";

  return (
    <div
      role="alert"
      className={`rounded-2xl border p-4 shadow-xs transition-all ${
        isError
          ? "border-red-200 bg-red-50/70 text-red-900 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
          : "border-amber-200 bg-amber-50/70 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200"
      } ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              isError
                ? "bg-red-100 text-red-600 dark:bg-red-900/60 dark:text-red-300"
                : "bg-amber-100 text-amber-600 dark:bg-amber-900/60 dark:text-amber-300"
            }`}
          >
            {isError ? (
              <AlertTriangle className="h-5 w-5" />
            ) : (
              <Clock className="h-5 w-5" />
            )}
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold sm:text-sm">
                {isError ? "Rate Limit Exceeded" : "Approaching Rate Limit"}
              </h4>
              {limit && (
                <span
                  className={`rounded-full px-2 py-0.2 text-[10px] font-semibold font-mono ${
                    isError
                      ? "bg-red-200/80 text-red-800 dark:bg-red-900/80 dark:text-red-200"
                      : "bg-amber-200/80 text-amber-800 dark:bg-amber-900/80 dark:text-amber-200"
                  }`}
                >
                  Max: {limit}
                </span>
              )}
            </div>

            <p className="text-xs opacity-90 leading-relaxed">
              {isReady ? (
                <span>Cooldown finished. You can retry your request now.</span>
              ) : (
                <span>
                  You&apos;ve reached your {limitType.replace("_", " ")} quota. Resets in{" "}
                  <strong className="font-mono font-bold">{secondsRemaining}s</strong>.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          {onUpgrade && (
            <button
              type="button"
              onClick={onUpgrade}
              className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 shadow-2xs hover:bg-amber-50 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200 dark:hover:bg-amber-900 transition-all active:scale-95"
            >
              <Zap className="h-3.5 w-3.5 fill-current" />
              <span>Upgrade Tier</span>
            </button>
          )}

          {onRetry && (
            <button
              type="button"
              disabled={!isReady}
              onClick={onRetry}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-2xs transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                isError
                  ? "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
                  : "bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600"
              }`}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retry Request</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

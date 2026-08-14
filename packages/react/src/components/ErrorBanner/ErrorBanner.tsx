"use client";

import React from "react";

export interface ErrorBannerProps {
  title?: string;
  message: React.ReactNode;
  onRetry?: () => void;
  onDismiss?: () => void;
  retryLabel?: string;
  className?: string;
}

export const ErrorBanner = ({
  title = "Something went wrong",
  message,
  onRetry,
  onDismiss,
  retryLabel = "Try again",
  className = "",
}: ErrorBannerProps) => {
  return (
    <div
      role="alert"
      className={`rounded-xl border border-red-200 bg-red-50/90 p-3.5 text-xs text-red-900 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200 shadow-xs ${className}`.trim()}
    >
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/60 dark:text-red-300">
          <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5V8.5M8 11.5H8.01M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          {title && <p className="font-semibold text-red-950 dark:text-red-100">{title}</p>}
          <div className="mt-0.5 text-red-800 dark:text-red-300 leading-relaxed">
            {message}
          </div>

          {(onRetry || onDismiss) && (
            <div className="mt-2.5 flex items-center gap-3 font-medium">
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="rounded-md bg-red-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs hover:bg-red-700 active:scale-95 transition-all"
                >
                  {retryLabel}
                </button>
              )}
              {onDismiss && (
                <button
                  type="button"
                  onClick={onDismiss}
                  className="text-red-700 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 transition-colors"
                >
                  Dismiss
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";

export interface PermissionPromptProps {
  toolName: string;
  scope: string;
  description?: React.ReactNode;
  onAllowOnce: () => void;
  onAlwaysAllow: () => void;
  onDeny: () => void;
  disabled?: boolean;
  className?: string;
}

export const PermissionPrompt = ({
  toolName,
  scope,
  description,
  onAllowOnce,
  onAlwaysAllow,
  onDeny,
  disabled = false,
  className = "",
}: PermissionPromptProps) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-4.5 shadow-sm dark:border-gray-800 dark:bg-gray-900 text-xs ${className}`.trim()}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-gray-900 dark:text-white">
              Permission Request
            </span>
            <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-[11px] text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {scope}
            </span>
          </div>

          <p className="mt-1 text-gray-600 dark:text-gray-400 leading-relaxed">
            The AI agent is requesting access to invoke <code className="font-semibold font-mono text-gray-800 dark:text-gray-200">{toolName}</code>.
          </p>

          {description && (
            <div className="mt-2 text-gray-500 dark:text-gray-400 text-[11px]">
              {description}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              disabled={disabled}
              onClick={onDeny}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-750 transition-colors disabled:opacity-50"
            >
              Deny
            </button>

            <button
              type="button"
              disabled={disabled}
              onClick={onAllowOnce}
              className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 font-medium text-violet-700 hover:bg-violet-100 dark:border-violet-800/60 dark:bg-violet-950/60 dark:text-violet-300 dark:hover:bg-violet-900/50 transition-colors disabled:opacity-50"
            >
              Allow this time
            </button>

            <button
              type="button"
              disabled={disabled}
              onClick={onAlwaysAllow}
              className="rounded-lg bg-violet-600 px-3 py-1.5 font-semibold text-white shadow-xs hover:bg-violet-700 transition-colors disabled:opacity-50"
            >
              Always allow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

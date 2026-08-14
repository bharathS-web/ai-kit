"use client";

import React from "react";

export interface ApprovalCardProps {
  /** Short title of the proposed action, e.g. "Run `rm -rf dist/`" */
  title: string;
  /** Optional longer description or code/diff preview */
  description?: React.ReactNode;
  onApprove: () => void;
  onReject: () => void;
  /** Disables both buttons, e.g. once a choice has been made */
  disabled?: boolean;
  approveLabel?: string;
  rejectLabel?: string;
  className?: string;
}

export const ApprovalCard = ({
  title,
  description,
  onApprove,
  onReject,
  disabled = false,
  approveLabel = "Approve",
  rejectLabel = "Reject",
  className = "",
}: ApprovalCardProps) => {
  return (
    <div
      className={`rounded-xl border border-amber-200 bg-amber-50 p-4 ${className}`.trim()}
    >
      <div className="flex items-start gap-2">
        <svg
          className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1.5L14.5 13.5H1.5L8 1.5Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M8 6V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="8" cy="11.2" r="0.7" fill="currentColor" />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          {description && (
            <div className="mt-1 text-sm text-gray-600">{description}</div>
          )}
        </div>
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={onReject}
          disabled={disabled}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {rejectLabel}
        </button>
        <button
          type="button"
          onClick={onApprove}
          disabled={disabled}
          className="rounded-md bg-violet-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {approveLabel}
        </button>
      </div>
    </div>
  );
};

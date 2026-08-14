"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle, AlertCircle, Info, X, Loader2 } from "lucide-react";

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "warning" | "info";
  confirmationKeyword?: string;
  isLoading?: boolean;
  className?: string;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  variant = "danger",
  confirmationKeyword,
  isLoading = false,
  className = "",
}: ConfirmDialogProps) {
  const [typedKeyword, setTypedKeyword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTypedKeyword("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape" && !isLoading) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  const isConfirmedAllowed = confirmationKeyword
    ? typedKeyword.trim() === confirmationKeyword.trim()
    : true;

  const config = {
    danger: {
      icon: <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />,
      iconBg: "bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-900/60",
      buttonBg: "bg-red-600 hover:bg-red-700 text-white shadow-red-500/20",
    },
    warning: {
      icon: <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
      iconBg: "bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900/60",
      buttonBg: "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/20",
    },
    info: {
      icon: <Info className="h-5 w-5 text-brand-600 dark:text-brand-400" />,
      iconBg: "bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-900/60",
      buttonBg: "bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20",
    },
  };

  const current = config[variant];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in duration-150"
    >
      <div
        className={`w-full max-w-md overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-[#111827] text-left animate-in zoom-in-95 duration-150 ${className}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${current.iconBg}`}
            >
              {current.icon}
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
              <div className="mt-1 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {description}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Confirmation Keyword Input */}
        {confirmationKeyword && (
          <div className="mt-5 space-y-2 rounded-2xl border border-gray-100 bg-gray-50/80 p-3.5 dark:border-gray-800 dark:bg-gray-900/60">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
              Type <strong className="font-mono text-gray-900 dark:text-white select-all">{confirmationKeyword}</strong> to confirm:
            </label>
            <input
              type="text"
              value={typedKeyword}
              onChange={(e) => setTypedKeyword(e.target.value)}
              placeholder={confirmationKeyword}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-1.5 font-mono text-xs text-gray-900 focus:border-brand-500 focus:outline-hidden dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            disabled={isLoading}
            onClick={onCancel}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-all active:scale-95 disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            disabled={!isConfirmedAllowed || isLoading}
            onClick={onConfirm}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${current.buttonBg}`}
          >
            {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            <span>{confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

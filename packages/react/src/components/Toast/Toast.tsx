"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

export interface ToastProps {
  title: string;
  description?: string;
  variant?: "success" | "error" | "info" | "warning";
  onClose?: () => void;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function Toast({
  title,
  description,
  variant = "info",
  onClose,
  duration = 4000,
  action,
  className = "",
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
    error: <AlertCircle className="h-4 w-4 text-red-500" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    info: <Info className="h-4 w-4 text-brand-500" />,
  };

  return (
    <div
      role="status"
      className={`flex items-start gap-3 rounded-2xl border border-gray-200 bg-white/95 p-3.5 shadow-xl backdrop-blur-md dark:border-gray-800 dark:bg-[#111827]/95 select-none animate-in fade-in slide-in-from-bottom-2 duration-150 max-w-sm ${className}`}
    >
      <div className="shrink-0 mt-0.5">{icons[variant]}</div>

      <div className="min-w-0 flex-1 space-y-0.5">
        <h4 className="text-xs font-bold text-gray-900 dark:text-white">
          {title}
        </h4>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        )}
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="mt-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            {action.label}
          </button>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

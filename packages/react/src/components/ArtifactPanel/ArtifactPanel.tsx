"use client";

import React, { useState } from "react";
import {
  FileCode2,
  FileText,
  Image as ImageIcon,
  Copy,
  Check,
  Download,
  Maximize2,
  Minimize2,
  X,
  History,
  ChevronDown,
} from "lucide-react";

export interface ArtifactPanelProps {
  title: string;
  type?: "code" | "markdown" | "image" | "html" | "document";
  version?: number | string;
  versionsCount?: number;
  onVersionChange?: (v: number) => void;
  children: React.ReactNode;
  onClose?: () => void;
  onCopy?: () => void;
  onDownload?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  className?: string;
}

export function ArtifactPanel({
  title,
  type = "code",
  version = 1,
  versionsCount = 1,
  onVersionChange,
  children,
  onClose,
  onCopy,
  onDownload,
  isFullscreen = false,
  onToggleFullscreen,
  className = "",
}: ArtifactPanelProps) {
  const [copied, setCopied] = useState(false);
  const [isVersionMenuOpen, setIsVersionMenuOpen] = useState(false);

  const handleCopy = () => {
    onCopy?.();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const typeIcons = {
    code: <FileCode2 className="h-4 w-4 text-brand-600 dark:text-brand-400" />,
    markdown: <FileText className="h-4 w-4 text-indigo-500" />,
    image: <ImageIcon className="h-4 w-4 text-emerald-500" />,
    html: <FileCode2 className="h-4 w-4 text-amber-500" />,
    document: <FileText className="h-4 w-4 text-blue-500" />,
  };

  return (
    <div
      className={`flex flex-col rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-[#111827] overflow-hidden ${
        isFullscreen ? "fixed inset-4 z-50 rounded-2xl" : "h-full"
      } ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/90 px-4 py-3 dark:border-gray-800 dark:bg-[#0E131F] select-none">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-200/80 shadow-2xs dark:bg-gray-800 dark:border-gray-700">
            {typeIcons[type]}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-xs font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
            <span className="font-mono text-[10px] text-gray-400 uppercase">
              {type} artifact
            </span>
          </div>

          {/* Version Selector Dropdown */}
          {versionsCount > 1 && (
            <div className="relative ml-2">
              <button
                type="button"
                onClick={() => setIsVersionMenuOpen(!isVersionMenuOpen)}
                className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-0.5 text-[11px] font-mono font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                <History className="h-3 w-3 text-brand-600" />
                <span>v{version}</span>
                <ChevronDown className="h-3 w-3 text-gray-400" />
              </button>

              {isVersionMenuOpen && (
                <div className="absolute left-0 top-full mt-1 w-28 rounded-xl border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-800 dark:bg-gray-900 z-30 animate-in fade-in zoom-in-95 duration-100">
                  {Array.from({ length: versionsCount }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        onVersionChange?.(idx + 1);
                        setIsVersionMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2 py-1 text-[11px] font-mono ${
                        Number(version) === idx + 1
                          ? "bg-brand-50 font-bold text-brand-700 dark:bg-purple-950 dark:text-purple-300"
                          : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
                      }`}
                    >
                      <span>Version {idx + 1}</span>
                      {Number(version) === idx + 1 && (
                        <Check className="h-3 w-3 text-brand-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {onCopy && (
            <button
              type="button"
              onClick={handleCopy}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/70 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
              title="Copy content"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          )}

          {onDownload && (
            <button
              type="button"
              onClick={onDownload}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/70 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
              title="Download artifact"
            >
              <Download className="h-3.5 w-3.5" />
            </button>
          )}

          {onToggleFullscreen && (
            <button
              type="button"
              onClick={onToggleFullscreen}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200/70 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </button>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-950/60 dark:hover:text-red-400 transition-colors"
              title="Close panel"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Artifact Body Container */}
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </div>
  );
}

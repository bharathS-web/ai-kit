"use client";

import React, { useState } from "react";
import { Terminal, Code2, Plus, Sparkles, Copy, Check } from "lucide-react";

export interface SystemPromptEditorProps {
  value: string;
  onChange: (val: string) => void;
  variables?: string[];
  placeholder?: string;
  maxCharacters?: number;
  className?: string;
}

export function SystemPromptEditor({
  value,
  onChange,
  variables = ["user_role", "current_date", "workspace_context", "database_schema"],
  placeholder = "You are an autonomous AI coding agent designed to...",
  maxCharacters = 4000,
  className = "",
}: SystemPromptEditorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsertVariable = (varName: string) => {
    const token = `{{${varName}}}`;
    onChange(value + (value.endsWith(" ") || value.length === 0 ? "" : " ") + token);
  };

  const estTokens = Math.round(value.length / 4);

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-[#111827] overflow-hidden select-none text-left ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-4 py-2.5 dark:border-gray-800 dark:bg-gray-900/60">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span className="text-xs font-bold text-gray-900 dark:text-white">
            System Instructions / Prompt
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-gray-400">
            ~{estTokens} tokens ({value.length}/{maxCharacters})
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-[11px] font-semibold text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            {copied ? (
              <Check className="h-3 w-3 text-emerald-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="p-3 space-y-3">
        <textarea
          value={value}
          maxLength={maxCharacters}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={5}
          className="w-full rounded-xl border border-gray-200 bg-white p-3 font-mono text-xs text-gray-900 focus:border-brand-500 focus:outline-hidden dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100 leading-relaxed resize-y"
        />

        {/* Variable Injector Pills */}
        {variables.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-semibold text-gray-400">
              Insert variable:
            </span>
            {variables.map((variable) => (
              <button
                key={variable}
                type="button"
                onClick={() => handleInsertVariable(variable)}
                className="flex items-center gap-1 rounded-lg border border-purple-200 bg-purple-50/80 px-2 py-0.5 font-mono text-[11px] font-medium text-brand-700 hover:bg-purple-100 dark:border-purple-900/60 dark:bg-purple-950/40 dark:text-purple-300 transition-all active:scale-95"
              >
                <Plus className="h-3 w-3" />
                <span>{`{{${variable}}}`}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

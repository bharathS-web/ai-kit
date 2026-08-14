"use client";

import React, { useState } from "react";
import { Eye, EyeOff, KeyRound, Check, Copy, ShieldCheck } from "lucide-react";

export interface APIKeyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  provider?: "openai" | "anthropic" | "google" | "custom" | string;
  isValid?: boolean;
  allowCopy?: boolean;
  className?: string;
}

export function APIKeyInput({
  value,
  onChange,
  placeholder = "sk-••••••••••••••••••••••••••••••••",
  label = "API Secret Key",
  provider,
  isValid,
  allowCopy = true,
  className = "",
}: APIKeyInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getProviderBadge = () => {
    if (!provider) return null;
    const labels: Record<string, string> = {
      openai: "OpenAI",
      anthropic: "Anthropic",
      google: "Google Gemini",
      custom: "Custom LLM",
    };
    return labels[provider] || provider;
  };

  return (
    <div className={`space-y-1.5 text-left select-none ${className}`}>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
          <KeyRound className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
          <span>{label}</span>
        </label>

        {provider && (
          <span className="rounded-md bg-purple-50 px-2 py-0.2 text-[10px] font-semibold text-brand-700 dark:bg-purple-950 dark:text-purple-300">
            {getProviderBadge()}
          </span>
        )}
      </div>

      <div className="relative flex items-center">
        <input
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-3 pr-20 font-mono text-xs text-gray-900 shadow-2xs placeholder:text-gray-400 focus:border-brand-500 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-brand-400 transition-colors"
        />

        {/* Right Icon Actions */}
        <div className="absolute right-2 flex items-center gap-1">
          {isValid !== undefined && value.length > 0 && (
            <span
              className={`p-1 ${
                isValid
                  ? "text-emerald-500"
                  : "text-amber-500"
              }`}
              title={isValid ? "Valid API Key format" : "Unverified key"}
            >
              <ShieldCheck className="h-4 w-4" />
            </span>
          )}

          {allowCopy && value.length > 0 && (
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
              title="Copy Key"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
            title={isVisible ? "Hide Key" : "Show Key"}
          >
            {isVisible ? (
              <EyeOff className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

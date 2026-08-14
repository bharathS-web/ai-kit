"use client";

import React, { useState, useRef, useEffect } from "react";

export interface AIModel {
  id: string;
  name: string;
  provider?: string;
  badge?: string;
  description?: string;
}

export interface ModelSelectorProps {
  models: AIModel[];
  value: string;
  onChange: (modelId: string) => void;
  disabled?: boolean;
  className?: string;
}

export const ModelSelector = ({
  models,
  value,
  onChange,
  disabled = false,
  className = "",
}: ModelSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedModel = models.find((m) => m.id === value) || models[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-xs ${className}`.trim()}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-800 shadow-xs hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 transition-all"
      >
        <span className="flex h-2 w-2 rounded-full bg-violet-600" />
        <span className="font-semibold">{selectedModel?.name || "Select Model"}</span>
        {selectedModel?.badge && (
          <span className="rounded bg-violet-50 px-1.5 py-0.5 text-[10px] font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
            {selectedModel.badge}
          </span>
        )}
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 z-50 w-64 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-gray-800 dark:bg-gray-900 animate-in fade-in zoom-in-95 duration-100">
          <div className="space-y-1">
            {models.map((model) => {
              const isSelected = model.id === value;
              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => {
                    onChange(model.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-left transition-colors ${
                    isSelected
                      ? "bg-violet-50 text-violet-900 dark:bg-violet-950/60 dark:text-violet-200 font-semibold"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span>{model.name}</span>
                      {model.badge && (
                        <span className="rounded bg-violet-100 px-1.5 py-0.2 text-[9px] font-bold text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                          {model.badge}
                        </span>
                      )}
                    </div>
                    {model.description && (
                      <div className="text-[11px] text-gray-400 font-normal">
                        {model.description}
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <svg className="h-4 w-4 text-violet-600 dark:text-violet-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

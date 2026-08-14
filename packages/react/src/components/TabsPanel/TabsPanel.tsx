"use client";

import React from "react";
import { X, Plus } from "lucide-react";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  closable?: boolean;
}

export interface TabsPanelProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  onCloseTab?: (id: string) => void;
  onAddTab?: () => void;
  variant?: "pills" | "underlined" | "enclosed";
  className?: string;
}

export function TabsPanel({
  tabs = [],
  activeTab,
  onChange,
  onCloseTab,
  onAddTab,
  variant = "enclosed",
  className = "",
}: TabsPanelProps) {
  if (variant === "underlined") {
    return (
      <div
        className={`flex items-center gap-1 border-b border-gray-200 dark:border-gray-800 select-none overflow-x-auto ${className}`}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`group flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-all -mb-[1px] ${
                isActive
                  ? "border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-300"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isActive
                      ? "bg-purple-100 text-brand-700 dark:bg-purple-950 dark:text-purple-300"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-1.5 rounded-2xl border border-gray-200/90 bg-gray-50/80 p-1 dark:border-gray-800 dark:bg-gray-900/80 select-none overflow-x-auto ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <div
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`group flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all ${
              isActive
                ? "bg-white text-gray-900 shadow-xs dark:bg-gray-800 dark:text-white"
                : "text-gray-500 hover:bg-gray-200/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
            }`}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span className="truncate">{tab.label}</span>

            {tab.badge !== undefined && (
              <span className="rounded-full bg-gray-100 px-1.5 py-0.2 text-[10px] font-mono text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                {tab.badge}
              </span>
            )}

            {tab.closable && onCloseTab && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
                className="ml-1 rounded-sm p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        );
      })}

      {onAddTab && (
        <button
          type="button"
          onClick={onAddTab}
          className="flex h-7 w-7 items-center justify-center rounded-xl text-gray-400 hover:bg-gray-200/60 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors shrink-0"
          title="Add Tab"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

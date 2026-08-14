"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Terminal, Code2, Bot, Database, Search } from "lucide-react";

export interface SlashCommandItem {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode;
  category?: string;
  shortcut?: string;
}

export interface SlashCommandMenuProps {
  commands: SlashCommandItem[];
  query?: string;
  onSelectCommand?: (command: SlashCommandItem) => void;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export function SlashCommandMenu({
  commands = [],
  query = "",
  onSelectCommand,
  isOpen = true,
  onClose,
  className = "",
}: SlashCommandMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredCommands = commands.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      (c.category && c.category.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || filteredCommands.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          onSelectCommand?.(filteredCommands[selectedIndex]);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onSelectCommand, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      className={`w-80 sm:w-96 overflow-hidden rounded-2xl border border-gray-200 bg-white/95 shadow-2xl backdrop-blur-md dark:border-gray-800 dark:bg-[#111827]/95 select-none animate-in fade-in zoom-in-95 duration-100 z-50 ${className}`}
    >
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-gray-100 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:border-gray-800/80 dark:text-gray-500">
        <div className="flex items-center gap-1.5">
          <Terminal className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
          <span>Slash Commands</span>
        </div>
        <span className="font-mono text-[10px]">
          {filteredCommands.length} available
        </span>
      </div>

      {/* Command List */}
      <div className="max-h-64 overflow-y-auto p-1.5 space-y-1">
        {filteredCommands.length === 0 ? (
          <div className="py-6 text-center text-xs text-gray-400 dark:text-gray-500">
            No matching commands
          </div>
        ) : (
          filteredCommands.map((command, idx) => {
            const isSelected = selectedIndex === idx;

            return (
              <button
                key={command.id}
                type="button"
                onClick={() => onSelectCommand?.(command)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-all ${
                  isSelected
                    ? "bg-brand-50 text-brand-900 dark:bg-purple-950/60 dark:text-purple-200"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/60"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isSelected
                        ? "bg-brand-600 text-white shadow-2xs"
                        : "bg-purple-100 text-brand-600 dark:bg-purple-950/80 dark:text-purple-300"
                    }`}
                  >
                    {command.icon || <Sparkles className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold">
                        /{command.name}
                      </span>
                      {command.category && (
                        <span className="rounded bg-gray-100 px-1.5 py-0.2 text-[9px] font-semibold text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                          {command.category}
                        </span>
                      )}
                    </div>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                      {command.description}
                    </p>
                  </div>
                </div>

                {command.shortcut && (
                  <kbd className="ml-2 shrink-0 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-mono text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                    {command.shortcut}
                  </kbd>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* Footer Key Hints */}
      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/80 px-3 py-1.5 text-[10px] text-gray-400 dark:border-gray-800 dark:bg-gray-900/50">
        <span className="flex items-center gap-1">
          <kbd className="rounded border bg-white px-1 dark:border-gray-700 dark:bg-gray-800">
            ↑
          </kbd>
          <kbd className="rounded border bg-white px-1 dark:border-gray-700 dark:bg-gray-800">
            ↓
          </kbd>
          <span>to navigate</span>
        </span>
        <span>
          <kbd className="rounded border bg-white px-1 dark:border-gray-700 dark:bg-gray-800">
            ↵
          </kbd>{" "}
          to select
        </span>
      </div>
    </div>
  );
}

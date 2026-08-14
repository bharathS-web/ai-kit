"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Search,
  Plus,
  Pin,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

export interface ConversationThread {
  id: string;
  title: string;
  date?: string;
  category?: "Today" | "Yesterday" | "Previous 7 Days" | "Older" | string;
  isPinned?: boolean;
  messageCount?: number;
}

export interface ConversationHistoryProps {
  threads: ConversationThread[];
  activeId?: string;
  onSelect?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPin?: (id: string) => void;
  onNewChat?: () => void;
  showSearch?: boolean;
  className?: string;
}

export function ConversationHistory({
  threads = [],
  activeId,
  onSelect,
  onDelete,
  onPin,
  onNewChat,
  showSearch = true,
  className = "",
}: ConversationHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThreads = threads.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group threads by category
  const categories = Array.from(
    new Set(filteredThreads.map((t) => t.category || "Conversations"))
  );

  return (
    <div
      className={`flex h-full flex-col rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#111827] shadow-sm select-none ${className}`}
    >
      {/* Header with New Chat Button */}
      <div className="p-3 border-b border-gray-100 dark:border-gray-800/80 space-y-2">
        <button
          onClick={onNewChat}
          className="flex w-full items-center justify-between rounded-xl bg-brand-600 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>New Chat</span>
          </div>
          <kbd className="rounded border border-white/30 bg-white/15 px-1.5 py-0.2 text-[10px] font-mono">
            ⌘N
          </kbd>
        </button>

        {showSearch && (
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50/60 pl-8 pr-3 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:outline-hidden dark:border-gray-800 dark:bg-gray-900/60 dark:text-white dark:focus:border-brand-400 transition-colors"
            />
          </div>
        )}
      </div>

      {/* Threads List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {filteredThreads.length === 0 ? (
          <div className="py-8 text-center text-xs text-gray-400 dark:text-gray-500">
            No conversations found
          </div>
        ) : (
          categories.map((category) => {
            const categoryThreads = filteredThreads.filter(
              (t) => (t.category || "Conversations") === category
            );

            return (
              <div key={category} className="space-y-1">
                <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {category}
                </div>

                {categoryThreads.map((thread) => {
                  const isActive = activeId === thread.id;

                  return (
                    <div
                      key={thread.id}
                      onClick={() => onSelect?.(thread.id)}
                      className={`group relative flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-all cursor-pointer ${
                        isActive
                          ? "bg-purple-50 text-brand-700 font-semibold dark:bg-purple-950/60 dark:text-purple-300"
                          : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
                        {thread.isPinned ? (
                          <Pin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        ) : (
                          <MessageSquare
                            className={`h-3.5 w-3.5 shrink-0 ${
                              isActive
                                ? "text-brand-600 dark:text-brand-400"
                                : "text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-400"
                            }`}
                          />
                        )}
                        <span className="truncate">{thread.title}</span>
                      </div>

                      {/* Action buttons on hover */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onPin && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onPin(thread.id);
                            }}
                            className="flex h-5 w-5 items-center justify-center rounded text-gray-400 hover:text-amber-500 transition-colors"
                            title="Pin thread"
                          >
                            <Pin className="h-3 w-3" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(thread.id);
                            }}
                            className="flex h-5 w-5 items-center justify-center rounded text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete thread"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

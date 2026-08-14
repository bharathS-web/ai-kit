"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Loader2,
  SlidersHorizontal,
  Paperclip,
  KeyRound,
  MousePointerClick,
  Tag,
  UserCheck,
  Type,
  Code2,
  AlertTriangle,
  Sparkles,
  Terminal,
  History,
} from "lucide-react";

interface ComponentItem {
  name: string;
  category: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}

export const ALL_COMPONENTS: ComponentItem[] = [
  // Get Started
  {
    name: "Introduction",
    category: "Get Started",
    href: "/introduction",
    description: "Overview of AI Kit React, tech stack, and accessibility",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    name: "Installation",
    category: "Get Started",
    href: "/installation",
    description: "Install via CLI or configure Tailwind and peer dependencies manually",
    icon: <Terminal className="h-4 w-4" />,
  },
  {
    name: "Changelog",
    category: "Get Started",
    href: "/changelog",
    description: "Release history, new features, and changelog updates",
    icon: <History className="h-4 w-4" />,
  },

  // Conversation
  {
    name: "MessageBubble",
    category: "Conversation",
    href: "/components/message-bubble",
    description: "User & assistant message bubbles with avatar and timestamps",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    name: "MessageList",
    category: "Conversation",
    href: "/components/message-list",
    description: "Scrollable chat container with auto-scroll and empty states",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    name: "StreamingText",
    category: "Conversation",
    href: "/components/streaming-text",
    description: "Token-by-token reveal effect with pulsing cursor for streaming LLM responses",
    icon: <Type className="h-4 w-4" />,
  },

  // Status & Feedback
  {
    name: "Thinking",
    category: "Status & Feedback",
    href: "/components/thinking",
    description: "Animated bouncing dot reasoning indicator during AI planning",
    icon: <Loader2 className="h-4 w-4" />,
  },
  {
    name: "ToolCallCard",
    category: "Status & Feedback",
    href: "/components/tool-call-card",
    description: "Tool/function execution preview with arguments and results",
    icon: <Code2 className="h-4 w-4" />,
  },
  {
    name: "ErrorBanner",
    category: "Status & Feedback",
    href: "/components/error-banner",
    description: "Recoverable error alert with retry and dismiss triggers",
    icon: <AlertTriangle className="h-4 w-4" />,
  },

  // Input & Controls
  {
    name: "PromptBox",
    category: "Input & Controls",
    href: "/components/prompt-box",
    description: "Auto-resizing prompt input with keyboard send actions",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    name: "ModelSelector",
    category: "Input & Controls",
    href: "/components/model-selector",
    description: "Dropdown selector for switching LLMs and foundation models",
    icon: <SlidersHorizontal className="h-4 w-4" />,
  },
  {
    name: "FileAttachment",
    category: "Input & Controls",
    href: "/components/file-attachment",
    description: "File attachment chips with type icons and remove buttons",
    icon: <Paperclip className="h-4 w-4" />,
  },

  // Actions & Permissions
  {
    name: "ApprovalCard",
    category: "Actions & Permissions",
    href: "/components/approval-card",
    description: "Human-in-the-loop confirmation for agent mutations and tools",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    name: "PermissionPrompt",
    category: "Actions & Permissions",
    href: "/components/permission-prompt",
    description: "Permission dialog offering allow-once vs always-allow choices",
    icon: <KeyRound className="h-4 w-4" />,
  },

  // Foundations
  {
    name: "Button",
    category: "Foundations",
    href: "/components/button",
    description: "Action button with loading states and variants",
    icon: <MousePointerClick className="h-4 w-4" />,
  },
  {
    name: "Badge",
    category: "Foundations",
    href: "/components/badge",
    description: "Status and tag badges with dot indicators",
    icon: <Tag className="h-4 w-4" />,
  },
  {
    name: "Avatar",
    category: "Foundations",
    href: "/components/avatar",
    description: "User and agent avatars with status rings and bot icons",
    icon: <UserCheck className="h-4 w-4" />,
  },
];

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = ALL_COMPONENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-[#111827]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-gray-200 px-4 py-3 dark:border-gray-800">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search PromptBox, ToolCallCard, Button, Avatar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent px-3 text-sm text-gray-900 placeholder-gray-400 outline-none dark:text-white"
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-500">
              No components matching &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800/80"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-brand-600 dark:bg-purple-950 dark:text-purple-400">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                        {item.name}
                        <span className="rounded bg-purple-100 px-1.5 py-0.2 text-[10px] font-semibold text-brand-700 dark:bg-purple-900/50 dark:text-purple-300">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900/50">
          <span>Navigate: <kbd className="rounded border bg-white px-1.5 py-0.5 text-[10px] dark:border-gray-700 dark:bg-gray-800">↑</kbd> <kbd className="rounded border bg-white px-1.5 py-0.5 text-[10px] dark:border-gray-700 dark:bg-gray-800">↓</kbd></span>
          <span>Open: <kbd className="rounded border bg-white px-1.5 py-0.5 text-[10px] dark:border-gray-700 dark:bg-gray-800">↵</kbd></span>
          <span>Close: <kbd className="rounded border bg-white px-1.5 py-0.5 text-[10px] dark:border-gray-700 dark:bg-gray-800">esc</kbd></span>
        </div>
      </div>
    </div>
  );
}

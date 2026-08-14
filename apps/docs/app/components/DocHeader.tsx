"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Moon,
  Sun,
  ChevronRight,
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
  Clock,
  Cpu,
  Activity,
  FileCode2,
  FileText,
  ThumbsUp,
  Star,
  Flame,
  Volume2,
  Layers,
  Bot,
  CheckCircle2,
  Mic,
  Image as ImageIcon,
} from "lucide-react";
import { useTheme } from "./ThemeContext";
import { GithubIcon, AiKitLogo } from "./Icons";
import { Tooltip } from "@inaicode/react";

export interface ComponentSearchItem {
  name: string;
  category: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}

export const SEARCH_ITEMS: ComponentSearchItem[] = [
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

  // 1. Conversation
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
  {
    name: "CodeBlock",
    category: "Conversation",
    href: "/components/code-block",
    description: "Syntax-highlighted code block with line numbers, copy action, and window header",
    icon: <Code2 className="h-4 w-4" />,
  },
  {
    name: "Citation",
    category: "Conversation",
    href: "/components/citation",
    description: "Inline reference chip with expandable source preview popover",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    name: "ConversationHistory",
    category: "Conversation",
    href: "/components/conversation-history",
    description: "Sidebar thread list with date categorization, search filter, and pin/delete",
    icon: <History className="h-4 w-4" />,
  },

  // 2. Input & Controls
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
  {
    name: "SuggestedPrompts",
    category: "Input & Controls",
    href: "/components/suggested-prompts",
    description: "Clickable starter prompt cards for empty states and suggestions",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    name: "VoiceInputButton",
    category: "Input & Controls",
    href: "/components/voice-input-button",
    description: "Microphone recording toggle with pulsing audio waveforms and timer",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    name: "SlashCommandMenu",
    category: "Input & Controls",
    href: "/components/slash-command-menu",
    description: "Popover autocomplete menu triggered by / with keyboard navigation",
    icon: <Terminal className="h-4 w-4" />,
  },

  // 3. Status & Telemetry
  {
    name: "Thinking",
    category: "Status & Telemetry",
    href: "/components/thinking",
    description: "Animated bouncing dot reasoning indicator during AI planning",
    icon: <Loader2 className="h-4 w-4" />,
  },
  {
    name: "ToolCallCard",
    category: "Status & Telemetry",
    href: "/components/tool-call-card",
    description: "Tool/function execution preview with arguments and results",
    icon: <Code2 className="h-4 w-4" />,
  },
  {
    name: "ErrorBanner",
    category: "Status & Telemetry",
    href: "/components/error-banner",
    description: "Recoverable error alert with retry and dismiss triggers",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  {
    name: "RateLimitBanner",
    category: "Status & Telemetry",
    href: "/components/rate-limit-banner",
    description: "Quota exhaustion alert with live countdown timer and upgrade CTA",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    name: "TokenUsageBar",
    category: "Status & Telemetry",
    href: "/components/token-usage-bar",
    description: "Context window utilization meter with prompt/completion breakdown",
    icon: <Cpu className="h-4 w-4" />,
  },
  {
    name: "ConnectionStatus",
    category: "Status & Telemetry",
    href: "/components/connection-status",
    description: "Real-time SSE / WebSocket connection status with ping latency",
    icon: <Activity className="h-4 w-4" />,
  },

  // 4. Actions & Safeguards
  {
    name: "ApprovalCard",
    category: "Actions & Safeguards",
    href: "/components/approval-card",
    description: "Human-in-the-loop confirmation for agent mutations and tools",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    name: "PermissionPrompt",
    category: "Actions & Safeguards",
    href: "/components/permission-prompt",
    description: "Permission dialog offering allow-once vs always-allow choices",
    icon: <KeyRound className="h-4 w-4" />,
  },
  {
    name: "DiffView",
    category: "Actions & Safeguards",
    href: "/components/diff-view",
    description: "Split and unified before/after diff viewer for file modifications",
    icon: <FileCode2 className="h-4 w-4" />,
  },
  {
    name: "ConfirmDialog",
    category: "Actions & Safeguards",
    href: "/components/confirm-dialog",
    description: "Accessible confirmation modal for destructive agent actions",
    icon: <AlertTriangle className="h-4 w-4" />,
  },

  // 5. Artifacts & Canvas
  {
    name: "ArtifactPanel",
    category: "Artifacts & Canvas",
    href: "/components/artifact-panel",
    description: "Sidecar canvas panel for generated documents, code files, and diagrams",
    icon: <Layers className="h-4 w-4" />,
  },
  {
    name: "TabsPanel",
    category: "Artifacts & Canvas",
    href: "/components/tabs-panel",
    description: "Multi-file tab switcher with active indicators and close buttons",
    icon: <Layers className="h-4 w-4" />,
  },

  // 6. Feedback & Evaluation
  {
    name: "FeedbackButtons",
    category: "Feedback & Evaluation",
    href: "/components/feedback-buttons",
    description: "Thumbs up/down rating buttons with optional reason popover",
    icon: <ThumbsUp className="h-4 w-4" />,
  },
  {
    name: "RatingStars",
    category: "Feedback & Evaluation",
    href: "/components/rating-stars",
    description: "1-to-5 star interactive rating component for response evaluation",
    icon: <Star className="h-4 w-4" />,
  },

  // 7. Settings & Config
  {
    name: "APIKeyInput",
    category: "Settings & Config",
    href: "/components/api-key-input",
    description: "Masked secret key input with visibility toggle and validation check",
    icon: <KeyRound className="h-4 w-4" />,
  },
  {
    name: "TemperatureSlider",
    category: "Settings & Config",
    href: "/components/temperature-slider",
    description: "LLM hyperparameter slider for temperature and creativity presets",
    icon: <Flame className="h-4 w-4" />,
  },
  {
    name: "SystemPromptEditor",
    category: "Settings & Config",
    href: "/components/system-prompt-editor",
    description: "Dedicated system prompt editor with token counter and variable pills",
    icon: <Terminal className="h-4 w-4" />,
  },

  // 8. Media & Multimodal
  {
    name: "ImageUploadPreview",
    category: "Media & Multimodal",
    href: "/components/image-upload-preview",
    description: "Multimodal image upload gallery with zoom modal and progress bars",
    icon: <ImageIcon className="h-4 w-4" />,
  },
  {
    name: "AudioPlayer",
    category: "Media & Multimodal",
    href: "/components/audio-player",
    description: "Audio voice response player with animated waveform bars and speed controls",
    icon: <Volume2 className="h-4 w-4" />,
  },

  // 9. Foundations
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
  {
    name: "Tooltip",
    category: "Foundations",
    href: "/components/tooltip",
    description: "App-themed floating tooltip with micro-arrow and backdrop blur",
    icon: <MousePointerClick className="h-4 w-4" />,
  },
  {
    name: "Skeleton",
    category: "Foundations",
    href: "/components/skeleton",
    description: "Shimmer loading placeholder shapes for chat bubbles and cards",
    icon: <Layers className="h-4 w-4" />,
  },
  {
    name: "EmptyState",
    category: "Foundations",
    href: "/components/empty-state",
    description: "Empty canvas hero placeholder with illustration and action CTA",
    icon: <Bot className="h-4 w-4" />,
  },
  {
    name: "Toast",
    category: "Foundations",
    href: "/components/toast",
    description: "Transient floating notification alerts with countdown progress",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
];

interface DocHeaderProps {
  breadcrumbSection?: string;
  breadcrumbPage?: string;
}

export function DocHeader({
  breadcrumbSection = "Components",
  breadcrumbPage = "PromptBox",
}: DocHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  // Anchored Search Popover State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = SEARCH_ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Global ⌘K / Ctrl+K shortcut to focus header search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  // Click outside listener to close anchored dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation inside search dropdown (↑, ↓, Enter)
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
    } else if (e.key === "Enter" && filteredItems.length > 0) {
      e.preventDefault();
      const target = filteredItems[selectedIndex] || filteredItems[0];
      if (target) {
        router.push(target.href);
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    }
  };

  const handleSelectItem = (href: string) => {
    router.push(href);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="shrink-0 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-md dark:border-gray-800 dark:bg-[#0B0F19]/95 transition-colors z-50 select-none">
      {/* 1. Left Section: Logo container aligned to sidebar width (w-60 with right border) */}
      <div className="flex h-full w-60 shrink-0 items-center justify-between border-r border-gray-200 px-6 dark:border-gray-800">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 via-purple-600 to-indigo-500 shadow-sm transition-transform group-hover:scale-105 p-1 text-white">
            <AiKitLogo className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
            AI Kit
          </span>
        </Link>
      </div>

      {/* 2. Middle Section: Clean Breadcrumb Navigation aligned with content below */}
      <div className="flex flex-1 items-center px-6 md:px-8 min-w-0">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 truncate">
          <Link
            href="/introduction"
            className="hover:text-gray-900 dark:hover:text-white transition-colors shrink-0 font-medium"
          >
            Docs
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-600 shrink-0" />
          {breadcrumbSection && (
            <>
              <span className="text-gray-600 dark:text-gray-400 shrink-0 font-medium">{breadcrumbSection}</span>
              <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-600 shrink-0" />
            </>
          )}
          <span className="font-semibold text-gray-900 dark:text-white truncate">{breadcrumbPage}</span>
        </nav>
      </div>

      {/* 3. Right Section: Anchored Search Popover + Theme Toggle + GitHub link */}
      <div className="flex items-center gap-3 px-6 shrink-0">
        {/* Anchored Search Container */}
        <div ref={searchContainerRef} className="relative">
          <div
            className={`flex items-center gap-2 rounded-xl border transition-all ${
              isSearchOpen
                ? "w-64 sm:w-80 border-brand-600 ring-2 ring-brand-500/20 bg-white dark:bg-gray-900"
                : "w-44 sm:w-56 border-gray-200 bg-gray-50/80 hover:border-gray-300 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900/60 dark:hover:border-gray-700"
            } px-3 py-1.5 shadow-xs`}
          >
            <Search className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIndex(0);
                if (!isSearchOpen) setIsSearchOpen(true);
              }}
              onKeyDown={handleSearchKeyDown}
              className="w-full bg-transparent text-xs text-gray-900 placeholder-gray-400 outline-none dark:text-white"
            />

            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  inputRef.current?.focus();
                }}
                className="rounded p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-3 w-3" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-block rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 shrink-0">
                ⌘K
              </kbd>
            )}
          </div>

          {/* Anchored Search Dropdown Menu right beneath search input */}
          {isSearchOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 md:w-[440px] rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-[#111827] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              <div className="max-h-80 overflow-y-auto p-2">
                {filteredItems.length === 0 ? (
                  <div className="py-8 text-center text-xs text-gray-500">
                    No components found matching &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredItems.map((item, index) => {
                      const isSelected = index === selectedIndex;
                      return (
                        <div
                          key={item.name}
                          onClick={() => handleSelectItem(item.href)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-purple-50 text-brand-900 dark:bg-purple-950/60 dark:text-purple-200"
                              : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/60"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <div
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                                isSelected
                                  ? "bg-brand-600 text-white shadow-xs"
                                  : "bg-purple-100 text-brand-600 dark:bg-purple-950 dark:text-purple-400"
                              }`}
                            >
                              {item.icon}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-white">
                                <span className="truncate">{item.name}</span>
                                <span className="rounded bg-gray-100 px-1.5 py-0.2 text-[9px] font-semibold text-gray-500 dark:bg-gray-800 dark:text-gray-400 shrink-0">
                                  {item.category}
                                </span>
                              </div>
                              <p className="truncate text-[11px] text-gray-400 font-normal">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Dropdown Footer with Key Hints */}
              <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/80 px-3 py-2 text-[10px] text-gray-500 dark:border-gray-800 dark:bg-gray-900/50">
                <span className="flex items-center gap-1">
                  <span>Navigate:</span>
                  <kbd className="rounded border bg-white px-1 py-0.2 dark:border-gray-700 dark:bg-gray-800">↑</kbd>
                  <kbd className="rounded border bg-white px-1 py-0.2 dark:border-gray-700 dark:bg-gray-800">↓</kbd>
                </span>
                <span>Select: <kbd className="rounded border bg-white px-1 py-0.2 dark:border-gray-700 dark:bg-gray-800">↵</kbd></span>
                <span>Close: <kbd className="rounded border bg-white px-1 py-0.2 dark:border-gray-700 dark:bg-gray-800">esc</kbd></span>
              </div>
            </div>
          )}
        </div>

        {/* Dark/Light mode toggle button */}
        <Tooltip
          content={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          position="bottom"
        >
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </Tooltip>

        {/* GitHub Star Count Button */}
        <Tooltip content="Star on GitHub (1,863 stars)" position="bottom">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-xs hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
          >
            <GithubIcon className="h-3.5 w-3.5" />
          </a>
        </Tooltip>
      </div>
    </header>
  );
}

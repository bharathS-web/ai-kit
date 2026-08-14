"use client";

import React, { useLayoutEffect, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  name: string;
  href: string;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavSection[] = [
  {
    title: "Get Started",
    items: [
      { name: "Introduction", href: "/introduction" },
      { name: "Installation", href: "/installation" },
      { name: "Changelog", href: "/changelog", badge: "v1.2" },
    ],
  },
  {
    title: "Conversation",
    items: [
      { name: "MessageBubble", href: "/components/message-bubble" },
      { name: "MessageList", href: "/components/message-list" },
      { name: "StreamingText", href: "/components/streaming-text" },
      { name: "CodeBlock", href: "/components/code-block" },
      { name: "Citation", href: "/components/citation" },
      { name: "ConversationHistory", href: "/components/conversation-history" },
    ],
  },
  {
    title: "Input & Controls",
    items: [
      { name: "PromptBox", href: "/components/prompt-box" },
      { name: "ModelSelector", href: "/components/model-selector" },
      { name: "FileAttachment", href: "/components/file-attachment" },
      { name: "SuggestedPrompts", href: "/components/suggested-prompts" },
      { name: "VoiceInputButton", href: "/components/voice-input-button" },
      { name: "SlashCommandMenu", href: "/components/slash-command-menu" },
    ],
  },
  {
    title: "Status & Telemetry",
    items: [
      { name: "Thinking", href: "/components/thinking" },
      { name: "ToolCallCard", href: "/components/tool-call-card" },
      { name: "ErrorBanner", href: "/components/error-banner" },
      { name: "RateLimitBanner", href: "/components/rate-limit-banner" },
      { name: "TokenUsageBar", href: "/components/token-usage-bar" },
      { name: "ConnectionStatus", href: "/components/connection-status" },
    ],
  },
  {
    title: "Actions & Safeguards",
    items: [
      { name: "ApprovalCard", href: "/components/approval-card" },
      { name: "PermissionPrompt", href: "/components/permission-prompt" },
      { name: "DiffView", href: "/components/diff-view" },
      { name: "ConfirmDialog", href: "/components/confirm-dialog" },
    ],
  },
  {
    title: "Artifacts & Canvas",
    items: [
      { name: "ArtifactPanel", href: "/components/artifact-panel" },
      { name: "TabsPanel", href: "/components/tabs-panel" },
    ],
  },
  {
    title: "Feedback & Evaluation",
    items: [
      { name: "FeedbackButtons", href: "/components/feedback-buttons" },
      { name: "RatingStars", href: "/components/rating-stars" },
    ],
  },
  {
    title: "Settings & Config",
    items: [
      { name: "APIKeyInput", href: "/components/api-key-input" },
      { name: "TemperatureSlider", href: "/components/temperature-slider" },
      { name: "SystemPromptEditor", href: "/components/system-prompt-editor" },
    ],
  },
  {
    title: "Media & Multimodal",
    items: [
      { name: "ImageUploadPreview", href: "/components/image-upload-preview" },
      { name: "AudioPlayer", href: "/components/audio-player" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { name: "Button", href: "/components/button" },
      { name: "Badge", href: "/components/badge" },
      { name: "Avatar", href: "/components/avatar" },
      { name: "Tooltip", href: "/components/tooltip" },
      { name: "Skeleton", href: "/components/skeleton" },
      { name: "EmptyState", href: "/components/empty-state" },
      { name: "Toast", href: "/components/toast" },
    ],
  },
];

export function DocSidebar({ currentActive = "PromptBox" }: { currentActive?: string }) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);

  // Restore scroll position on page change / mount
  useLayoutEffect(() => {
    try {
      const savedScroll = sessionStorage.getItem("ai_kit_sidebar_scroll");
      if (savedScroll && sidebarRef.current) {
        sidebarRef.current.scrollTop = Number(savedScroll);
      }

      // Also ensure active item is within view if offscreen
      const activeEl = sidebarRef.current?.querySelector<HTMLElement>('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    } catch {
      // sessionStorage unavailable
    }
  }, [pathname]);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    try {
      sessionStorage.setItem("ai_kit_sidebar_scroll", String(e.currentTarget.scrollTop));
    } catch {
      // ignore
    }
  };

  const handleLinkClick = () => {
    try {
      if (sidebarRef.current) {
        sessionStorage.setItem("ai_kit_sidebar_scroll", String(sidebarRef.current.scrollTop));
      }
    } catch {
      // ignore
    }
  };

  return (
    <aside
      ref={sidebarRef}
      id="doc-sidebar"
      onScroll={handleScroll}
      className="h-full w-60 shrink-0 overflow-y-auto border-r border-gray-200 bg-white px-3.5 py-6 dark:border-gray-800 dark:bg-[#0B0F19] transition-colors select-none"
    >
      <div className="space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            <div className="mb-2 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {group.title}
            </div>

            <nav className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  currentActive.toLowerCase() === item.name.toLowerCase();

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleLinkClick}
                    data-active={isActive ? "true" : "false"}
                    className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                      isActive
                        ? "bg-purple-50 font-semibold text-brand-600 dark:bg-purple-950/60 dark:text-purple-300"
                        : "font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="rounded-md px-1.5 py-0.2 text-[9px] font-bold bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}

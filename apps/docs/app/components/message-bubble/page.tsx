"use client";

import React from "react";
import { DocLayout } from "../DocLayout";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { MessageBubble } from "@ai-kit/react";
import { Sparkles, User } from "lucide-react";

const TOC: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "user-vs-assistant", title: "User vs. Assistant" },
  { id: "system-messages", title: "System messages" },
  { id: "props-reference", title: "Props reference" },
];

export default function MessageBubblePage() {
  return (
    <DocLayout
      breadcrumbSection="Conversation"
      breadcrumbPage="MessageBubble"
      currentActive="MessageBubble"
      tocItems={TOC}
    >
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          MessageBubble
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Clean chat message bubble supporting user, assistant, and system roles with avatar slots, timestamps, and copy actions.
        </p>
      </div>

      {/* Hero Preview */}
      <div className="mt-6">
        <ComponentPreview
          code={`<div className="space-y-4 w-full max-w-lg">
  <MessageBubble
    role="user"
    name="You"
    timestamp="2:15 PM"
    content="Can you explain how BigQuery partition pruning works?"
  />
  <MessageBubble
    role="assistant"
    name="Claude 3.7 Sonnet"
    timestamp="2:15 PM"
    content="Partition pruning eliminates scanning data in partitions that do not match the WHERE filter clauses."
  />
</div>`}
        >
          <div className="space-y-4 w-full max-w-lg">
            <MessageBubble
              role="user"
              name="You"
              timestamp="2:15 PM"
              content="Can you explain how BigQuery partition pruning works?"
            />
            <MessageBubble
              role="assistant"
              name="Claude 3.7 Sonnet"
              timestamp="2:15 PM"
              content="Partition pruning eliminates scanning data in partitions that do not match the WHERE filter clauses, significantly reducing cost and latency."
            />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Installation */}
      <InstallationSection
        componentName="MessageBubble"
        slug="message-bubble"
        files={[
          {
            filename: "components/MessageBubble.tsx",
            code: `"use client";

import React, { useState } from "react";
import { Avatar } from "./Avatar";

export interface MessageBubbleProps {
  role: "user" | "assistant" | "system";
  content: React.ReactNode;
  timestamp?: string;
  avatar?: React.ReactNode;
  name?: string;
  actions?: React.ReactNode;
  status?: "sending" | "sent" | "error";
  className?: string;
}

export const MessageBubble = ({
  role,
  content,
  timestamp,
  avatar,
  name,
  actions,
  status = "sent",
  className = "",
}: MessageBubbleProps) => {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";
  const isSystem = role === "system";

  const handleCopy = () => {
    if (typeof content === "string") {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isSystem) {
    return (
      <div className={\`flex justify-center py-2 text-xs text-gray-500 dark:text-gray-400 \${className}\`.trim()}>
        <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60">
          {content}
        </span>
      </div>
    );
  }

  return (
    <div
      className={\`group flex gap-3 max-w-2xl \${
        isUser ? "ml-auto flex-row-reverse" : "mr-auto flex-row"
      } \${className}\`.trim()}
    >
      {/* Avatar Slot */}
      <div className="shrink-0 pt-0.5">
        {avatar || (
          <Avatar
            bot={!isUser}
            name={name || (isUser ? "User" : "AI Assistant")}
            size="sm"
          />
        )}
      </div>

      {/* Bubble Container */}
      <div className={\`flex flex-col \${isUser ? "items-end" : "items-start"}\`}>
        {/* Name / Header */}
        {(name || timestamp) && (
          <div className="mb-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 px-1">
            {name && <span className="font-semibold text-gray-700 dark:text-gray-300">{name}</span>}
            {timestamp && <span className="text-[11px]">{timestamp}</span>}
          </div>
        )}

        {/* Content Box */}
        <div
          className={\`rounded-2xl px-4 py-2.5 text-sm leading-relaxed \${
            isUser
              ? "bg-violet-600 text-white rounded-tr-xs shadow-xs"
              : "bg-gray-100 text-gray-900 dark:bg-gray-800/90 dark:text-gray-100 rounded-tl-xs border border-gray-200/60 dark:border-gray-700/60 shadow-xs"
          } \${status === "error" ? "border-red-500 bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200" : ""}\`}
        >
          {content}
        </div>

        {/* Action Row / Footer */}
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity px-1">
          {typeof content === "string" && (
            <button
              onClick={handleCopy}
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              title="Copy message"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          )}
          {actions}
        </div>
      </div>
    </div>
  );
};`,
          },
        ]}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: User vs Assistant */}
      <section id="user-vs-assistant" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          User vs. Assistant
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          User messages align right with a primary brand accent; assistant messages align left with subtle surfaces and avatar slots.
        </p>
        <ComponentPreview
          code={`<MessageBubble
  role="assistant"
  name="Agent"
  timestamp="Just now"
  content="I've generated the schema and test data."
/>`}
        >
          <div className="w-full max-w-lg">
            <MessageBubble
              role="assistant"
              name="Agent"
              timestamp="Just now"
              content="I've generated the schema and test data."
            />
          </div>
        </ComponentPreview>
      </section>

      {/* SECTION: System messages */}
      <section id="system-messages" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          System messages
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Centered status pills for session milestones, day dividers, or model changes.
        </p>
        <ComponentPreview
          code={`<MessageBubble
  role="system"
  content="Conversation moved to Claude 3.7 Sonnet (Thinking)"
/>`}
        >
          <div className="w-full max-w-lg">
            <MessageBubble
              role="system"
              content="Conversation moved to Claude 3.7 Sonnet (Thinking)"
            />
          </div>
        </ComponentPreview>
      </section>

      {/* SECTION: Props */}
      <section id="props-reference" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Props reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-gray-200 bg-gray-50/70 font-semibold text-gray-900 dark:border-gray-800 dark:bg-gray-900/60 dark:text-white">
              <tr>
                <th className="px-4 py-3">Prop</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Default</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 font-mono">
              <tr>
                <td className="px-4 py-3 text-brand-600 font-bold">role</td>
                <td className="px-4 py-3 text-purple-600">&quot;user&quot; | &quot;assistant&quot; | &quot;system&quot;</td>
                <td className="px-4 py-3 text-gray-400">—</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Controls layout, avatar placement, and alignment</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-brand-600 font-bold">content</td>
                <td className="px-4 py-3 text-purple-600">ReactNode</td>
                <td className="px-4 py-3 text-gray-400">—</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Text or generative UI inside the message bubble</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-brand-600 font-bold">timestamp</td>
                <td className="px-4 py-3 text-purple-600">string</td>
                <td className="px-4 py-3 text-gray-400">—</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Optional time string shown in the bubble header</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

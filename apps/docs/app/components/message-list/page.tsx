"use client";

import React, { useState } from "react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { MessageList, MessageBubble, PromptBox } from "@ai-kit/react";
import { Bot } from "lucide-react";

const TOC: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "empty-state", title: "Empty state" },
  { id: "props-reference", title: "Props reference" },
];

export default function MessageListPage() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string; time: string }>>([
    { role: "user", content: "How do I add streaming to my chat UI?", time: "10:30 AM" },
    { role: "assistant", content: "Use the StreamingText component or stream chunks into MessageBubble.", time: "10:30 AM" },
  ]);

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text, time: "Just now" },
      { role: "assistant", content: `Echo: "${text}" with agent reasoning.`, time: "Just now" },
    ]);
  };

  return (
    <DocLayout
      breadcrumbSection="Conversation"
      breadcrumbPage="MessageList"
      currentActive="MessageList"
      tocItems={TOC}
    >
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          MessageList
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Scrollable chat stream container with automatic scroll-to-bottom on new messages and customizable empty state placeholders.
        </p>
      </div>

      <div className="mt-6">
        <ComponentPreview
          code={`<div className="flex flex-col h-[380px] w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
  <MessageList>
    {messages.map((msg, i) => (
      <MessageBubble key={i} role={msg.role} content={msg.content} timestamp={msg.time} />
    ))}
  </MessageList>
  <div className="p-3 border-t border-gray-100 dark:border-gray-800">
    <PromptBox onSubmit={handleSend} placeholder="Type a message..." />
  </div>
</div>`}
        >
          <div className="flex flex-col h-[380px] w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-xs">
            <MessageList>
              {messages.map((msg, i) => (
                <MessageBubble key={i} role={msg.role} content={msg.content} timestamp={msg.time} />
              ))}
            </MessageList>
            <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/40">
              <PromptBox onSubmit={handleSend} placeholder="Send a message (auto-scrolls list)..." />
            </div>
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Installation */}
      <InstallationSection
        componentName="MessageList"
        slug="message-list"
        files={[
          {
            filename: "components/MessageList.tsx",
            code: `"use client";

import React, { useEffect, useRef } from "react";

export interface MessageListProps {
  children: React.ReactNode;
  autoScroll?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
}

export const MessageList = ({
  children,
  autoScroll = true,
  emptyState,
  className = "",
}: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [children, autoScroll]);

  const isEmpty = React.Children.count(children) === 0;

  return (
    <div
      ref={containerRef}
      className={\`flex flex-col flex-1 overflow-y-auto p-4 space-y-4 \${className}\`.trim()}
    >
      {isEmpty && emptyState ? (
        <div className="flex flex-1 items-center justify-center py-12">
          {emptyState}
        </div>
      ) : (
        <>
          {children}
          <div ref={bottomRef} className="h-px shrink-0" />
        </>
      )}
    </div>
  );
};`,
          },
        ]}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Empty State */}
      <section id="empty-state" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Empty state
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Shows custom placeholder graphics and prompt suggestion chips when no messages exist yet.
        </p>
        <ComponentPreview
          code={`<MessageList
  emptyState={
    <div className="text-center py-8 text-gray-400">
      <Bot className="h-8 w-8 mx-auto mb-2 text-violet-500" />
      <p className="text-xs">No messages yet. Send a prompt to start!</p>
    </div>
  }
>
  {/* Empty array */}
</MessageList>`}
        >
          <div className="h-[200px] w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden flex flex-col justify-center">
            <MessageList
              emptyState={
                <div className="text-center py-8 text-gray-400">
                  <Bot className="h-8 w-8 mx-auto mb-2 text-violet-500" />
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">No conversation yet</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Send a prompt below to get started</p>
                </div>
              }
            >
              {[]}
            </MessageList>
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
                <td className="px-4 py-3 text-brand-600 font-bold">autoScroll</td>
                <td className="px-4 py-3 text-purple-600">boolean</td>
                <td className="px-4 py-3 text-gray-400">true</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Smoothly scrolls to the latest message as new content arrives</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-brand-600 font-bold">emptyState</td>
                <td className="px-4 py-3 text-purple-600">ReactNode</td>
                <td className="px-4 py-3 text-gray-400">—</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Custom view rendered when children count is 0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

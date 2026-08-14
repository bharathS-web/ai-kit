"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { ConversationHistory, ConversationThread } from "@ai-kit/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "date-grouping", title: "Date categorization & search" },
  { id: "props-reference", title: "Props reference" },
];

export default function ConversationHistoryPage() {
  const [activeId, setActiveId] = useState("t1");
  const [threads, setThreads] = useState<ConversationThread[]>([
    {
      id: "t1",
      title: "Fix PostgreSQL Connection Pooling Pool",
      category: "Today",
      isPinned: true,
      messageCount: 14,
    },
    {
      id: "t2",
      title: "Design Generative AI UI Kit Architecture",
      category: "Today",
      messageCount: 8,
    },
    {
      id: "t3",
      title: "Refactor Next.js App Router Layout",
      category: "Yesterday",
      messageCount: 22,
    },
    {
      id: "t4",
      title: "AlloyDB Omni Columnar Optimization",
      category: "Previous 7 Days",
      messageCount: 5,
    },
  ]);

  const handleDelete = (id: string) => {
    setThreads(threads.filter((t) => t.id !== id));
  };

  const handlePin = (id: string) => {
    setThreads(
      threads.map((t) => (t.id === id ? { ...t, isPinned: !t.isPinned } : t))
    );
  };

  return (
    <DocLayout
      breadcrumbSection="Conversation"
      breadcrumbPage="ConversationHistory"
      currentActive="ConversationHistory"
      tocItems={TOC_ITEMS}
    >
      {/* Header Title Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            ConversationHistory
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Sidebar conversation thread manager with categorized date headers, search filtering, pin/delete actions, and new chat shortcuts.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/citation"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
            title="Previous: Citation"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/prompt-box"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
            title="Next: PromptBox"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="ConversationHistory preview"
          code={`<ConversationHistory
  threads={threads}
  activeId={activeId}
  onSelect={(id) => setActiveId(id)}
  onDelete={(id) => handleDelete(id)}
  onPin={(id) => handlePin(id)}
  onNewChat={() => handleNewChat()}
/>`}
        >
          <div className="w-full max-w-sm h-80 py-2">
            <ConversationHistory
              threads={threads}
              activeId={activeId}
              onSelect={(id) => setActiveId(id)}
              onDelete={handleDelete}
              onPin={handlePin}
              onNewChat={() => {
                const newId = `t-${Date.now()}`;
                setThreads([
                  {
                    id: newId,
                    title: `New conversation ${threads.length + 1}`,
                    category: "Today",
                    messageCount: 1,
                  },
                  ...threads,
                ]);
                setActiveId(newId);
              }}
            />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="ConversationHistory"
        slug="conversation-history"
        codeSnippet={`import { ConversationHistory } from "@ai-kit/react";

<ConversationHistory
  threads={[
    { id: "1", title: "Build Chat App", category: "Today", isPinned: true },
    { id: "2", title: "Refactor Database", category: "Yesterday" },
  ]}
  activeId="1"
  onSelect={(id) => console.log("Selected thread:", id)}
  onNewChat={() => console.log("Start new chat")}
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Try clicking on threads to switch the active conversation, pinning threads to top, or creating new chat sessions.
        </p>
        <ComponentPreview
          code={`<ConversationHistory
  threads={threads}
  activeId={activeId}
  onSelect={(id) => setActiveId(id)}
  onPin={(id) => togglePin(id)}
  onDelete={(id) => deleteThread(id)}
/>`}
        >
          <div className="w-full max-w-sm h-72 py-2">
            <ConversationHistory
              threads={threads}
              activeId={activeId}
              onSelect={(id) => setActiveId(id)}
              onDelete={handleDelete}
              onPin={handlePin}
              onNewChat={() => alert("New Chat Created")}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Date Grouping */}
      <section id="date-grouping" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Date categorization & search
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Threads are automatically categorized under headers like &quot;Today&quot;, &quot;Yesterday&quot;, and &quot;Previous 7 Days&quot; with a real-time instant search filter.
        </p>
        <ComponentPreview
          code={`<ConversationHistory
  threads={[
    { id: "1", title: "PostgreSQL Query Optimization", category: "Today" },
    { id: "2", title: "Next.js 15 Migration", category: "Yesterday" },
    { id: "3", title: "AlloyDB Columnar Setup", category: "Previous 7 Days" },
  ]}
  activeId="1"
/>`}
        >
          <div className="w-full max-w-sm h-64 py-2">
            <ConversationHistory
              threads={[
                { id: "1", title: "PostgreSQL Query Optimization", category: "Today" },
                { id: "2", title: "Next.js 15 Migration", category: "Yesterday" },
                { id: "3", title: "AlloyDB Columnar Setup", category: "Previous 7 Days" },
              ]}
              activeId="1"
            />
          </div>
        </ComponentPreview>
      </section>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Props Reference */}
      <section id="props-reference" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Props Reference
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 font-mono">
              <tr>
                <th className="p-3">Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <td className="p-3 font-mono text-brand-600">threads</td>
                <td className="p-3 font-mono">ConversationThread[]</td>
                <td className="p-3 font-mono">[]</td>
                <td className="p-3">Array of thread objects containing id, title, category, and isPinned.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">activeId</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">ID of currently selected thread.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onSelect</td>
                <td className="p-3 font-mono">(id: string) =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Triggered when clicking a conversation item.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onDelete</td>
                <td className="p-3 font-mono">(id: string) =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Triggered when clicking the delete trash icon.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onPin</td>
                <td className="p-3 font-mono">(id: string) =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Triggered when clicking the pin toggle button.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onNewChat</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Triggered when clicking the + New Chat button.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Terminal, Sparkles, Database, Code2, Bot } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { SlashCommandMenu, SlashCommandItem } from "@ai-kit/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "categories-shortcuts", title: "Categories & shortcuts" },
  { id: "props-reference", title: "Props reference" },
];

export default function SlashCommandMenuPage() {
  const [query, setQuery] = useState("");
  const [selectedCommand, setSelectedCommand] = useState<string | null>(null);

  const sampleCommands: SlashCommandItem[] = [
    {
      id: "agent",
      name: "agent",
      description: "Spawn an autonomous background subagent worker",
      category: "Workflow",
      shortcut: "⌘A",
      icon: <Bot className="h-4 w-4" />,
    },
    {
      id: "sql",
      name: "sql",
      description: "Execute BigQuery / PostgreSQL SQL query",
      category: "Database",
      shortcut: "⌘S",
      icon: <Database className="h-4 w-4" />,
    },
    {
      id: "refactor",
      name: "refactor",
      description: "Refactor active file with TypeScript strict mode",
      category: "Code",
      shortcut: "⌘R",
      icon: <Code2 className="h-4 w-4" />,
    },
    {
      id: "explain",
      name: "explain",
      description: "Explain code architecture and data flow",
      category: "Docs",
      icon: <Sparkles className="h-4 w-4" />,
    },
  ];

  return (
    <DocLayout
      breadcrumbSection="Input & Controls"
      breadcrumbPage="SlashCommandMenu"
      currentActive="SlashCommandMenu"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            SlashCommandMenu
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Floating autocomplete menu triggered by &quot;/&quot; in prompt inputs with fuzzy command filtering and keyboard navigation.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/voice-input-button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/rate-limit-banner"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="SlashCommandMenu example"
          code={`<SlashCommandMenu
  commands={sampleCommands}
  query={query}
  onSelectCommand={(cmd) => handleSelect(cmd.name)}
/>`}
        >
          <div className="flex flex-col items-center justify-center py-4 space-y-4">
            <div className="w-full max-w-sm">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to filter commands (e.g. 'sql' or 'agent')..."
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 focus:border-brand-500 focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white mb-3"
              />

              <SlashCommandMenu
                commands={sampleCommands}
                query={query}
                onSelectCommand={(cmd) => setSelectedCommand(cmd.name)}
              />
            </div>

            {selectedCommand && (
              <div className="rounded-xl bg-purple-50 p-2.5 text-xs font-mono text-brand-700 dark:bg-purple-950/60 dark:text-purple-300">
                Triggered: /{selectedCommand}
              </div>
            )}
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="SlashCommandMenu"
        slug="slash-command-menu"
        codeSnippet={`import { SlashCommandMenu } from "@ai-kit/react";

<SlashCommandMenu
  commands={[
    { id: "agent", name: "agent", description: "Spawn subagent worker" }
  ]}
  onSelectCommand={(cmd) => executeCommand(cmd)}
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Use Arrow Up / Down keys to navigate items and press Enter to select a command.
        </p>
        <ComponentPreview
          code={`<SlashCommandMenu
  commands={sampleCommands}
  onSelectCommand={(cmd) => alert(\`Selected: /\${cmd.name}\`)}
/>`}
        >
          <div className="flex items-center justify-center py-4">
            <SlashCommandMenu
              commands={sampleCommands}
              onSelectCommand={(cmd) => alert(`Selected: /${cmd.name}`)}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Categories & Shortcuts */}
      <section id="categories-shortcuts" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Categories & shortcuts
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Group commands with category badges and display keyboard shortcut hints.
        </p>
        <ComponentPreview
          code={`<SlashCommandMenu
  commands={[
    { id: "1", name: "docs", description: "Search knowledge base", category: "Help", shortcut: "⌘D" },
    { id: "2", name: "reset", description: "Reset agent context", category: "Session", shortcut: "⌘K" },
  ]}
/>`}
        >
          <div className="flex items-center justify-center py-4">
            <SlashCommandMenu
              commands={[
                { id: "1", name: "docs", description: "Search knowledge base", category: "Help", shortcut: "⌘D" },
                { id: "2", name: "reset", description: "Reset agent context", category: "Session", shortcut: "⌘K" },
              ]}
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
                <td className="p-3 font-mono text-brand-600">commands</td>
                <td className="p-3 font-mono">SlashCommandItem[]</td>
                <td className="p-3 font-mono">[]</td>
                <td className="p-3">Array of commands with id, name, description, icon, shortcut.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">query</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">&quot;&quot;</td>
                <td className="p-3">Filter query string typed by user.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onSelectCommand</td>
                <td className="p-3 font-mono">(cmd: SlashCommandItem) =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Triggered on click or Enter key.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">isOpen</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">true</td>
                <td className="p-3">Controls visibility of the popup menu.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onClose</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Triggered on Escape key.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

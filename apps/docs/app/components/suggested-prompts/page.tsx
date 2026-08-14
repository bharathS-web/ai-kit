"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, Database, ShieldCheck, Code2 } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { SuggestedPrompts, SuggestedPromptItem } from "@inaicode/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "horizontal-chips", title: "Horizontal chips" },
  { id: "props-reference", title: "Props reference" },
];

export default function SuggestedPromptsPage() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const samplePrompts: SuggestedPromptItem[] = [
    {
      id: "p1",
      title: "Query Database Schema",
      description: "Inspect PostgreSQL tables, columns, and foreign keys.",
      icon: <Database className="h-4 w-4" />,
      tag: "SQL",
      promptText: "Show me all tables in the public schema with index sizes.",
    },
    {
      id: "p2",
      title: "Analyze Latency Spikes",
      description: "Run diagnostic query metrics on slow execution plans.",
      icon: <Sparkles className="h-4 w-4" />,
      tag: "Analytics",
      promptText: "Analyze query execution plans exceeding 500ms.",
    },
    {
      id: "p3",
      title: "Audit Security Policies",
      description: "Scan IAM roles and Row-Level Security rules.",
      icon: <ShieldCheck className="h-4 w-4" />,
      tag: "Security",
      promptText: "Audit all users with admin privileges on production cluster.",
    },
    {
      id: "p4",
      title: "Generate API Client",
      description: "Create typed TypeScript React Query hooks.",
      icon: <Code2 className="h-4 w-4" />,
      tag: "TypeScript",
      promptText: "Generate strict TypeScript client code for OpenAPI spec.",
    },
  ];

  return (
    <DocLayout
      breadcrumbSection="Input & Controls"
      breadcrumbPage="SuggestedPrompts"
      currentActive="SuggestedPrompts"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            SuggestedPrompts
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Clickable starter prompt cards and horizontal chips designed for zero-state onboarding and AI workflow starters.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/file-attachment"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/voice-input-button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="SuggestedPrompts preview"
          code={`<SuggestedPrompts
  prompts={samplePrompts}
  columns={2}
  onSelectPrompt={(text) => handleSelect(text)}
/>`}
        >
          <div className="w-full max-w-2xl py-4 space-y-4">
            <SuggestedPrompts
              prompts={samplePrompts}
              columns={2}
              onSelectPrompt={(text) => setSelectedPrompt(text)}
            />

            {selectedPrompt && (
              <div className="rounded-xl bg-purple-50 p-3 text-xs font-mono text-brand-700 dark:bg-purple-950/60 dark:text-purple-300">
                Selected: {selectedPrompt}
              </div>
            )}
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="SuggestedPrompts"
        slug="suggested-prompts"
        codeSnippet={`import { SuggestedPrompts } from "@inaicode/react";

<SuggestedPrompts
  prompts={[
    { id: "1", title: "Analyze metrics", description: "Query recent telemetry" },
    { id: "2", title: "Generate schema", description: "Write SQL migrations" }
  ]}
  onSelectPrompt={(val) => sendPrompt(val)}
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click any card to automatically populate your active prompt input with preset queries.
        </p>
        <ComponentPreview
          code={`<SuggestedPrompts
  prompts={samplePrompts.slice(0, 2)}
  columns={2}
  onSelectPrompt={(text) => alert(text)}
/>`}
        >
          <div className="w-full max-w-xl py-4">
            <SuggestedPrompts
              prompts={samplePrompts.slice(0, 2)}
              columns={2}
              onSelectPrompt={(text) => alert(`Selected prompt: ${text}`)}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Horizontal Chips */}
      <section id="horizontal-chips" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Horizontal chips
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Use the horizontal pill layout for compact suggestion carousels above chat boxes.
        </p>
        <ComponentPreview
          code={`<SuggestedPrompts
  layout="horizontal"
  prompts={samplePrompts}
  onSelectPrompt={(text) => alert(text)}
/>`}
        >
          <div className="w-full max-w-xl py-4">
            <SuggestedPrompts
              layout="horizontal"
              prompts={samplePrompts}
              onSelectPrompt={(text) => alert(`Selected: ${text}`)}
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
                <td className="p-3 font-mono text-brand-600">prompts</td>
                <td className="p-3 font-mono">SuggestedPromptItem[]</td>
                <td className="p-3 font-mono">[]</td>
                <td className="p-3">Array of prompt cards with id, title, description, and tag.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onSelectPrompt</td>
                <td className="p-3 font-mono">(text: string) =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Triggered when user clicks a prompt item.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">layout</td>
                <td className="p-3 font-mono">&quot;grid&quot; | &quot;horizontal&quot;</td>
                <td className="p-3 font-mono">&quot;grid&quot;</td>
                <td className="p-3">Display cards in a grid matrix or single row of chips.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">columns</td>
                <td className="p-3 font-mono">1 | 2 | 3</td>
                <td className="p-3 font-mono">2</td>
                <td className="p-3">Grid column count.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

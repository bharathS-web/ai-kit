"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Bot, Sparkles } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { EmptyState, Button } from "@inaicode/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "starter-pills", title: "Suggested starter prompts" },
  { id: "props-reference", title: "Props reference" },
];

export default function EmptyStatePage() {
  return (
    <DocLayout
      breadcrumbSection="Foundations"
      breadcrumbPage="EmptyState"
      currentActive="EmptyState"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            EmptyState
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Zero-state screen layout for initial conversation states, empty artifact panels, and missing search results.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/skeleton"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/toast"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="EmptyState example"
          code={`<EmptyState
  title="How can AI Kit help you build today?"
  description="Ask a question, query your cloud database, or inspect an infrastructure deployment plan."
  suggestions={[
    "Explain AlloyDB columnar cache",
    "Generate Next.js chat widget",
    "Audit IAM service accounts"
  ]}
  onSelectSuggestion={(s) => alert(s)}
/>`}
        >
          <div className="w-full max-w-xl py-4">
            <EmptyState
              title="How can AI Kit help you build today?"
              description="Ask a question, query your cloud database, or inspect an infrastructure deployment plan."
              suggestions={[
                "Explain AlloyDB columnar cache",
                "Generate Next.js chat widget",
                "Audit IAM service accounts",
              ]}
              onSelectSuggestion={(s) => alert(`Selected: ${s}`)}
            />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="EmptyState"
        slug="empty-state"
        codeSnippet={`import { EmptyState } from "@inaicode/react";

<EmptyState
  title="No conversation active"
  description="Start typing below to talk with the agent."
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Clean empty canvas hero for welcoming new users with action buttons.
        </p>
        <ComponentPreview
          code={`<EmptyState
  title="No artifacts generated yet"
  description="Ask the agent to create a schema, write code, or draft documentation."
  action={<Button>Create new file</Button>}
/>`}
        >
          <div className="w-full max-w-md py-4">
            <EmptyState
              title="No artifacts generated yet"
              description="Ask the agent to create a schema, write code, or draft documentation."
              action={
                <button className="rounded-xl bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-700">
                  Create new file
                </button>
              }
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Starter Pills */}
      <section id="starter-pills" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Suggested starter prompts
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Clickable starter chips that guide users to relevant capabilities.
        </p>
        <ComponentPreview
          code={`<EmptyState
  title="Start a new workflow"
  description="Select a template or type your request below."
  suggestions={["Design auth schema", "Refactor Tailwind classes"]}
/>`}
        >
          <div className="w-full max-w-md py-4">
            <EmptyState
              title="Start a new workflow"
              description="Select a template or type your request below."
              suggestions={["Design auth schema", "Refactor Tailwind classes"]}
              onSelectSuggestion={(s) => alert(`Selected: ${s}`)}
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
                <td className="p-3 font-mono text-brand-600">title</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Hero headline title.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">description</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Supporting descriptive text.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">icon</td>
                <td className="p-3 font-mono">ReactNode</td>
                <td className="p-3 font-mono">&lt;Bot /&gt;</td>
                <td className="p-3">Hero icon badge.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">suggestions</td>
                <td className="p-3 font-mono">string[]</td>
                <td className="p-3 font-mono">[]</td>
                <td className="p-3">Array of quick starter chip suggestions.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">action</td>
                <td className="p-3 font-mono">ReactNode</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Primary CTA button element.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

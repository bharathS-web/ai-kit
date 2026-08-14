"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  Copy,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Terminal,
} from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { GithubIcon } from "../Icons";
import { Thinking } from "@ai-kit/react";

const THINKING_TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "size-variants", title: "Size variants" },
  { id: "custom-labels", title: "Custom status labels" },
  { id: "streaming-simulation", title: "Live turn simulation" },
  { id: "props-reference", title: "Props reference" },
];

export default function ThinkingPage() {
  const [copyDropdownOpen, setCopyDropdownOpen] = useState(false);
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const [installTab, setInstallTab] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");
  const [simState, setSimState] = useState<"idle" | "planning" | "executing" | "done">("idle");

  const triggerCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAction(label);
    setTimeout(() => {
      setCopiedAction(null);
      setCopyDropdownOpen(false);
    }, 1500);
  };

  const installCommands = {
    pnpm: "pnpm add @ai-kit/react",
    npm: "npm i @ai-kit/react",
    yarn: "yarn add @ai-kit/react",
    bun: "bun add @ai-kit/react",
  };

  const runSimulation = () => {
    setSimState("planning");
    setTimeout(() => {
      setSimState("executing");
      setTimeout(() => {
        setSimState("done");
      }, 2000);
    }, 2000);
  };

  return (
    <DocLayout
      breadcrumbSection="Status & Feedback"
      breadcrumbPage="Thinking"
      currentActive="Thinking"
      tocItems={THINKING_TOC_ITEMS}
    >
      {/* Header Title Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Thinking
          </h1>
        </div>

        {/* Top Right Navigation pagination buttons */}
        <div className="flex items-center gap-1">
          <Link
            href="/components/prompt-box"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
            title="Previous: PromptBox"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/approval-card"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
            title="Next: ApprovalCard"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Subtitle description */}
      <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
        Animated bouncing-dot indicator shown while an AI model, agent, or workflow is reasoning, searching knowledge bases, or synthesizing a response.
      </p>

      {/* External links badges */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
        >
          <GithubIcon className="h-3.5 w-3.5" />
          <span>GitHub</span>
          <ExternalLink className="h-3 w-3 text-gray-400" />
        </a>

        <a
          href="https://tailwindcss.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
        >
          <svg className="h-3.5 w-3.5 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 6.5C8 6.5 5.5 8.5 4.5 12.5C6 11 7.5 10.5 9 11C10.05 11.35 10.8 12.11 11.62 12.95C12.96 14.31 14.54 15.91 19.5 15.91C23.5 15.91 26 13.91 27 9.91C25.5 11.41 24 11.91 22.5 11.41C21.45 11.06 20.7 10.3 19.88 9.46C18.54 8.1 16.96 6.5 12 6.5Z" />
          </svg>
          <span>Tailwind CSS</span>
          <ExternalLink className="h-3 w-3 text-gray-400" />
        </a>
      </div>

      {/* HERO PREVIEW CARD */}
      <div className="mt-8">
        <ComponentPreview
          title="Thinking indicator example"
          code={`<div className="flex items-center gap-8">
  <Thinking label="Thinking" />
  <Thinking label="Searching documentation..." />
  <Thinking label="Synthesizing answer" size="sm" />
</div>`}
        >
          <div className="flex flex-wrap items-center justify-center gap-8 py-4">
            <Thinking label="Thinking" />
            <Thinking label="Searching documentation..." />
            <Thinking label="Synthesizing answer" size="sm" />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Installation */}
      <InstallationSection
        componentName="Thinking"
        slug="thinking"
        files={[
          {
            filename: "components/Thinking.tsx",
            code: `"use client";

import React from "react";

export interface ThinkingProps {
  /** Text shown next to the animated indicator */
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

const sizeStyles = {
  sm: { dot: "h-1.5 w-1.5", text: "text-xs", gap: "gap-1" },
  md: { dot: "h-2 w-2", text: "text-sm", gap: "gap-1.5" },
};

export const Thinking = ({ label = "Thinking", size = "md", className = "" }: ThinkingProps) => {
  const s = sizeStyles[size];

  return (
    <div className={\`inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 \${className}\`.trim()}>
      {label && <span className={s.text}>{label}</span>}
      <span className={\`flex items-center \${s.gap}\`}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={\`rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce \${s.dot}\`}
            style={{ animationDelay: \`\${i * 0.15}s\`, animationDuration: "0.9s" }}
          />
        ))}
      </span>
    </div>
  );
};`,
          },
        ]}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Interactive example */}
      <section id="interactive-example" className="scroll-mt-6 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Clean animated bouncing dots with smooth CSS delays and zero external JS runtime overhead.
        </p>
        <ComponentPreview
          code={`<Thinking label="Agent is planning next step" />`}
        >
          <div className="p-4">
            <Thinking label="Agent is planning next step" />
          </div>
        </ComponentPreview>
      </section>

      {/* SECTION: Size variants */}
      <section id="size-variants" className="scroll-mt-6 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Size variants
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Choose between compact <code>sm</code> and standard <code>md</code> indicator sizes.
        </p>
        <ComponentPreview
          code={`<div className="flex items-center gap-8">
  <Thinking size="sm" label="Compact (sm)" />
  <Thinking size="md" label="Standard (md)" />
</div>`}
        >
          <div className="flex flex-wrap items-center justify-center gap-8">
            <Thinking size="sm" label="Compact (sm)" />
            <Thinking size="md" label="Standard (md)" />
          </div>
        </ComponentPreview>
      </section>

      {/* SECTION: Custom status labels */}
      <section id="custom-labels" className="scroll-mt-6 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Custom status labels
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Update the label dynamically to communicate specific subagent phases to the user.
        </p>
        <ComponentPreview
          code={`<div className="space-y-3">
  <Thinking label="Connecting to database cluster..." />
  <Thinking label="Querying vector embeddings index..." />
  <Thinking label="Formatting response..." />
</div>`}
        >
          <div className="space-y-3">
            <div><Thinking label="Connecting to database cluster..." /></div>
            <div><Thinking label="Querying vector embeddings index..." /></div>
            <div><Thinking label="Formatting response..." /></div>
          </div>
        </ComponentPreview>
      </section>

      {/* SECTION: Streaming simulation */}
      <section id="streaming-simulation" className="scroll-mt-6 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Live turn simulation
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click the trigger to simulate an agent phase sequence with live status transitions.
        </p>
        <ComponentPreview
          code={`{simState === "planning" && <Thinking label="Planning actions..." />}
{simState === "executing" && <Thinking label="Executing tool calls..." />}
{simState === "done" && <div>✓ Task complete!</div>}`}
        >
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={runSimulation}
              disabled={simState === "planning" || simState === "executing"}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-50 transition-colors"
            >
              {simState === "planning" || simState === "executing" ? "Running simulation..." : "Start agent simulation"}
            </button>

            <div className="min-h-[40px] flex items-center justify-center">
              {simState === "planning" && <Thinking label="Agent planning workflow..." />}
              {simState === "executing" && <Thinking label="Executing tools..." />}
              {simState === "done" && (
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-in fade-in">
                  ✓ Response synthesized successfully!
                </div>
              )}
              {simState === "idle" && (
                <div className="text-xs text-gray-400">Idle - Click button to test</div>
              )}
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* SECTION: Props reference */}
      <section id="props-reference" className="scroll-mt-6 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Props reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase text-gray-500 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Prop</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Default</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs dark:divide-gray-800">
              <tr>
                <td className="px-4 py-3 font-mono font-medium text-brand-600 dark:text-brand-400">label</td>
                <td className="px-4 py-3 font-mono text-gray-500">string</td>
                <td className="px-4 py-3 font-mono text-gray-400">&ldquo;Thinking&rdquo;</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Text string shown beside the animated indicator.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono font-medium text-brand-600 dark:text-brand-400">size</td>
                <td className="px-4 py-3 font-mono text-gray-500">&ldquo;sm&rdquo; | &ldquo;md&rdquo;</td>
                <td className="px-4 py-3 font-mono text-gray-400">&ldquo;md&rdquo;</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Visual scale of the indicator text and dots.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono font-medium text-brand-600 dark:text-brand-400">className</td>
                <td className="px-4 py-3 font-mono text-gray-500">string</td>
                <td className="px-4 py-3 font-mono text-gray-400">undefined</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Additional Tailwind or CSS class overrides.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer Navigation */}
      <div className="mt-16 flex items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-800">
        <Link
          href="/components/prompt-box"
          className="group flex flex-col gap-1 text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
        >
          <span className="text-xs text-gray-400">Previous</span>
          <span className="flex items-center gap-1 text-base font-semibold text-gray-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
            ← PromptBox
          </span>
        </Link>

        <Link
          href="/components/approval-card"
          className="group flex flex-col items-end gap-1 text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
        >
          <span className="text-xs text-gray-400">Next</span>
          <span className="flex items-center gap-1 text-base font-semibold text-gray-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
            ApprovalCard →
          </span>
        </Link>
      </div>
    </DocLayout>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { TokenUsageBar } from "@ai-kit/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "near-limit", title: "Near limit warning" },
  { id: "props-reference", title: "Props reference" },
];

export default function TokenUsageBarPage() {
  return (
    <DocLayout
      breadcrumbSection="Status & Telemetry"
      breadcrumbPage="TokenUsageBar"
      currentActive="TokenUsageBar"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            TokenUsageBar
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Context window utilization meter displaying prompt vs completion token breakdowns, threshold color alerts, and estimated costs.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/rate-limit-banner"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/connection-status"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="TokenUsageBar example"
          code={`<TokenUsageBar
  modelName="Claude 3.7 Sonnet"
  promptTokens={42150}
  completionTokens={12400}
  maxTokens={128000}
  cost="0.18"
/>`}
        >
          <div className="w-full max-w-xl py-4">
            <TokenUsageBar
              modelName="Claude 3.7 Sonnet"
              promptTokens={42150}
              completionTokens={12400}
              maxTokens={128000}
              cost="0.18"
            />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="TokenUsageBar"
        slug="token-usage-bar"
        codeSnippet={`import { TokenUsageBar } from "@ai-kit/react";

<TokenUsageBar
  promptTokens={12000}
  completionTokens={4500}
  maxTokens={128000}
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Visualize context token consumption with distinct prompt and generation color bars.
        </p>
        <ComponentPreview
          code={`<TokenUsageBar
  modelName="Gemini 2.5 Pro"
  promptTokens={85000}
  completionTokens={25000}
  maxTokens={1000000}
  cost="0.08"
/>`}
        >
          <div className="w-full max-w-xl py-4">
            <TokenUsageBar
              modelName="Gemini 2.5 Pro"
              promptTokens={85000}
              completionTokens={25000}
              maxTokens={1000000}
              cost="0.08"
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Near Limit */}
      <section id="near-limit" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Near limit warning
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Threshold warnings automatically transition to amber (above 85%) and red (above 95%).
        </p>
        <ComponentPreview
          code={`<TokenUsageBar
  modelName="GPT-4o (32k context)"
  promptTokens={24500}
  completionTokens={3800}
  maxTokens={32000}
  cost="0.42"
/>`}
        >
          <div className="w-full max-w-xl py-4">
            <TokenUsageBar
              modelName="GPT-4o (32k context)"
              promptTokens={24500}
              completionTokens={3800}
              maxTokens={32000}
              cost="0.42"
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
                <td className="p-3 font-mono text-brand-600">promptTokens</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Input prompt token count.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">completionTokens</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">0</td>
                <td className="p-3">Generated output token count.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">maxTokens</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Total context window limit.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">cost</td>
                <td className="p-3 font-mono">string | number</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Estimated dollar cost for this LLM turn.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">modelName</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Model name badge label.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">showBreakdown</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">true</td>
                <td className="p-3">Displays legend breakdown with prompt vs completion tokens.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

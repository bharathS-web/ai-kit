"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { RateLimitBanner } from "@inaicode/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "error-variant", title: "Error variant" },
  { id: "props-reference", title: "Props reference" },
];

export default function RateLimitBannerPage() {
  return (
    <DocLayout
      breadcrumbSection="Status & Telemetry"
      breadcrumbPage="RateLimitBanner"
      currentActive="RateLimitBanner"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            RateLimitBanner
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Quota exhaustion and rate limit banner with automated countdown reset timers, retry triggers, and tier upgrade actions.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/slash-command-menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/token-usage-bar"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="RateLimitBanner example"
          code={`<RateLimitBanner
  limitType="tokens"
  retryAfterSeconds={45}
  limit="60k tokens / min"
  onRetry={() => alert("Retrying request...")}
  onUpgrade={() => alert("Redirecting to pricing...")}
/>`}
        >
          <div className="w-full max-w-2xl py-4 space-y-4">
            <RateLimitBanner
              limitType="tokens"
              retryAfterSeconds={45}
              limit="60k tokens / min"
              onRetry={() => alert("Retrying request...")}
              onUpgrade={() => alert("Redirecting to pricing...")}
            />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="RateLimitBanner"
        slug="rate-limit-banner"
        codeSnippet={`import { RateLimitBanner } from "@inaicode/react";

<RateLimitBanner
  limitType="tokens"
  retryAfterSeconds={60}
  onRetry={() => retryLLMCall()}
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          The reset timer automatically counts down every second until zero, enabling the retry action button.
        </p>
        <ComponentPreview
          code={`<RateLimitBanner
  limitType="rate_limit"
  retryAfterSeconds={20}
  onRetry={() => alert("Retrying...")}
/>`}
        >
          <div className="w-full max-w-2xl py-4">
            <RateLimitBanner
              limitType="rate_limit"
              retryAfterSeconds={20}
              onRetry={() => alert("Retrying request now...")}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Error Variant */}
      <section id="error-variant" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Error variant
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Use the critical error variant when a hard quota block (e.g. 429 HTTP error) halts model execution.
        </p>
        <ComponentPreview
          code={`<RateLimitBanner
  variant="error"
  limitType="requests"
  retryAfterSeconds={12}
  onRetry={() => alert("Retrying...")}
/>`}
        >
          <div className="w-full max-w-2xl py-4">
            <RateLimitBanner
              variant="error"
              limitType="requests"
              retryAfterSeconds={12}
              onRetry={() => alert("Retrying...")}
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
                <td className="p-3 font-mono text-brand-600">limitType</td>
                <td className="p-3 font-mono">&quot;tokens&quot; | &quot;requests&quot; | &quot;rate_limit&quot;</td>
                <td className="p-3 font-mono">&quot;rate_limit&quot;</td>
                <td className="p-3">Type of quota limit exceeded.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">retryAfterSeconds</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">60</td>
                <td className="p-3">Initial countdown duration in seconds.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">limit</td>
                <td className="p-3 font-mono">string | number</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Badge showing maximum quota limit.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onRetry</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Callback when clicking Retry Request.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onUpgrade</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Callback when clicking Upgrade Tier.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">variant</td>
                <td className="p-3 font-mono">&quot;warning&quot; | &quot;error&quot;</td>
                <td className="p-3 font-mono">&quot;warning&quot;</td>
                <td className="p-3">Visual severity level.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

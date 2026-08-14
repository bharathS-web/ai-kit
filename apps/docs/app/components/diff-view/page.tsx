"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { DiffView } from "@ai-kit/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "split-view", title: "Side-by-side split view" },
  { id: "props-reference", title: "Props reference" },
];

export default function DiffViewPage() {
  const originalCode = `export function calculateDiscount(price: number, plan: string) {
  if (plan === "pro") {
    return price * 0.10;
  }
  return 0;
}`;

  const modifiedCode = `export function calculateDiscount(price: number, plan: string, promoCode?: string) {
  if (promoCode === "AIKIT2026") {
    return price * 0.25;
  }
  if (plan === "enterprise") {
    return price * 0.20;
  }
  if (plan === "pro") {
    return price * 0.10;
  }
  return 0;
}`;

  return (
    <DocLayout
      breadcrumbSection="Actions & Safeguards"
      breadcrumbPage="DiffView"
      currentActive="DiffView"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            DiffView
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Side-by-side split and unified line-by-line diff viewer for autonomous agent code edits, file mutations, and approval reviews.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/connection-status"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/confirm-dialog"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="DiffView example"
          code={`<DiffView
  fileName="pricing_engine.ts"
  oldCode={\`${originalCode}\`}
  newCode={\`${modifiedCode}\`}
/>`}
        >
          <div className="w-full max-w-2xl py-4">
            <DiffView
              fileName="pricing_engine.ts"
              oldCode={originalCode}
              newCode={modifiedCode}
            />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="DiffView"
        slug="diff-view"
        codeSnippet={`import { DiffView } from "@ai-kit/react";

<DiffView
  fileName="auth.ts"
  oldCode={oldContent}
  newCode={newContent}
  viewMode="unified"
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Toggle between unified single-column view and split 2-column view using the icon switchers in the header.
        </p>
        <ComponentPreview
          code={`<DiffView
  fileName="auth.ts"
  oldCode="const session = null;"
  newCode="const session = await auth.getSession();"
/>`}
        >
          <div className="w-full max-w-2xl py-4">
            <DiffView
              fileName="auth.ts"
              oldCode="const session = null;"
              newCode="const session = await auth.getSession();"
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Split View */}
      <section id="split-view" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Side-by-side split view
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Render original code and modified code side-by-side with synchronized line numbering.
        </p>
        <ComponentPreview
          code={`<DiffView
  viewMode="split"
  fileName="pricing.ts"
  oldCode={\`${originalCode}\`}
  newCode={\`${modifiedCode}\`}
/>`}
        >
          <div className="w-full max-w-2xl py-4">
            <DiffView
              viewMode="split"
              fileName="pricing.ts"
              oldCode={originalCode}
              newCode={modifiedCode}
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
                <td className="p-3 font-mono text-brand-600">oldCode</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Original source code text before modification.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">newCode</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Modified code generated by the agent.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">fileName</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">File name displayed in the diff header bar.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">viewMode</td>
                <td className="p-3 font-mono">&quot;split&quot; | &quot;unified&quot;</td>
                <td className="p-3 font-mono">&quot;unified&quot;</td>
                <td className="p-3">Initial diff layout presentation.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">allowCopy</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">true</td>
                <td className="p-3">Toggles copy button for the new code.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

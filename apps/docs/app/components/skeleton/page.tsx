"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { Skeleton } from "@ai-kit/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "tool-card", title: "Tool call skeleton" },
  { id: "shapes", title: "Text, circular & rectangular" },
  { id: "props-reference", title: "Props reference" },
];

export default function SkeletonPage() {
  return (
    <DocLayout
      breadcrumbSection="Foundations"
      breadcrumbPage="Skeleton"
      currentActive="Skeleton"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Skeleton
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Shimmer loading placeholder components for streaming chat bubbles, tool cards, avatars, and text paragraphs.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/tooltip"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/empty-state"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="Skeleton example"
          code={`<Skeleton variant="chat-bubble" />`}
        >
          <div className="w-full max-w-md py-4">
            <Skeleton variant="chat-bubble" />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="Skeleton"
        slug="skeleton"
        codeSnippet={`import { Skeleton } from "@ai-kit/react";

<Skeleton variant="chat-bubble" />
<Skeleton variant="tool-card" />`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Shimmer animation indicates pending model response generation.
        </p>
        <ComponentPreview
          code={`<div className="space-y-4">
  <Skeleton variant="chat-bubble" />
  <Skeleton variant="chat-bubble" />
</div>`}
        >
          <div className="w-full max-w-md py-4 space-y-4">
            <Skeleton variant="chat-bubble" />
            <Skeleton variant="chat-bubble" />
          </div>
        </ComponentPreview>
      </section>

      {/* Tool Card Skeleton */}
      <section id="tool-card" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Tool call skeleton
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Placeholder layout matching the structure of active ToolCallCard components.
        </p>
        <ComponentPreview
          code={`<Skeleton variant="tool-card" />`}
        >
          <div className="w-full max-w-md py-4">
            <Skeleton variant="tool-card" />
          </div>
        </ComponentPreview>
      </section>

      {/* Shapes */}
      <section id="shapes" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Text, circular & rectangular
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Customizable primitives for avatars, multiline text, and card banners.
        </p>
        <ComponentPreview
          code={`<div className="space-y-4">
  <div className="flex items-center gap-3">
    <Skeleton variant="circular" width="48px" height="48px" />
    <Skeleton variant="text" lines={2} className="flex-1" />
  </div>
  <Skeleton variant="rectangular" height="80px" />
</div>`}
        >
          <div className="w-full max-w-md py-4 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton variant="circular" width="48px" height="48px" />
              <Skeleton variant="text" lines={2} className="flex-1" />
            </div>
            <Skeleton variant="rectangular" height="80px" />
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
                <td className="p-3 font-mono text-brand-600">variant</td>
                <td className="p-3 font-mono">&quot;text&quot; | &quot;circular&quot; | &quot;rectangular&quot; | &quot;chat-bubble&quot; | &quot;tool-card&quot;</td>
                <td className="p-3 font-mono">&quot;rectangular&quot;</td>
                <td className="p-3">Placeholder shape variant.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">width</td>
                <td className="p-3 font-mono">string | number</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Custom width style.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">height</td>
                <td className="p-3 font-mono">string | number</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Custom height style.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">lines</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">3</td>
                <td className="p-3">Line count for text variant.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

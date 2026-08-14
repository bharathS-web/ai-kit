"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { Tooltip, Button } from "@inaicode/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "tooltip-positions", title: "Positions & orientations" },
  { id: "props-reference", title: "Props reference" },
];

export default function TooltipPage() {
  return (
    <DocLayout
      breadcrumbSection="Foundations"
      breadcrumbPage="Tooltip"
      currentActive="Tooltip"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Tooltip
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Application-themed floating tooltip primitive with dark/light mode calibration, micro-arrow, smooth entrance animation, and high z-index stacking.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/audio-player"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/skeleton"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="Tooltip example"
          code={`<Tooltip content="Prompt instructions & options" position="top">
  <Button variant="outline">Hover Top</Button>
</Tooltip>`}
        >
          <div className="flex items-center justify-center py-8">
            <Tooltip content="Prompt instructions & options" position="top">
              <button className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">
                Hover to reveal tooltip
              </button>
            </Tooltip>
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="Tooltip"
        slug="tooltip"
        codeSnippet={`import { Tooltip } from "@inaicode/react";

<Tooltip content="Helpful tooltip info" position="top">
  <button>Hover me</button>
</Tooltip>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Features micro-arrow pointers and floating high z-index layers with backdrop blur.
        </p>
        <ComponentPreview
          code={`<Tooltip content="Connected to AlloyDB cluster" position="bottom">
  <button className="px-3 py-1.5 border rounded-lg">Database Status</button>
</Tooltip>`}
        >
          <div className="flex items-center justify-center py-6">
            <Tooltip content="Connected to AlloyDB cluster" position="bottom">
              <button className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">
                Database Status
              </button>
            </Tooltip>
          </div>
        </ComponentPreview>
      </section>

      {/* Positions & Orientations */}
      <section id="tooltip-positions" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Positions & orientations
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Orient tooltips to the top, bottom, left, or right of any trigger element.
        </p>
        <ComponentPreview
          code={`<div className="flex flex-wrap gap-4">
  <Tooltip content="Top" position="top"><Button>Top</Button></Tooltip>
  <Tooltip content="Bottom" position="bottom"><Button>Bottom</Button></Tooltip>
  <Tooltip content="Left" position="left"><Button>Left</Button></Tooltip>
  <Tooltip content="Right" position="right"><Button>Right</Button></Tooltip>
</div>`}
        >
          <div className="flex flex-wrap items-center justify-center gap-6 py-6">
            <Tooltip content="Tooltip on Top" position="top">
              <button className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">
                Hover Top
              </button>
            </Tooltip>
            <Tooltip content="Tooltip on Bottom" position="bottom">
              <button className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">
                Hover Bottom
              </button>
            </Tooltip>
            <Tooltip content="Tooltip on Left" position="left">
              <button className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">
                Hover Left
              </button>
            </Tooltip>
            <Tooltip content="Tooltip on Right" position="right">
              <button className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">
                Hover Right
              </button>
            </Tooltip>
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
                <td className="p-3 font-mono text-brand-600">content</td>
                <td className="p-3 font-mono">ReactNode</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Tooltip string or JSX content.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">position</td>
                <td className="p-3 font-mono">&quot;top&quot; | &quot;bottom&quot; | &quot;left&quot; | &quot;right&quot;</td>
                <td className="p-3 font-mono">&quot;top&quot;</td>
                <td className="p-3">Tooltip popover orientation.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">children</td>
                <td className="p-3 font-mono">ReactNode</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Trigger element to wrap.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

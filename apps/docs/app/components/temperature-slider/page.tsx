"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { TemperatureSlider } from "@ai-kit/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "creativity-presets", title: "Creativity presets" },
  { id: "props-reference", title: "Props reference" },
];

export default function TemperatureSliderPage() {
  const [temperature, setTemperature] = useState(0.7);

  return (
    <DocLayout
      breadcrumbSection="Settings & Config"
      breadcrumbPage="TemperatureSlider"
      currentActive="TemperatureSlider"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            TemperatureSlider
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Model hyperparameter slider control for temperature, top_p, and creativity presets with dynamic descriptor badges.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/api-key-input"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/system-prompt-editor"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="TemperatureSlider example"
          code={`<TemperatureSlider
  value={temperature}
  onChange={(val) => setTemperature(val)}
  min={0}
  max={2}
  step={0.1}
/>`}
        >
          <div className="w-full max-w-md py-4">
            <TemperatureSlider
              value={temperature}
              onChange={(val) => setTemperature(val)}
            />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="TemperatureSlider"
        slug="temperature-slider"
        codeSnippet={`import { TemperatureSlider } from "@ai-kit/react";

<TemperatureSlider
  value={temp}
  onChange={setTemp}
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Drag the slider to adjust temperature with real-time descriptive tags (Precise, Balanced, Creative).
        </p>
        <ComponentPreview
          code={`<TemperatureSlider
  value={temperature}
  onChange={(v) => setTemperature(v)}
/>`}
        >
          <div className="w-full max-w-md py-4">
            <TemperatureSlider
              value={temperature}
              onChange={(v) => setTemperature(v)}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Creativity Presets */}
      <section id="creativity-presets" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Creativity presets
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          One-click presets for common LLM generation scenarios (Deterministic code 0.2, Analysis 0.7, Brainstorming 1.2).
        </p>
        <ComponentPreview
          code={`<TemperatureSlider
  value={temperature}
  showPresets={true}
  onChange={(v) => setTemperature(v)}
/>`}
        >
          <div className="w-full max-w-md py-4">
            <TemperatureSlider
              value={temperature}
              showPresets={true}
              onChange={(v) => setTemperature(v)}
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
                <td className="p-3 font-mono text-brand-600">value</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Current temperature float value.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onChange</td>
                <td className="p-3 font-mono">(value: number) =&gt; void</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Callback when slider moves.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">min</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">0</td>
                <td className="p-3">Minimum scale limit.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">max</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">2</td>
                <td className="p-3">Maximum scale limit.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">showPresets</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">true</td>
                <td className="p-3">Shows quick preset pills below slider.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

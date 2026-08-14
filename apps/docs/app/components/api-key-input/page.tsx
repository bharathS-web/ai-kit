"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { APIKeyInput } from "@inaicode/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "providers", title: "Provider badges" },
  { id: "props-reference", title: "Props reference" },
];

export default function APIKeyInputPage() {
  const [apiKey, setApiKey] = useState("sk-proj-94b1f8938ecfa8294");

  return (
    <DocLayout
      breadcrumbSection="Settings & Config"
      breadcrumbPage="APIKeyInput"
      currentActive="APIKeyInput"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            APIKeyInput
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Masked API secret key input featuring visibility toggle, copy-to-clipboard trigger, and provider badge indicators.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/rating-stars"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/temperature-slider"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="APIKeyInput example"
          code={`<APIKeyInput
  provider="openai"
  value={apiKey}
  onChange={(val) => setApiKey(val)}
  isValid={apiKey.startsWith("sk-")}
/>`}
        >
          <div className="w-full max-w-md py-4">
            <APIKeyInput
              provider="openai"
              value={apiKey}
              onChange={(val) => setApiKey(val)}
              isValid={apiKey.startsWith("sk-")}
            />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="APIKeyInput"
        slug="api-key-input"
        codeSnippet={`import { APIKeyInput } from "@inaicode/react";

<APIKeyInput
  provider="openai"
  value={key}
  onChange={setKey}
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click the eye icon to unmask characters and use the copy action to grab the key safely.
        </p>
        <ComponentPreview
          code={`<APIKeyInput
  value={apiKey}
  onChange={(val) => setApiKey(val)}
/>`}
        >
          <div className="w-full max-w-md py-4">
            <APIKeyInput
              value={apiKey}
              onChange={(val) => setApiKey(val)}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Providers */}
      <section id="providers" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Provider badges
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Display specific badges for OpenAI, Anthropic Claude, Google Gemini, and custom providers.
        </p>
        <ComponentPreview
          code={`<div className="space-y-4">
  <APIKeyInput provider="anthropic" label="Anthropic API Key" value="sk-ant-api03-..." onChange={() => {}} />
  <APIKeyInput provider="google" label="Gemini API Key" value="AIzaSy..." onChange={() => {}} />
</div>`}
        >
          <div className="w-full max-w-md py-4 space-y-4">
            <APIKeyInput
              provider="anthropic"
              label="Anthropic Claude Key"
              value="sk-ant-api03-92f8a..."
              onChange={() => {}}
            />
            <APIKeyInput
              provider="google"
              label="Google Gemini API Key"
              value="AIzaSyB8f92jka..."
              onChange={() => {}}
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
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Input secret string.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onChange</td>
                <td className="p-3 font-mono">(value: string) =&gt; void</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Callback when input changes.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">provider</td>
                <td className="p-3 font-mono">&quot;openai&quot; | &quot;anthropic&quot; | &quot;google&quot; | &quot;custom&quot;</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Displays provider chip in the header.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">isValid</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Renders shield check badge when validated.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">allowCopy</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">true</td>
                <td className="p-3">Toggles copy button.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

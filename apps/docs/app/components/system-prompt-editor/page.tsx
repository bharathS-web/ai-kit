"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { SystemPromptEditor } from "@ai-kit/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "variable-insertion", title: "Template variables" },
  { id: "props-reference", title: "Props reference" },
];

export default function SystemPromptEditorPage() {
  const [promptText, setPromptText] = useState(
    "You are an autonomous AI software architect specialized in Google Cloud Platform and distributed architectures. Maintain rigorous security protocols when interacting with {{database_schema}}."
  );

  return (
    <DocLayout
      breadcrumbSection="Settings & Config"
      breadcrumbPage="SystemPromptEditor"
      currentActive="SystemPromptEditor"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            SystemPromptEditor
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Dedicated system prompt and developer instructions editor with dynamic template variable insertion pills and live token estimates.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/temperature-slider"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/image-upload-preview"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="SystemPromptEditor example"
          code={`<SystemPromptEditor
  value={promptText}
  onChange={(val) => setPromptText(val)}
  variables={["user_role", "current_date", "database_schema", "tenant_id"]}
/>`}
        >
          <div className="w-full max-w-2xl py-4">
            <SystemPromptEditor
              value={promptText}
              onChange={(val) => setPromptText(val)}
              variables={["user_role", "current_date", "database_schema", "tenant_id"]}
            />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="SystemPromptEditor"
        slug="system-prompt-editor"
        codeSnippet={`import { SystemPromptEditor } from "@ai-kit/react";

<SystemPromptEditor
  value={systemPrompt}
  onChange={setSystemPrompt}
  variables={["user_role", "current_date"]}
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Features character counting, token estimations (~4 characters per token), and quick prompt copying.
        </p>
        <ComponentPreview
          code={`<SystemPromptEditor
  value="Always reply concisely in markdown."
  onChange={(v) => console.log(v)}
/>`}
        >
          <div className="w-full max-w-xl py-4">
            <SystemPromptEditor
              value={promptText}
              onChange={(v) => setPromptText(v)}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Variable Insertion */}
      <section id="variable-insertion" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Template variables
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click any variable badge below the textarea to inject placeholders like <code className="font-mono text-brand-600">{"{{user_id}}"}</code>.
        </p>
        <ComponentPreview
          code={`<SystemPromptEditor
  value={promptText}
  variables={["workspace_id", "auth_token", "model_name"]}
  onChange={(v) => setPromptText(v)}
/>`}
        >
          <div className="w-full max-w-xl py-4">
            <SystemPromptEditor
              value={promptText}
              variables={["workspace_id", "auth_token", "model_name"]}
              onChange={(v) => setPromptText(v)}
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
                <td className="p-3">Textarea content string.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onChange</td>
                <td className="p-3 font-mono">(val: string) =&gt; void</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Callback when prompt instructions are edited.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">variables</td>
                <td className="p-3 font-mono">string[]</td>
                <td className="p-3 font-mono">[&quot;user_role&quot;, ...]</td>
                <td className="p-3">List of quick template variables to insert.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">maxCharacters</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">4000</td>
                <td className="p-3">Maximum character limit.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { CodeBlock } from "@inaicode/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "line-numbers", title: "Line numbers & file header" },
  { id: "props-reference", title: "Props reference" },
];

export default function CodeBlockPage() {
  const sampleCode = `import { Agent } from "@ai-kit/core";

const agent = new Agent({
  model: "claude-3-7-sonnet",
  systemPrompt: "You are an autonomous cloud architect.",
  tools: [queryVectorDatabase, applyMutation],
});

export async function handleRequest(prompt: string) {
  const stream = await agent.run({ prompt });
  return stream;
}`;

  return (
    <DocLayout
      breadcrumbSection="Conversation"
      breadcrumbPage="CodeBlock"
      currentActive="CodeBlock"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            CodeBlock
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Syntax-highlighted code block container featuring language badges, line numbers toggle, file headers, and one-click copy with animated feedback.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/streaming-text"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
            title="Previous: StreamingText"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/citation"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
            title="Next: Citation"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="CodeBlock example"
          code={`<CodeBlock
  fileName="orchestrator.ts"
  language="typescript"
  showLineNumbers={true}
  code={\`${sampleCode}\`}
/>`}
        >
          <div className="w-full max-w-xl py-4">
            <CodeBlock
              fileName="orchestrator.ts"
              language="typescript"
              showLineNumbers={true}
              code={sampleCode}
            />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="CodeBlock"
        slug="code-block"
        codeSnippet={`import { CodeBlock } from "@inaicode/react";

<CodeBlock
  code="console.log('Hello AI Kit');"
  language="typescript"
  fileName="index.ts"
  showLineNumbers
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Render code snippets with automatic syntax color tokens and copy-to-clipboard actions.
        </p>
        <ComponentPreview
          code={`<CodeBlock
  fileName="query_database.ts"
  code="const rows = await db.query('SELECT * FROM users WHERE active = true;');"
/>`}
        >
          <div className="w-full max-w-xl py-4">
            <CodeBlock
              fileName="query_database.ts"
              code="const rows = await db.query('SELECT * FROM users WHERE active = true;');"
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Line Numbers */}
      <section id="line-numbers" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Line numbers & file header
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enable line numbers to provide reference points for LLM code explainers and multi-line snippets.
        </p>
        <ComponentPreview
          code={`<CodeBlock
  fileName="server.ts"
  showLineNumbers={true}
  code={\`import express from "express";
const app = express();
app.listen(3000, () => console.log("Server running on port 3000"));\`}
/>`}
        >
          <div className="w-full max-w-xl py-4">
            <CodeBlock
              fileName="server.ts"
              showLineNumbers={true}
              code={`import express from "express";
const app = express();
app.listen(3000, () => console.log("Server running on port 3000"));`}
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
                <td className="p-3 font-mono text-brand-600">code</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Raw code string to display.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">fileName</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">File title displayed in the window header bar.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">language</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">&quot;typescript&quot;</td>
                <td className="p-3">Code language badge in the header.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">showLineNumbers</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Toggles line numbers column.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">allowCopy</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">true</td>
                <td className="p-3">Enables one-click copy button.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

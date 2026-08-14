"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { ArtifactPanel, CodeBlock } from "@inaicode/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "multi-version", title: "Version history dropdown" },
  { id: "props-reference", title: "Props reference" },
];

export default function ArtifactPanelPage() {
  const [version, setVersion] = useState(2);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <DocLayout
      breadcrumbSection="Artifacts & Canvas"
      breadcrumbPage="ArtifactPanel"
      currentActive="ArtifactPanel"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            ArtifactPanel
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Sidecar canvas window for AI-generated code snippets, markdown documents, diagrams, and multi-version artifact previews.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/confirm-dialog"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/tabs-panel"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="ArtifactPanel example"
          code={`<ArtifactPanel
  title="ai_pipeline.ts"
  type="code"
  version={version}
  versionsCount={3}
  onVersionChange={(v) => setVersion(v)}
  onCopy={() => alert("Copied artifact content!")}
  onDownload={() => alert("Downloading file...")}
>
  <CodeBlock
    language="typescript"
    code="export const pipeline = new Pipeline();"
  />
</ArtifactPanel>`}
        >
          <div className="w-full max-w-2xl h-80 py-2">
            <ArtifactPanel
              title="ai_pipeline.ts"
              type="code"
              version={version}
              versionsCount={3}
              onVersionChange={(v) => setVersion(v)}
              isFullscreen={isFullscreen}
              onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
              onCopy={() => alert("Copied artifact content!")}
              onDownload={() => alert("Downloading file...")}
            >
              <CodeBlock
                language="typescript"
                showLineNumbers
                code={`import { Pipeline } from "@ai-kit/core";

// Version ${version} of the generated pipeline
export const pipeline = new Pipeline({
  timeoutMs: 30000,
  retries: 3,
});`}
              />
            </ArtifactPanel>
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="ArtifactPanel"
        slug="artifact-panel"
        codeSnippet={`import { ArtifactPanel } from "@inaicode/react";

<ArtifactPanel
  title="Report.md"
  type="markdown"
  version={1}
  versionsCount={2}
>
  <div>Artifact Content</div>
</ArtifactPanel>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Features top action triggers for fullscreen mode, copying contents, and downloading the artifact.
        </p>
        <ComponentPreview
          code={`<ArtifactPanel title="README.md" type="markdown">
  <p>Preview generated document markdown</p>
</ArtifactPanel>`}
        >
          <div className="w-full max-w-xl h-60 py-2">
            <ArtifactPanel title="README.md" type="markdown">
              <div className="p-4 text-xs text-gray-700 dark:text-gray-300">
                <h4 className="font-bold text-sm mb-2">Project Architecture</h4>
                <p>Generated markdown documentation for cloud deployment.</p>
              </div>
            </ArtifactPanel>
          </div>
        </ComponentPreview>
      </section>

      {/* Version History */}
      <section id="multi-version" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Version history dropdown
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Switch between previous versions of the artifact with the version picker.
        </p>
        <ComponentPreview
          code={`<ArtifactPanel
  title="schema.sql"
  type="code"
  version={version}
  versionsCount={4}
  onVersionChange={(v) => setVersion(v)}
>
  <p>Version {version} content</p>
</ArtifactPanel>`}
        >
          <div className="w-full max-w-xl h-56 py-2">
            <ArtifactPanel
              title="schema.sql"
              type="code"
              version={version}
              versionsCount={4}
              onVersionChange={(v) => setVersion(v)}
            >
              <div className="p-4 font-mono text-xs text-gray-700 dark:text-gray-300">
                -- Displaying SQL schema definition v{version}
              </div>
            </ArtifactPanel>
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
                <td className="p-3 font-mono text-brand-600">title</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Artifact title displayed in the header.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">type</td>
                <td className="p-3 font-mono">&quot;code&quot; | &quot;markdown&quot; | &quot;image&quot; | &quot;html&quot; | &quot;document&quot;</td>
                <td className="p-3 font-mono">&quot;code&quot;</td>
                <td className="p-3">Artifact type icon &amp; label.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">version</td>
                <td className="p-3 font-mono">number | string</td>
                <td className="p-3 font-mono">1</td>
                <td className="p-3">Active version number.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">versionsCount</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">1</td>
                <td className="p-3">Total number of versions available in dropdown.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onVersionChange</td>
                <td className="p-3 font-mono">(version: number) =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Callback when user selects a version.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { Citation } from "@ai-kit/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "card-citations", title: "Card variant" },
  { id: "props-reference", title: "Props reference" },
];

export default function CitationPage() {
  return (
    <DocLayout
      breadcrumbSection="Conversation"
      breadcrumbPage="Citation"
      currentActive="Citation"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Citation & SourcePill
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Interactive inline source reference chip with hover preview popovers and standalone source cards for RAG search retrieval outputs.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/code-block"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/conversation-history"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="Citation example"
          code={`<p className="text-sm leading-relaxed">
  Google Cloud Spanner delivers 99.999% availability with zero scheduled downtime
  <Citation
    index={1}
    title="Google Cloud Spanner Architecture"
    url="https://cloud.google.com/spanner"
    snippet="Cloud Spanner is a fully managed mission-critical relational database service that provides external consistency at global scale."
  />
  and automatic sharding across regions.
</p>`}
        >
          <div className="w-full max-w-lg p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
            <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
              Google Cloud Spanner delivers 99.999% availability with zero scheduled downtime
              <Citation
                index={1}
                title="Google Cloud Spanner Architecture"
                url="https://cloud.google.com/spanner"
                snippet="Cloud Spanner is a fully managed mission-critical relational database service that provides external consistency at global scale."
              />
              and automatic sharding across regions
              <Citation
                index={2}
                title="Spanner TrueTime API"
                url="https://cloud.google.com/spanner/docs/truetime"
                snippet="TrueTime enables Spanner to generate monotonically increasing timestamps globally."
              />
              .
            </p>
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="Citation"
        slug="citation"
        codeSnippet={`import { Citation } from "@ai-kit/react";

<Citation
  index={1}
  title="Documentation Title"
  url="https://example.com"
  snippet="Excerpt quote from the source document."
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Hover over the citation chip to reveal the full snippet preview, source URL, and quick external link.
        </p>
        <ComponentPreview
          code={`<div className="flex items-center gap-2">
  <span>Refer to Section 4.2</span>
  <Citation
    index={1}
    title="AlloyDB Replication Protocol"
    url="https://cloud.google.com/alloydb"
    snippet="Continuous replication with sub-millisecond sync latency."
  />
</div>`}
        >
          <div className="flex items-center justify-center gap-2 py-4">
            <span className="text-xs text-gray-700 dark:text-gray-300">
              Refer to Section 4.2
            </span>
            <Citation
              index={1}
              title="AlloyDB Replication Protocol"
              url="https://cloud.google.com/alloydb"
              snippet="Continuous replication with sub-millisecond sync latency."
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Card Variant */}
      <section id="card-citations" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Card variant
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Use the card layout for displaying RAG search search results or source references at the bottom of an answer.
        </p>
        <ComponentPreview
          code={`<Citation
  variant="card"
  index={1}
  title="PostgreSQL Columnar Engine Guide"
  url="https://alloydb.google.com/docs"
  snippet="AlloyDB Omni Columnar engine automatically accelerates analytical queries up to 100x."
/>`}
        >
          <div className="w-full max-w-md py-4">
            <Citation
              variant="card"
              index={1}
              title="PostgreSQL Columnar Engine Guide"
              url="https://alloydb.google.com/docs"
              snippet="AlloyDB Omni Columnar engine automatically accelerates analytical queries up to 100x."
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
                <td className="p-3 font-mono text-brand-600">index</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Citation numeric reference badge (e.g. [1]).</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">title</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Document title or page heading.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">url</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">External URL link to original resource.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">snippet</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Highlighted text quote or excerpt from the document.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">variant</td>
                <td className="p-3 font-mono">&quot;pill&quot; | &quot;card&quot;</td>
                <td className="p-3 font-mono">&quot;pill&quot;</td>
                <td className="p-3">Inline interactive chip or standalone card mode.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

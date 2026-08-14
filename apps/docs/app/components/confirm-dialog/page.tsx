"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { ConfirmDialog } from "@ai-kit/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "keyword-protection", title: "Keyword typing safeguard" },
  { id: "props-reference", title: "Props reference" },
];

export default function ConfirmDialogPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isKeywordModalOpen, setIsKeywordModalOpen] = useState(false);

  return (
    <DocLayout
      breadcrumbSection="Actions & Safeguards"
      breadcrumbPage="ConfirmDialog"
      currentActive="ConfirmDialog"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            ConfirmDialog
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Accessible confirmation dialog for high-stakes agent operations, irreversible mutations, and keyword-protected safeguards.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/diff-view"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/artifact-panel"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="ConfirmDialog example"
          code={`<ConfirmDialog
  isOpen={isOpen}
  title="Drop Production Database Table?"
  description="This operation will permanently truncate 14,200 rows. This action cannot be undone."
  confirmLabel="Drop Table"
  variant="danger"
  onConfirm={() => setIsOpen(false)}
  onCancel={() => setIsOpen(false)}
/>`}
        >
          <div className="flex flex-wrap items-center justify-center gap-4 py-6">
            <button
              onClick={() => setIsOpen(true)}
              className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-red-700 transition-all"
            >
              Trigger Danger Action
            </button>

            <button
              onClick={() => setIsKeywordModalOpen(true)}
              className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-amber-700 transition-all"
            >
              Trigger Keyword Protected Modal
            </button>

            <ConfirmDialog
              isOpen={isOpen}
              title="Drop Production Database Table?"
              description="This operation will permanently drop 14,200 records from the public schema. This action cannot be rolled back."
              confirmLabel="Drop Table"
              variant="danger"
              onConfirm={() => {
                alert("Confirmed table drop!");
                setIsOpen(false);
              }}
              onCancel={() => setIsOpen(false)}
            />

            <ConfirmDialog
              isOpen={isKeywordModalOpen}
              title="Destroy Cloud SQL Instance"
              description="To prevent accidental infrastructure destruction, please type the instance ID below."
              confirmationKeyword="prod-alloydb-cluster-01"
              confirmLabel="Permanently Terminate"
              variant="danger"
              onConfirm={() => {
                alert("Cluster terminated.");
                setIsKeywordModalOpen(false);
              }}
              onCancel={() => setIsKeywordModalOpen(false)}
            />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="ConfirmDialog"
        slug="confirm-dialog"
        codeSnippet={`import { ConfirmDialog } from "@ai-kit/react";

<ConfirmDialog
  isOpen={isOpen}
  title="Confirm Action"
  description="Are you sure you want to proceed?"
  onConfirm={() => handleExecute()}
  onCancel={() => setIsOpen(false)}
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Provides human confirmation before destructive agent operations with Escape key dismissal.
        </p>
        <ComponentPreview
          code={`<button onClick={() => setIsOpen(true)}>Open Dialog</button>`}
        >
          <div className="flex items-center justify-center py-4">
            <button
              onClick={() => setIsOpen(true)}
              className="rounded-xl bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-700 transition-all"
            >
              Open Confirmation Modal
            </button>
          </div>
        </ComponentPreview>
      </section>

      {/* Keyword Protection */}
      <section id="keyword-protection" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Keyword typing safeguard
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Requires the user to type a specific confirmation keyword (e.g. cluster ID or &quot;DELETE&quot;) before the action button unlocks.
        </p>
        <ComponentPreview
          code={`<ConfirmDialog
  isOpen={isOpen}
  title="Terminate Kubernetes Cluster"
  confirmationKeyword="DELETE"
  onConfirm={() => handleTerminate()}
/>`}
        >
          <div className="flex items-center justify-center py-4">
            <button
              onClick={() => setIsKeywordModalOpen(true)}
              className="rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
            >
              Test Keyword Requirement Modal
            </button>
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
                <td className="p-3 font-mono text-brand-600">isOpen</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Controls modal visibility.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">title</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Header title of the dialog.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">description</td>
                <td className="p-3 font-mono">ReactNode</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Explanation of action and consequences.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">confirmationKeyword</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Word user must type to unlock confirm button.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onConfirm</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Triggered on confirmed action.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onCancel</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Triggered on cancel button or Escape key.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

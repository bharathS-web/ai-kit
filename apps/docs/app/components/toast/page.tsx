"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { Toast, Button } from "@inaicode/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "toast-variants", title: "Toast variants" },
  { id: "props-reference", title: "Props reference" },
];

export default function ToastPage() {
  const [showToast, setShowToast] = useState(false);
  const [activeVariant, setActiveVariant] = useState<"success" | "error" | "info" | "warning">("success");

  const triggerToast = (variant: "success" | "error" | "info" | "warning") => {
    setActiveVariant(variant);
    setShowToast(true);
  };

  return (
    <DocLayout
      breadcrumbSection="Foundations"
      breadcrumbPage="Toast"
      currentActive="Toast"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Toast
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Transient floating notification alerts with auto-dismiss timers, action links, and status icons for streaming events.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/empty-state"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/prompt-box"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="Toast example"
          code={`<Toast
  variant="success"
  title="Code changes applied"
  description="Updated 4 files with new TypeScript strict types."
  action={{ label: "Undo", onClick: () => handleUndo() }}
/>`}
        >
          <div className="flex flex-col items-center justify-center py-6 space-y-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => triggerToast("success")}
                className="rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-emerald-700 transition-all"
              >
                Success Toast
              </button>
              <button
                onClick={() => triggerToast("error")}
                className="rounded-xl bg-red-600 px-3.5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-red-700 transition-all"
              >
                Error Toast
              </button>
              <button
                onClick={() => triggerToast("warning")}
                className="rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-amber-700 transition-all"
              >
                Warning Toast
              </button>
              <button
                onClick={() => triggerToast("info")}
                className="rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-brand-700 transition-all"
              >
                Info Toast
              </button>
            </div>

            {showToast && (
              <Toast
                key={Date.now()}
                variant={activeVariant}
                title={
                  activeVariant === "success"
                    ? "Agent Mutation Completed"
                    : activeVariant === "error"
                    ? "Execution Error"
                    : activeVariant === "warning"
                    ? "Approaching Rate Limit"
                    : "New Artifact Generated"
                }
                description="All background tasks completed with zero exit codes."
                onClose={() => setShowToast(false)}
                duration={5000}
                action={{
                  label: "View logs",
                  onClick: () => alert("Viewing logs..."),
                }}
              />
            )}
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="Toast"
        slug="toast"
        codeSnippet={`import { Toast } from "@inaicode/react";

<Toast
  variant="success"
  title="Action successful"
  description="Mutation applied cleanly."
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Toast notifications automatically dismiss after a configurable duration.
        </p>
        <ComponentPreview
          code={`<Toast
  variant="info"
  title="LLM Context Updated"
  description="Added 4 vector search embeddings to session memory."
/>`}
        >
          <div className="flex items-center justify-center py-4">
            <Toast
              variant="info"
              title="LLM Context Updated"
              description="Added 4 vector search embeddings to session memory."
              duration={0}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Toast Variants */}
      <section id="toast-variants" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Toast variants
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Distinct color-coded status badges for success, error, warning, and informational notices.
        </p>
        <ComponentPreview
          code={`<div className="space-y-3">
  <Toast variant="success" title="Cluster Provisioned" duration={0} />
  <Toast variant="error" title="Rate limit quota exceeded" duration={0} />
</div>`}
        >
          <div className="w-full max-w-sm space-y-3 py-4">
            <Toast variant="success" title="Cluster Provisioned" duration={0} />
            <Toast variant="error" title="Rate limit quota exceeded" duration={0} />
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
                <td className="p-3">Notification header title.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">description</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Supporting message details.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">variant</td>
                <td className="p-3 font-mono">&quot;success&quot; | &quot;error&quot; | &quot;info&quot; | &quot;warning&quot;</td>
                <td className="p-3 font-mono">&quot;info&quot;</td>
                <td className="p-3">Status icon and color theme.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">duration</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">4000</td>
                <td className="p-3">Auto-dismiss time in milliseconds (0 to disable).</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onClose</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Callback when dismissed.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

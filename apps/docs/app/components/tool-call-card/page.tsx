"use client";

import React from "react";
import { DocLayout } from "../DocLayout";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { TOCItem } from "../DocTOC";
import { ToolCallCard } from "@ai-kit/react";

const TOC: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "status-variants", title: "Status variants" },
  { id: "props-reference", title: "Props reference" },
];

export default function ToolCallCardPage() {
  return (
    <DocLayout
      breadcrumbSection="Status & Feedback"
      breadcrumbPage="ToolCallCard"
      currentActive="ToolCallCard"
      tocItems={TOC}
    >
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          ToolCallCard
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Compact expandable card displaying agent function/tool invocations, argument payloads, execution status, and return results.
        </p>
      </div>

      <div className="mt-6">
        <ComponentPreview
          code={`<ToolCallCard
  toolName="search_vector_database"
  status="success"
  durationMs={240}
  args={{ query: "How to use partition pruning in BigQuery", top_k: 5 }}
  result={{ matches: 5, status: "200 OK", execution_time: "0.24s" }}
/>`}
        >
          <div className="w-full max-w-lg">
            <ToolCallCard
              toolName="search_vector_database"
              status="success"
              durationMs={240}
              args={{ query: "How to use partition pruning in BigQuery", top_k: 5 }}
              result={{ matches: 5, status: "200 OK", execution_time: "0.24s" }}
            />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Installation */}
      <InstallationSection
        componentName="ToolCallCard"
        slug="tool-call-card"
        files={[
          {
            filename: "components/ToolCallCard.tsx",
            code: `"use client";

import React, { useState } from "react";

export interface ToolCallCardProps {
  toolName: string;
  args?: Record<string, unknown> | string;
  result?: unknown;
  status?: "pending" | "running" | "success" | "error";
  durationMs?: number;
  className?: string;
}

export const ToolCallCard = ({
  toolName,
  args,
  result,
  status = "success",
  durationMs,
  className = "",
}: ToolCallCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusIcons: Record<NonNullable<ToolCallCardProps["status"]>, React.ReactNode> = {
    pending: <span className="h-2 w-2 rounded-full bg-gray-400" />,
    running: (
      <svg
        className="animate-spin h-3.5 w-3.5 text-violet-600 dark:text-violet-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    ),
    success: (
      <svg className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    error: (
      <svg className="h-3.5 w-3.5 text-red-600 dark:text-red-400" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };

  const formatPayload = (data: unknown) => {
    if (typeof data === "string") return data;
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  return (
    <div
      className={\`rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/90 shadow-xs overflow-hidden text-xs \${className}\`.trim()}
    >
      {/* Header Bar */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-gray-50/70 dark:bg-gray-850/60 hover:bg-gray-100/70 dark:hover:bg-gray-800 transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xs">
            {statusIcons[status]}
          </div>
          <span className="font-mono font-semibold text-gray-900 dark:text-white">
            {toolName}
          </span>
          {durationMs !== undefined && (
            <span className="text-[11px] text-gray-400 font-mono">
              {durationMs}ms
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-gray-400">
          <span className="text-[11px] uppercase tracking-wider font-semibold">
            {status}
          </span>
          <svg
            className={\`h-4 w-4 transition-transform \${isExpanded ? "rotate-180" : ""}\`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </button>

      {/* Expanded Payload View */}
      {isExpanded && (
        <div className="border-t border-gray-100 dark:border-gray-800 p-3 space-y-3 font-mono bg-white dark:bg-gray-900">
          {args && (
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
                Arguments
              </div>
              <pre className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-950/80 border border-gray-100 dark:border-gray-800 text-[11px] text-gray-800 dark:text-gray-200 overflow-x-auto">
                {formatPayload(args)}
              </pre>
            </div>
          )}

          {result !== undefined && (
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
                Result
              </div>
              <pre className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-950/80 border border-gray-100 dark:border-gray-800 text-[11px] text-gray-800 dark:text-gray-200 overflow-x-auto">
                {formatPayload(result)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};`,
          },
        ]}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Status variants */}
      <section id="status-variants" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Status variants
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Support for <code>running</code>, <code>success</code>, and <code>error</code> states.
        </p>
        <ComponentPreview
          code={`<div className="space-y-3 w-full max-w-lg">
  <ToolCallCard toolName="execute_sql_query" status="running" />
  <ToolCallCard toolName="send_slack_notification" status="error" result="403 Forbidden: Invalid Webhook Token" />
</div>`}
        >
          <div className="space-y-3 w-full max-w-lg">
            <ToolCallCard toolName="execute_sql_query" status="running" />
            <ToolCallCard toolName="send_slack_notification" status="error" result="403 Forbidden: Invalid Webhook Token" />
          </div>
        </ComponentPreview>
      </section>

      {/* SECTION: Props */}
      <section id="props-reference" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Props reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-gray-200 bg-gray-50/70 font-semibold text-gray-900 dark:border-gray-800 dark:bg-gray-900/60 dark:text-white">
              <tr>
                <th className="px-4 py-3">Prop</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Default</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 font-mono">
              <tr>
                <td className="px-4 py-3 text-brand-600 font-bold">toolName</td>
                <td className="px-4 py-3 text-purple-600">string</td>
                <td className="px-4 py-3 text-gray-400">—</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Name of the tool/function invoked</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-brand-600 font-bold">status</td>
                <td className="px-4 py-3 text-purple-600">&quot;pending&quot; | &quot;running&quot; | &quot;success&quot; | &quot;error&quot;</td>
                <td className="px-4 py-3 text-gray-400">&quot;success&quot;</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Execution status indicator</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

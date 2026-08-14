"use client";

import React, { useState } from "react";
import { DocLayout } from "../DocLayout";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { TOCItem } from "../DocTOC";
import { PermissionPrompt } from "@inaicode/react";

const TOC: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "props-reference", title: "Props reference" },
];

export default function PermissionPromptPage() {
  const [status, setStatus] = useState<string | null>(null);

  return (
    <DocLayout
      breadcrumbSection="Actions & Permissions"
      breadcrumbPage="PermissionPrompt"
      currentActive="PermissionPrompt"
      tocItems={TOC}
    >
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          PermissionPrompt
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Agent permission dialog offering one-time grant vs. always-allow choices for dangerous tools or sandbox file modifications.
        </p>
      </div>

      <div className="mt-6">
        <ComponentPreview
          code={`<PermissionPrompt
  toolName="execute_shell_command"
  scope="filesystem:write"
  description="Allows writing to ./src/components and installing npm dependencies."
  onAllowOnce={() => setStatus("Allowed once")}
  onAlwaysAllow={() => setStatus("Always allowed")}
  onDeny={() => setStatus("Access denied")}
/>`}
        >
          <div className="w-full max-w-lg space-y-3">
            <PermissionPrompt
              toolName="execute_shell_command"
              scope="filesystem:write"
              description="Allows writing to ./src/components and running npm install in workspace."
              onAllowOnce={() => setStatus("Granted for single invocation")}
              onAlwaysAllow={() => setStatus("Persistently granted for session")}
              onDeny={() => setStatus("Permission denied")}
            />
            {status && (
              <p className="text-center text-xs font-semibold text-brand-600">
                Status: {status}
              </p>
            )}
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Installation */}
      <InstallationSection
        componentName="PermissionPrompt"
        slug="permission-prompt"
        files={[
          {
            filename: "components/PermissionPrompt.tsx",
            code: `"use client";

import React from "react";

export interface PermissionPromptProps {
  toolName: string;
  scope: string;
  description?: React.ReactNode;
  onAllowOnce: () => void;
  onAlwaysAllow: () => void;
  onDeny: () => void;
  disabled?: boolean;
  className?: string;
}

export const PermissionPrompt = ({
  toolName,
  scope,
  description,
  onAllowOnce,
  onAlwaysAllow,
  onDeny,
  disabled = false,
  className = "",
}: PermissionPromptProps) => {
  return (
    <div
      className={\`rounded-2xl border border-gray-200 bg-white p-4.5 shadow-sm dark:border-gray-800 dark:bg-gray-900 text-xs \${className}\`.trim()}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-gray-900 dark:text-white">
              Permission Request
            </span>
            <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-[11px] text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {scope}
            </span>
          </div>

          <p className="mt-1 text-gray-600 dark:text-gray-400 leading-relaxed">
            The AI agent is requesting access to invoke <code className="font-semibold font-mono text-gray-800 dark:text-gray-200">{toolName}</code>.
          </p>

          {description && (
            <div className="mt-2 text-gray-500 dark:text-gray-400 text-[11px]">
              {description}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              disabled={disabled}
              onClick={onDeny}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-750 transition-colors disabled:opacity-50"
            >
              Deny
            </button>

            <button
              type="button"
              disabled={disabled}
              onClick={onAllowOnce}
              className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 font-medium text-violet-700 hover:bg-violet-100 dark:border-violet-800/60 dark:bg-violet-950/60 dark:text-violet-300 dark:hover:bg-violet-900/50 transition-colors disabled:opacity-50"
            >
              Allow this time
            </button>

            <button
              type="button"
              disabled={disabled}
              onClick={onAlwaysAllow}
              className="rounded-lg bg-violet-600 px-3 py-1.5 font-semibold text-white shadow-xs hover:bg-violet-700 transition-colors disabled:opacity-50"
            >
              Always allow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};`,
          },
        ]}
      />

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
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Name of tool requiring approval</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-brand-600 font-bold">scope</td>
                <td className="px-4 py-3 text-purple-600">string</td>
                <td className="px-4 py-3 text-gray-400">—</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Permission scope identifier badge</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

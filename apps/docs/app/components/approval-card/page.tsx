"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  Copy,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Terminal,
} from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { GithubIcon } from "../Icons";
import { ApprovalCard } from "@ai-kit/react";

const APPROVAL_TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "custom-action-labels", title: "Custom action labels" },
  { id: "disabled-state", title: "Disabled after decision" },
  { id: "props-reference", title: "Props reference" },
];

export default function ApprovalCardPage() {
  const [copyDropdownOpen, setCopyDropdownOpen] = useState(false);
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const [installTab, setInstallTab] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");

  const [heroStatus, setHeroStatus] = useState<string | null>(null);
  const [disabledDemoState, setDisabledDemoState] = useState<"pending" | "approved" | "rejected">("pending");

  const triggerCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAction(label);
    setTimeout(() => {
      setCopiedAction(null);
      setCopyDropdownOpen(false);
    }, 1500);
  };

  const installCommands = {
    pnpm: "pnpm add @ai-kit/react",
    npm: "npm i @ai-kit/react",
    yarn: "yarn add @ai-kit/react",
    bun: "bun add @ai-kit/react",
  };

  return (
    <DocLayout
      breadcrumbSection="Actions & Permissions"
      breadcrumbPage="ApprovalCard"
      currentActive="ApprovalCard"
      tocItems={APPROVAL_TOC_ITEMS}
    >
      {/* Header Title Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            ApprovalCard
          </h1>
        </div>

        {/* Top Right Navigation pagination buttons */}
        <div className="flex items-center gap-1">
          <Link
            href="/components/thinking"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
            title="Previous: Thinking"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/prompt-box"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
            title="Next: PromptBox"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Subtitle description */}
      <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
        Prompts the user to explicitly approve or reject an AI-proposed action or destructive operation before execution, keeping human-in-the-loop workflows secure.
      </p>

      {/* External links badges */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
        >
          <GithubIcon className="h-3.5 w-3.5" />
          <span>GitHub</span>
          <ExternalLink className="h-3 w-3 text-gray-400" />
        </a>

        <a
          href="https://tailwindcss.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
        >
          <svg className="h-3.5 w-3.5 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 6.5C8 6.5 5.5 8.5 4.5 12.5C6 11 7.5 10.5 9 11C10.05 11.35 10.8 12.11 11.62 12.95C12.96 14.31 14.54 15.91 19.5 15.91C23.5 15.91 26 13.91 27 9.91C25.5 11.41 24 11.91 22.5 11.41C21.45 11.06 20.7 10.3 19.88 9.46C18.54 8.1 16.96 6.5 12 6.5Z" />
          </svg>
          <span>Tailwind CSS</span>
          <ExternalLink className="h-3 w-3 text-gray-400" />
        </a>
      </div>

      {/* HERO PREVIEW CARD */}
      <div className="mt-8">
        <ComponentPreview
          title="ApprovalCard example"
          code={`<ApprovalCard
  title="Run 'rm -rf dist/' in production"
  description="This action will delete build cache and trigger a cold deployment."
  approveLabel="Approve & Run"
  rejectLabel="Decline"
  onApprove={() => handleApprove()}
  onReject={() => handleReject()}
/>`}
        >
          <div className="w-full max-w-lg space-y-4">
            <ApprovalCard
              title="Run `rm -rf dist/` in production"
              description="This action will delete build cache and trigger a cold deployment."
              approveLabel="Approve & Run"
              rejectLabel="Decline"
              onApprove={() => setHeroStatus("Action approved: rm -rf dist/ executed.")}
              onReject={() => setHeroStatus("Action rejected by user.")}
            />

            {heroStatus && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-300 animate-in fade-in flex items-center justify-between">
                <span>Status: {heroStatus}</span>
                <button
                  onClick={() => setHeroStatus(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-[11px]"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Installation */}
      <InstallationSection
        componentName="ApprovalCard"
        slug="approval-card"
        files={[
          {
            filename: "components/ApprovalCard.tsx",
            code: `"use client";

import React from "react";

export interface ApprovalCardProps {
  /** Short title of the proposed action, e.g. "Run \`rm -rf dist/\`" */
  title: string;
  /** Optional longer description or code/diff preview */
  description?: React.ReactNode;
  onApprove: () => void;
  onReject: () => void;
  /** Disables both buttons, e.g. once a choice has been made */
  disabled?: boolean;
  approveLabel?: string;
  rejectLabel?: string;
  className?: string;
}

export const ApprovalCard = ({
  title,
  description,
  onApprove,
  onReject,
  disabled = false,
  approveLabel = "Approve",
  rejectLabel = "Reject",
  className = "",
}: ApprovalCardProps) => {
  return (
    <div
      className={\`rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/30 \${className}\`.trim()}
    >
      <div className="flex items-start gap-2">
        <svg
          className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1.5L14.5 13.5H1.5L8 1.5Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M8 6V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="8" cy="11.2" r="0.7" fill="currentColor" />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
          {description && (
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</div>
          )}
        </div>
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={onReject}
          disabled={disabled}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-750"
        >
          {rejectLabel}
        </button>
        <button
          type="button"
          onClick={onApprove}
          disabled={disabled}
          className="rounded-md bg-violet-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {approveLabel}
        </button>
      </div>
    </div>
  );
};`,
          },
        ]}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Interactive example */}
      <section id="interactive-example" className="scroll-mt-6 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Interactive prompt card with alert icon and confirmation buttons.
        </p>
        <ComponentPreview
          code={`<ApprovalCard
  title="Apply Schema Migration"
  description="ALTER TABLE users ADD COLUMN last_active TIMESTAMP;"
  onApprove={() => alert("Migration applied")}
  onReject={() => alert("Migration cancelled")}
/>`}
        >
          <div className="w-full max-w-lg">
            <ApprovalCard
              title="Apply Schema Migration"
              description="ALTER TABLE users ADD COLUMN last_active TIMESTAMP;"
              onApprove={() => alert("Migration applied")}
              onReject={() => alert("Migration cancelled")}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* SECTION: Custom action labels */}
      <section id="custom-action-labels" className="scroll-mt-6 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Custom action labels
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Customize the approve and reject button text via <code>approveLabel</code> and <code>rejectLabel</code>.
        </p>
        <ComponentPreview
          code={`<ApprovalCard
  title="Merge Pull Request #142"
  description="Squash and merge 3 commits into main branch."
  approveLabel="Confirm Merge"
  rejectLabel="Close PR"
  onApprove={() => console.log("Merged")}
  onReject={() => console.log("Closed")}
/>`}
        >
          <div className="w-full max-w-lg">
            <ApprovalCard
              title="Merge Pull Request #142"
              description="Squash and merge 3 commits into main branch."
              approveLabel="Confirm Merge"
              rejectLabel="Close PR"
              onApprove={() => alert("Merged")}
              onReject={() => alert("Closed")}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* SECTION: Disabled state */}
      <section id="disabled-state" className="scroll-mt-6 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Disabled after decision
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Disable buttons once the user has made a decision to prevent repeated requests.
        </p>
        <ComponentPreview
          code={`<ApprovalCard
  title="Authorize OAuth App"
  description={disabledDemoState === "pending" ? "App requesting read access to repositories." : \`Decision: \${disabledDemoState}\`}
  disabled={disabledDemoState !== "pending"}
  onApprove={() => setDisabledDemoState("approved")}
  onReject={() => setDisabledDemoState("rejected")}
/>`}
        >
          <div className="w-full max-w-lg space-y-3">
            <ApprovalCard
              title="Authorize OAuth App"
              description={
                disabledDemoState === "pending"
                  ? "App is requesting read access to your repositories."
                  : `Decision recorded: ${disabledDemoState}`
              }
              disabled={disabledDemoState !== "pending"}
              onApprove={() => setDisabledDemoState("approved")}
              onReject={() => setDisabledDemoState("rejected")}
            />
            {disabledDemoState !== "pending" && (
              <button
                onClick={() => setDisabledDemoState("pending")}
                className="text-xs text-brand-600 dark:text-brand-400 hover:underline"
              >
                Reset demo
              </button>
            )}
          </div>
        </ComponentPreview>
      </section>

      {/* SECTION: Props reference */}
      <section id="props-reference" className="scroll-mt-6 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Props reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase text-gray-500 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Prop</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Default</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs dark:divide-gray-800">
              <tr>
                <td className="px-4 py-3 font-mono font-medium text-brand-600 dark:text-brand-400">title</td>
                <td className="px-4 py-3 font-mono text-gray-500">string</td>
                <td className="px-4 py-3 text-gray-400">required</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Headline title of the action to be confirmed.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono font-medium text-brand-600 dark:text-brand-400">description</td>
                <td className="px-4 py-3 font-mono text-gray-500">ReactNode</td>
                <td className="px-4 py-3 font-mono text-gray-400">undefined</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Additional context, explanation, or code preview.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono font-medium text-brand-600 dark:text-brand-400">onApprove</td>
                <td className="px-4 py-3 font-mono text-gray-500">() =&gt; void</td>
                <td className="px-4 py-3 text-gray-400">required</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback executed when Approve is clicked.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono font-medium text-brand-600 dark:text-brand-400">onReject</td>
                <td className="px-4 py-3 font-mono text-gray-500">() =&gt; void</td>
                <td className="px-4 py-3 text-gray-400">required</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback executed when Reject is clicked.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono font-medium text-brand-600 dark:text-brand-400">approveLabel</td>
                <td className="px-4 py-3 font-mono text-gray-500">string</td>
                <td className="px-4 py-3 font-mono text-gray-400">&ldquo;Approve&rdquo;</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Label on confirmation button.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono font-medium text-brand-600 dark:text-brand-400">rejectLabel</td>
                <td className="px-4 py-3 font-mono text-gray-500">string</td>
                <td className="px-4 py-3 font-mono text-gray-400">&ldquo;Reject&rdquo;</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Label on rejection button.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono font-medium text-brand-600 dark:text-brand-400">disabled</td>
                <td className="px-4 py-3 font-mono text-gray-500">boolean</td>
                <td className="px-4 py-3 font-mono text-gray-400">false</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disables both action buttons.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer Navigation */}
      <div className="mt-16 flex items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-800">
        <Link
          href="/components/thinking"
          className="group flex flex-col gap-1 text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
        >
          <span className="text-xs text-gray-400">Previous</span>
          <span className="flex items-center gap-1 text-base font-semibold text-gray-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
            ← Thinking
          </span>
        </Link>

        <Link
          href="/components/prompt-box"
          className="group flex flex-col items-end gap-1 text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
        >
          <span className="text-xs text-gray-400">Next</span>
          <span className="flex items-center gap-1 text-base font-semibold text-gray-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
            PromptBox →
          </span>
        </Link>
      </div>
    </DocLayout>
  );
}

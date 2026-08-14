"use client";

import React from "react";
import { DocLayout } from "../DocLayout";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { TOCItem } from "../DocTOC";
import { ErrorBanner } from "@ai-kit/react";

const TOC: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "with-retry", title: "With retry action" },
  { id: "props-reference", title: "Props reference" },
];

export default function ErrorBannerPage() {
  return (
    <DocLayout
      breadcrumbSection="Status & Feedback"
      breadcrumbPage="ErrorBanner"
      currentActive="ErrorBanner"
      tocItems={TOC}
    >
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          ErrorBanner
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Inline alert banner for recoverable AI generation errors, rate limits, and network timeouts with retry and dismiss triggers.
        </p>
      </div>

      <div className="mt-6">
        <ComponentPreview
          code={`<ErrorBanner
  title="Rate Limit Exceeded"
  message="Anthropic API returned 429 Too Many Requests. Please wait 15 seconds before retrying."
  onRetry={() => alert("Retrying request...")}
  onDismiss={() => alert("Dismissed")}
/>`}
        >
          <div className="w-full max-w-lg">
            <ErrorBanner
              title="Rate Limit Exceeded"
              message="Anthropic API returned 429 Too Many Requests. Please wait 15 seconds before retrying."
              onRetry={() => alert("Retrying request...")}
              onDismiss={() => alert("Dismissed")}
            />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Installation */}
      <InstallationSection
        componentName="ErrorBanner"
        slug="error-banner"
        files={[
          {
            filename: "components/ErrorBanner.tsx",
            code: `"use client";

import React from "react";

export interface ErrorBannerProps {
  title?: string;
  message: React.ReactNode;
  onRetry?: () => void;
  onDismiss?: () => void;
  retryLabel?: string;
  className?: string;
}

export const ErrorBanner = ({
  title = "Something went wrong",
  message,
  onRetry,
  onDismiss,
  retryLabel = "Try again",
  className = "",
}: ErrorBannerProps) => {
  return (
    <div
      role="alert"
      className={\`rounded-xl border border-red-200 bg-red-50/90 p-3.5 text-xs text-red-900 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200 shadow-xs \${className}\`.trim()}
    >
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/60 dark:text-red-300">
          <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5V8.5M8 11.5H8.01M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          {title && <p className="font-semibold text-red-950 dark:text-red-100">{title}</p>}
          <div className="mt-0.5 text-red-800 dark:text-red-300 leading-relaxed">
            {message}
          </div>

          {(onRetry || onDismiss) && (
            <div className="mt-2.5 flex items-center gap-3 font-medium">
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="rounded-md bg-red-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs hover:bg-red-700 active:scale-95 transition-all"
                >
                  {retryLabel}
                </button>
              )}
              {onDismiss && (
                <button
                  type="button"
                  onClick={onDismiss}
                  className="text-red-700 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 transition-colors"
                >
                  Dismiss
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};`,
          },
        ]}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: With retry */}
      <section id="with-retry" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          With retry action
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Provide an <code>onRetry</code> callback to let users re-trigger the failed prompt or agent step.
        </p>
        <ComponentPreview
          code={`<ErrorBanner message="Network connection lost during streaming." onRetry={() => {}} />`}
        >
          <div className="w-full max-w-lg">
            <ErrorBanner message="Network connection lost during streaming." onRetry={() => alert("Retrying...")} />
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
                <td className="px-4 py-3 text-brand-600 font-bold">message</td>
                <td className="px-4 py-3 text-purple-600">ReactNode</td>
                <td className="px-4 py-3 text-gray-400">—</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Error description or explanation</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-brand-600 font-bold">onRetry</td>
                <td className="px-4 py-3 text-purple-600">() =&gt; void</td>
                <td className="px-4 py-3 text-gray-400">—</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Callback when retry button is clicked</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

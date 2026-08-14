"use client";

import React from "react";
import Link from "next/link";
import { DocLayout } from "../components/DocLayout";
import { Badge } from "@ai-kit/react";
import {
  History,
  Sparkles,
  Zap,
  Tag,
  CheckCircle2,
  GitCommit,
  Layers,
  ArrowRight,
} from "lucide-react";

const TOC = [
  { id: "v1-2-0", title: "v1.2.0 - Agent Primitives & Docs" },
  { id: "v1-1-0", title: "v1.1.0 - Terminal Look & Syntax" },
  { id: "v1-0-0", title: "v1.0.0 - Initial Release" },
];

export default function ChangelogPage() {
  return (
    <DocLayout
      breadcrumbSection="Get Started"
      breadcrumbPage="Changelog"
      currentActive="Changelog"
      tocItems={TOC}
    >
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/80 px-3 py-1 text-xs font-medium text-purple-700 dark:border-purple-900/60 dark:bg-purple-950/40 dark:text-purple-300">
          <History className="h-3.5 w-3.5 text-brand-600" />
          <span>Release History</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Changelog
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          New features, design improvements, bug fixes, and component releases for AI Kit React.
        </p>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Timeline Container */}
      <div className="relative space-y-12 pl-2">
        {/* Release: v1.2.0 */}
        <section id="v1-2-0" className="scroll-mt-8 relative flex items-start gap-6">
          {/* Vertical Timeline Dot & Line */}
          <div className="flex flex-col items-center shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-500/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="w-px flex-1 border-l-2 border-dashed border-gray-200 dark:border-gray-800 mt-3 min-h-[140px]" />
          </div>

          {/* Release Content */}
          <div className="flex-1 min-w-0 space-y-5 pb-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  v1.2.0
                </h2>
                <Badge variant="brand" size="sm" dot>
                  Latest
                </Badge>
              </div>
              <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                August 14, 2026
              </span>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Major expansion adding 11 new conversational and agentic UI primitives, centralized Tailwind brand design tokens, standalone setup documentation, and categorized navigation.
            </p>

            {/* Highlights Box */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-[#111827] space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600">
                <Layers className="h-4 w-4" />
                <span>New AI Primitives</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <Link
                  href="/components/message-bubble"
                  className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-900/60 hover:border-brand-600/40 transition-colors"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">MessageBubble</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">User, assistant, & system chat bubbles.</p>
                </Link>

                <Link
                  href="/components/message-list"
                  className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-900/60 hover:border-brand-600/40 transition-colors"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">MessageList</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">Auto-scrolling container with empty states.</p>
                </Link>

                <Link
                  href="/components/streaming-text"
                  className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-900/60 hover:border-brand-600/40 transition-colors"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">StreamingText</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">Token-by-token reveal with pulsing cursor.</p>
                </Link>

                <Link
                  href="/components/tool-call-card"
                  className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-900/60 hover:border-brand-600/40 transition-colors"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">ToolCallCard</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">Expandable function & tool invocation viewer.</p>
                </Link>

                <Link
                  href="/components/model-selector"
                  className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-900/60 hover:border-brand-600/40 transition-colors"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">ModelSelector</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">Dropdown for switching LLM models.</p>
                </Link>

                <Link
                  href="/components/permission-prompt"
                  className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-900/60 hover:border-brand-600/40 transition-colors"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">PermissionPrompt</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">Granular allow-once vs always-allow permissions.</p>
                </Link>
              </div>

              <div className="pt-2">
                <h4 className="font-semibold text-xs text-gray-900 dark:text-white mb-2">
                  Other Improvements in this Release:
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Added <code className="font-mono text-gray-800 dark:text-gray-200">Button</code>, <code className="font-mono text-gray-800 dark:text-gray-200">Badge</code>, <code className="font-mono text-gray-800 dark:text-gray-200">Avatar</code>, <code className="font-mono text-gray-800 dark:text-gray-200">FileAttachment</code>, and <code className="font-mono text-gray-800 dark:text-gray-200">ErrorBanner</code>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Created dedicated <Link href="/introduction" className="text-brand-600 hover:underline font-medium">Introduction</Link> and <Link href="/installation" className="text-brand-600 hover:underline font-medium">Installation</Link> documentation pages.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Centralized Tailwind CSS brand colors in <code className="font-mono">tailwind.config.ts</code>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Added shared <code className="font-mono">&lt;WindowDots /&gt;</code> component for macOS window titlebars.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Release: v1.1.0 */}
        <section id="v1-1-0" className="scroll-mt-8 relative flex items-start gap-6">
          <div className="flex flex-col items-center shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <GitCommit className="h-4 w-4" />
            </div>
            <div className="w-px flex-1 border-l-2 border-dashed border-gray-200 dark:border-gray-800 mt-3 min-h-[120px]" />
          </div>

          <div className="flex-1 min-w-0 space-y-4 pb-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  v1.1.0
                </h2>
                <Badge variant="default" size="sm">
                  Enhancements
                </Badge>
              </div>
              <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                August 12, 2026
              </span>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Modern macOS terminal styling, real VS Code syntax token highlighting, and spring physics for toggle transitions.
            </p>

            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>VS Code Syntax Highlighting</strong>: Added custom token lexer supporting keywords, JSX tags, strings, types, and comments.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>macOS Traffic Light Titlebars</strong>: Added styled window dots with clean, minimal copy triggers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Spring Segmented Toggle</strong>: Fluid sliding pill toggle with cubic-bezier physics.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Equal Height Baseline</strong>: Locked code and preview containers to equal height (<code className="font-mono">min-h-[220px]</code>) with zero layout shifting.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Release: v1.0.0 */}
        <section id="v1-0-0" className="scroll-mt-8 relative flex items-start gap-6">
          <div className="flex flex-col items-center shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <Tag className="h-4 w-4" />
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  v1.0.0
                </h2>
                <Badge variant="default" size="sm">
                  Initial Release
                </Badge>
              </div>
              <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                August 10, 2026
              </span>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Initial public release of AI Kit React—an open-source, standalone UI kit built for generative AI workflows, prompt interfaces, and LLM applications.
            </p>

            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Released <code className="font-mono">PromptBox</code>, <code className="font-mono">Thinking</code>, and <code className="font-mono">ApprovalCard</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>100% standalone component architecture with zero utility dependencies.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Full light and dark mode support with tailored color palettes.</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </DocLayout>
  );
}

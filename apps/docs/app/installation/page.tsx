"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DocLayout } from "../components/DocLayout";
import { CodeBlock } from "../components/CodeBlock";
import { WindowDots } from "../components/WindowDots";
import {
  Terminal,
  Check,
  Copy,
  Layers,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

const TOC = [
  { id: "cli-installation", title: "CLI Installation" },
  { id: "manual-installation", title: "Manual Installation" },
  { id: "tailwind-configuration", title: "Tailwind Configuration" },
  { id: "peer-dependencies", title: "Peer Dependencies" },
  { id: "next-steps", title: "Next Steps" },
];

export default function InstallationPage() {
  const [pm, setPm] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedTailwind, setCopiedTailwind] = useState(false);

  const initCommands = {
    pnpm: "pnpm dlx @inaicode/cli init",
    npm: "npx @inaicode/cli init",
    yarn: "yarn dlx @inaicode/cli init",
    bun: "bunx @inaicode/cli init",
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(initCommands[pm]);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const tailwindSnippet = `// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          25: "#FCFAFF",
          50: "#F9F5FF",
          100: "#F4EBFF",
          200: "#E9D7FE",
          300: "#D6BBFB",
          400: "#B692F6",
          500: "#9E77ED",
          600: "#7F56D9",
          700: "#6941C6",
          800: "#53389E",
          900: "#42307D",
        },
      },
    },
  },
  plugins: [],
};

export default config;`;

  const handleCopyTailwind = () => {
    navigator.clipboard.writeText(tailwindSnippet);
    setCopiedTailwind(true);
    setTimeout(() => setCopiedTailwind(false), 2000);
  };

  return (
    <DocLayout
      breadcrumbSection="Get Started"
      breadcrumbPage="Installation"
      currentActive="Installation"
      tocItems={TOC}
    >
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/80 px-3 py-1 text-xs font-medium text-purple-700 dark:border-purple-900/60 dark:bg-purple-950/40 dark:text-purple-300">
          <Terminal className="h-3.5 w-3.5 text-brand-600" />
          <span>Setup & Config</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Installation
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          How to install dependencies and configure AI Kit React in your project. Choose between our CLI setup or manual copy-paste.
        </p>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* 1. SECTION: CLI Installation */}
      <section id="cli-installation" className="scroll-mt-8 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            CLI Installation (Recommended)
          </h2>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            Fastest
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Use the AI Kit CLI to automatically configure Tailwind CSS tokens and scaffold components into your project directory.
        </p>

        {/* CLI Terminal Box */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white text-xs font-mono text-gray-900 shadow-xs dark:border-gray-800 dark:bg-[#111827] dark:text-gray-100">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/70 px-4 py-2.5 dark:border-gray-800 dark:bg-gray-900/60 select-none">
            <div className="flex items-center gap-3">
              <WindowDots size="sm" className="pr-1" />
              <div className="flex items-center gap-1.5">
                {(["pnpm", "npm", "yarn", "bun"] as const).map((pkgMgr) => (
                  <button
                    key={pkgMgr}
                    onClick={() => setPm(pkgMgr)}
                    className={`rounded-md px-2 py-0.5 text-xs transition-colors ${
                      pm === pkgMgr
                        ? "bg-brand-600 text-white font-semibold shadow-xs"
                        : "text-gray-500 hover:bg-gray-200/50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    }`}
                  >
                    {pkgMgr}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCopyCli}
              title="Copy command"
              aria-label="Copy command"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-500 hover:bg-gray-200/60 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
            >
              {copiedCli ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          <pre className="p-4 overflow-x-auto text-gray-900 dark:text-gray-100 bg-white dark:bg-[#111827]">
            <code>{initCommands[pm]}</code>
          </pre>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Once initialized, you can add individual components at any time with: <code className="font-mono text-brand-600 font-semibold">{pm === "npm" ? "npx" : pm} @inaicode/cli add [component-name]</code>
        </p>
      </section>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* 2. SECTION: Manual Installation */}
      <section id="manual-installation" className="scroll-mt-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Manual Installation
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Prefer not to use a CLI? Follow these 3 simple steps to integrate AI Kit components manually:
          </p>
        </div>

        {/* Step 1 */}
        <div className="flex items-start gap-4">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 shadow-xs dark:border-gray-800 dark:bg-[#111827] dark:text-gray-200">
            1
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Install icons dependency
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              AI Kit components use <code className="font-mono text-purple-600">lucide-react</code> for crisp icons:
            </p>
            <pre className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">
              <code>npm install lucide-react</code>
            </pre>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-4" id="tailwind-configuration">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 shadow-xs dark:border-gray-800 dark:bg-[#111827] dark:text-gray-200">
            2
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Configure Tailwind CSS color tokens
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Add the <code className="font-mono text-brand-600 font-semibold">brand</code> color scale to your <code className="font-mono">tailwind.config.ts</code>:
            </p>

            <div className="relative rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-[#111827] overflow-hidden">
              <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/70 px-4 py-2 dark:border-gray-800 dark:bg-gray-900/60 select-none">
                <span className="text-xs font-mono text-gray-500">tailwind.config.ts</span>
                <button
                  onClick={handleCopyTailwind}
                  className="flex h-6 w-6 items-center justify-center rounded text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  title="Copy snippet"
                >
                  {copiedTailwind ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
              <div className="p-4 text-xs font-mono">
                <CodeBlock code={tailwindSnippet} />
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-4" id="peer-dependencies">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 shadow-xs dark:border-gray-800 dark:bg-[#111827] dark:text-gray-200">
            3
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Copy component source files
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Navigate to any component in the sidebar (e.g., <Link href="/components/prompt-box" className="text-brand-600 hover:underline">PromptBox</Link>, <Link href="/components/message-bubble" className="text-brand-600 hover:underline">MessageBubble</Link>, or <Link href="/components/approval-card" className="text-brand-600 hover:underline">ApprovalCard</Link>), switch to the <strong>Manual</strong> tab under Installation, and copy the TypeScript file directly into your <code className="font-mono">components/</code> directory.
            </p>
          </div>
        </div>
      </section>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* 3. SECTION: Next steps */}
      <section id="next-steps" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Next steps
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Now that your project is configured, start building with our conversational and agentic UI primitives:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <Link
            href="/components/prompt-box"
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-xs hover:border-brand-600 hover:shadow-md transition-all dark:border-gray-800 dark:bg-[#111827] dark:hover:border-brand-600"
          >
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">PromptBox</h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Interactive prompt input with auto-resize.
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:underline">
              <span>View docs</span>
              <ChevronRight className="h-3 w-3" />
            </div>
          </Link>

          <Link
            href="/components/message-bubble"
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-xs hover:border-brand-600 hover:shadow-md transition-all dark:border-gray-800 dark:bg-[#111827] dark:hover:border-brand-600"
          >
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">MessageBubble</h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              User and AI message bubbles with avatars.
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:underline">
              <span>View docs</span>
              <ChevronRight className="h-3 w-3" />
            </div>
          </Link>

          <Link
            href="/components/approval-card"
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-xs hover:border-brand-600 hover:shadow-md transition-all dark:border-gray-800 dark:bg-[#111827] dark:hover:border-brand-600"
          >
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">ApprovalCard</h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Human-in-the-loop tool confirmations.
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:underline">
              <span>View docs</span>
              <ChevronRight className="h-3 w-3" />
            </div>
          </Link>
        </div>
      </section>
    </DocLayout>
  );
}

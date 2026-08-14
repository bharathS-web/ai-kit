"use client";

import React from "react";
import Link from "next/link";
import { DocLayout } from "../components/DocLayout";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Zap,
  Layers,
  Code2,
  PackageX,
  FileCode,
  ChevronRight,
} from "lucide-react";
import { ReactIcon, TailwindIcon, TypeScriptIcon, LucideIcon } from "../components/Icons";

const TOC = [
  { id: "what-is-ai-kit", title: "What is AI Kit React?" },
  { id: "tech-stack", title: "Tech stack" },
  { id: "accessibility", title: "Accessibility" },
  { id: "how-is-this-different", title: "How is this different from a library?" },
  { id: "next-steps", title: "Next steps" },
];

export default function IntroductionPage() {
  return (
    <DocLayout
      breadcrumbSection="Get Started"
      breadcrumbPage="Introduction"
      currentActive="Introduction"
      tocItems={TOC}
    >
      {/* 1. Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/80 px-3 py-1 text-xs font-medium text-purple-700 dark:border-purple-900/60 dark:bg-purple-950/40 dark:text-purple-300">
          <Sparkles className="h-3.5 w-3.5 text-brand-600" />
          <span>Documentation</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Introduction
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          Welcome to <strong className="text-gray-900 dark:text-white font-semibold">AI Kit React</strong>! A collection of standalone, production-ready UI components built specifically for LLM chatbots, agentic workflows, and generative user interfaces.
        </p>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* 2. SECTION: What is AI Kit React? */}
      <section id="what-is-ai-kit" className="scroll-mt-8 space-y-5">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          What is AI Kit React?
        </h2>

        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          <strong className="text-brand-600 font-semibold">AI Kit React</strong> is an open-source collection of standalone React components styled with <strong className="font-semibold text-gray-900 dark:text-white">Tailwind CSS</strong> and written in strict <strong className="font-semibold text-gray-900 dark:text-white">TypeScript</strong>. Just copy, paste, and build.
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Skip weeks of designing prompt inputs, reasoning indicators, and human-in-the-loop approval dialogs from scratch. AI Kit React components are self-contained with zero runtime bloat, tested with both <strong className="text-gray-800 dark:text-gray-200">React 18 & React 19</strong>, and styled with <strong className="text-gray-800 dark:text-gray-200">Tailwind CSS</strong>.
        </p>

        <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-5 dark:border-purple-950 dark:bg-purple-950/20 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="font-medium text-purple-900 dark:text-purple-200">
            It&apos;s the perfect starting point for any AI product—giving you everything you need to build responsive, modern, and beautiful generative interfaces.
          </p>
        </div>
      </section>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* 3. SECTION: Tech stack */}
      <section id="tech-stack" className="scroll-mt-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Tech stack
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            We&apos;ve kept our tech stack minimal and zero-lock-in, so you can focus on building. AI Kit is powered by:
          </p>
        </div>

        {/* 4 Cards Grid with Real Tech Stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* React */}
          <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-[#111827] hover:border-brand-600/50 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 dark:bg-cyan-950/60 p-2.5">
                <ReactIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">React</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">UI component framework</p>
              </div>
            </div>
            <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-xs font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
              v18 / v19
            </span>
          </div>

          {/* Tailwind CSS */}
          <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-[#111827] hover:border-brand-600/50 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-950/60 p-2.5">
                <TailwindIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Tailwind CSS</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Styling & design tokens</p>
              </div>
            </div>
            <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-xs font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
              v3.4+
            </span>
          </div>

          {/* TypeScript */}
          <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-[#111827] hover:border-brand-600/50 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 p-2.5">
                <TypeScriptIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">TypeScript</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Strict types & autocomplete</p>
              </div>
            </div>
            <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-xs font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
              v5.5+
            </span>
          </div>

          {/* Lucide Icons */}
          <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-[#111827] hover:border-brand-600/50 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/60 p-2.5">
                <LucideIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Lucide Icons</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Clean, lightweight icons</p>
              </div>
            </div>
            <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-xs font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
              v1.31+
            </span>
          </div>
        </div>
      </section>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* 4. SECTION: Accessibility */}
      <section id="accessibility" className="scroll-mt-8 space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Accessibility
          </h2>
        </div>

        <p className="text-base text-gray-800 dark:text-gray-200 font-semibold">
          Accessibility isn&apos;t optional—it&apos;s the baseline for any modern build.
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Every component in AI Kit is engineered using semantic HTML5 elements, full keyboard navigation hotkeys, visible focus rings, and proper WAI-ARIA roles so that screen readers and assistive devices have first-class support out of the box.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white">
              <Check className="h-4 w-4 text-emerald-500" />
              Keyboard Navigation
            </div>
            <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
              Full tab indexing, Enter/Shift+Enter hotkeys, and focus rings.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white">
              <Check className="h-4 w-4 text-emerald-500" />
              Screen Reader Support
            </div>
            <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
              WAI-ARIA compliant roles, live regions, and descriptive aria-labels.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white">
              <Check className="h-4 w-4 text-emerald-500" />
              High Contrast & States
            </div>
            <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
              Calibrated for AA/AAA color contrast in light and dark modes.
            </p>
          </div>
        </div>
      </section>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* 5. SECTION: How is this different from a library? */}
      <section id="how-is-this-different" className="scroll-mt-8 space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          How is this different from a library?
        </h2>

        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Unlike traditional component libraries that are installed as a rigid dependency, <strong className="text-brand-600 font-semibold">AI Kit React gives you the source code</strong>.
        </p>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-[#111827] space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            When you select a component, its code is added directly to your project. This means <strong className="text-gray-900 dark:text-white">no package dependencies to manage and no vendor lock-in!</strong> You have full control to modify, extend, or adapt the components to your specific needs—because you own the code.
          </p>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Traditional Library */}
            <div className="rounded-xl border border-red-200/80 bg-red-50/40 p-4 dark:border-red-950 dark:bg-red-950/20">
              <div className="flex items-center gap-2 text-xs font-bold text-red-900 dark:text-red-300">
                <PackageX className="h-4 w-4 text-red-500" />
                <span>Traditional UI Libraries</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-xs text-red-800 dark:text-red-300/80">
                <li>• Locked inside <code className="text-[11px] font-mono">node_modules</code></li>
                <li>• Hard to style without CSS overrides and <code className="text-[11px] font-mono">!important</code></li>
                <li>• Breaking changes when bumping package versions</li>
                <li>• Bloated bundle size with unused components</li>
              </ul>
            </div>

            {/* AI Kit React */}
            <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-4 dark:border-emerald-950 dark:bg-emerald-950/20">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300">
                <FileCode className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>AI Kit React Approach</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-xs text-emerald-800 dark:text-emerald-300/80">
                <li>• You own the code directly in your repo</li>
                <li>• 100% pure Tailwind CSS—customize in seconds</li>
                <li>• Zero dependency lock-in or version mismatch</li>
                <li>• Only include what you actually use</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* 6. SECTION: Next steps */}
      <section id="next-steps" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Next steps
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Get up and running with the CLI or explore the components library:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Link
            href="/installation"
            className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-xs hover:border-brand-600 hover:shadow-md transition-all dark:border-gray-800 dark:bg-[#111827] dark:hover:border-brand-600"
          >
            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-brand-600 dark:bg-purple-950/60">
                <Zap className="h-4 w-4" />
              </div>
              <h3 className="mt-3 font-bold text-sm text-gray-900 dark:text-white">
                Installation Guide
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Set up Tailwind configuration and add components via CLI or manual copy.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:underline">
              <span>Read installation</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          <Link
            href="/components/prompt-box"
            className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-xs hover:border-brand-600 hover:shadow-md transition-all dark:border-gray-800 dark:bg-[#111827] dark:hover:border-brand-600"
          >
            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                <Layers className="h-4 w-4" />
              </div>
              <h3 className="mt-3 font-bold text-sm text-gray-900 dark:text-white">
                Explore Components
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Browse PromptBox, MessageBubble, ApprovalCard, Thinking, and more.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:underline">
              <span>View components</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        </div>
      </section>
    </DocLayout>
  );
}

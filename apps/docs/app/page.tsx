"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Check,
  Copy,
  Terminal,
  ShieldAlert,
  Bot,
  Zap,
  Layers,
  Code2,
  Sun,
  Moon,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { GithubIcon, TwitterXIcon, AiKitLogo } from "./components/Icons";
import { WindowDots } from "./components/WindowDots";
import { PromptBox, Thinking, ApprovalCard } from "@ai-kit/react";
import { useTheme } from "./components/ThemeContext";
import { CodeBlock } from "./components/CodeBlock";

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [copiedCli, setCopiedCli] = useState(false);

  // Interactive Hero Demo State
  const [demoStep, setDemoStep] = useState<"idle" | "thinking" | "approval" | "approved" | "rejected">("idle");
  const [demoPrompt, setDemoPrompt] = useState("");
  const [demoStatusMessage, setDemoStatusMessage] = useState("");

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("npm i @ai-kit/react");
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleDemoSubmit = (val: string) => {
    setDemoPrompt(val);
    setDemoStep("thinking");
    setTimeout(() => {
      setDemoStep("approval");
    }, 1400);
  };

  const handleApprove = () => {
    setDemoStep("approved");
    setDemoStatusMessage("Action executed successfully by agent.");
  };

  const handleReject = () => {
    setDemoStep("rejected");
    setDemoStatusMessage("Action was rejected by user.");
  };

  const resetDemo = () => {
    setDemoStep("idle");
    setDemoPrompt("");
    setDemoStatusMessage("");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased dark:bg-[#0B0F19] dark:text-gray-100 transition-colors">
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/80 backdrop-blur-md dark:border-gray-800/80 dark:bg-[#0B0F19]/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-md shadow-brand-500/20 p-1">
                <AiKitLogo className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
                AI Kit
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
              <Link
                href="/introduction"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Introduction
              </Link>
              <Link
                href="/installation"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Installation
              </Link>
              <Link
                href="/components/prompt-box"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Components
              </Link>
              <Link
                href="/components/approval-card"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                ApprovalCard
              </Link>
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* GitHub Stars Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
              <span className="rounded-full bg-gray-200 px-1.5 py-0.2 text-[10px] font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                1.8k
              </span>
            </a>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-gray-700" />
              )}
            </button>

            {/* Docs CTA Button */}
            <Link
              href="/components/prompt-box"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 transition-all active:scale-95"
            >
              <span>Explore Docs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 h-[450px] w-[700px] rounded-full bg-gradient-to-tr from-purple-500/20 via-brand-600/15 to-indigo-500/20 blur-[120px] dark:from-purple-900/30 dark:via-brand-600/20 dark:to-indigo-900/30" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/80 px-3.5 py-1 text-xs font-medium text-purple-700 shadow-xs dark:border-purple-900/60 dark:bg-purple-950/40 dark:text-purple-300">
            <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
            <span>AI Kit 1.0 Release</span>
            <span className="text-purple-400 dark:text-purple-600">•</span>
            <Link href="/components/prompt-box" className="hover:underline flex items-center gap-1">
              Explore components <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Headline */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-gray-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-tight md:leading-tight">
            The Component Library for{" "}
            <span className="bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Modern AI Apps
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            A standalone React & Tailwind CSS UI kit built for LLM chatbots, agentic workflows, and generative interfaces. Copy-paste directly into your codebase.
          </p>

          {/* CTA Row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/components/prompt-box"
              className="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand-500/20 hover:bg-brand-700 transition-all active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Quick Copy Command */}
            <button
              onClick={handleCopyInstall}
              className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-xs sm:text-sm font-mono text-gray-800 shadow-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 transition-all active:scale-95"
            >
              <Terminal className="h-4 w-4 text-brand-600" />
              <span>npm i @ai-kit/react</span>
              <span className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                {copiedCli ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </span>
            </button>
          </div>

          {/* 3. Interactive Hero AI Playground */}
          <div className="mt-14 mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-gray-50/70 p-2 sm:p-3 shadow-xl dark:border-gray-800 dark:bg-[#111827]/70 backdrop-blur-md">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 shadow-xs dark:border-gray-800 dark:bg-[#0D111C] text-left">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800/80">
                <div className="flex items-center gap-2">
                  <WindowDots size="sm" />
                  <span className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Live AI Agent Playground
                  </span>
                </div>
                {demoStep !== "idle" && (
                  <button
                    onClick={resetDemo}
                    className="text-xs font-medium text-brand-600 hover:underline"
                  >
                    Reset Demo
                  </button>
                )}
              </div>

              {/* Chat Simulation Area */}
              <div className="min-h-[220px] flex flex-col justify-center space-y-4 py-6">
                {demoStep === "idle" && (
                  <div className="text-center py-6">
                    <Bot className="h-10 w-10 mx-auto text-brand-600 mb-2 opacity-80" />
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Try typing a prompt below
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      e.g., &quot;Deploy database migration to production&quot; or &quot;Delete staging cluster&quot;
                    </p>
                  </div>
                )}

                {demoStep === "thinking" && (
                  <div className="flex flex-col items-center justify-center py-6 space-y-2 animate-in fade-in">
                    <Thinking label="Agent is analyzing schema & preparing mutation" size="md" />
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Querying catalog, checking permissions...
                    </p>
                  </div>
                )}

                {demoStep === "approval" && (
                  <div className="w-full max-w-lg mx-auto animate-in fade-in zoom-in-[0.98]">
                    <ApprovalCard
                      title="Apply Database Schema Migration"
                      description="ALTER TABLE users ADD COLUMN last_login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;"
                      approveLabel="Execute Migration"
                      rejectLabel="Cancel"
                      onApprove={handleApprove}
                      onReject={handleReject}
                    />
                  </div>
                )}

                {(demoStep === "approved" || demoStep === "rejected") && (
                  <div className="text-center py-6 animate-in fade-in">
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-full mb-2 ${
                        demoStep === "approved"
                          ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                          : "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
                      }`}
                    >
                      {demoStep === "approved" ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <ShieldAlert className="h-5 w-5" />
                      )}
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {demoStatusMessage}
                    </p>
                    <button
                      onClick={resetDemo}
                      className="mt-3 rounded-lg border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
                    >
                      Try another prompt
                    </button>
                  </div>
                )}
              </div>

              {/* PromptBox Input Component */}
              <div className="pt-2">
                <PromptBox
                  placeholder="Ask the AI agent to perform an action..."
                  onSubmit={handleDemoSubmit}
                  disabled={demoStep === "thinking"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Component Grid Showcase */}
      <section className="border-t border-gray-200/80 bg-gray-50/50 py-20 dark:border-gray-800/80 dark:bg-[#0E131F]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Crafted Components
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Essential UI Building Blocks for AI
            </p>
            <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Stop reinventing prompt inputs, human-in-the-loop modals, and streaming indicators.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Card 1: PromptBox */}
            <div className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-xs hover:border-brand-600 hover:shadow-md transition-all dark:border-gray-800 dark:bg-[#111827] dark:hover:border-brand-600">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-brand-600 dark:bg-purple-950/60">
                  <Bot className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                  PromptBox
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Auto-resizing prompt textarea with keyboard submit (Enter / Shift+Enter), controlled/uncontrolled state, and disabled streaming state.
                </p>

                <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50/80 p-3 dark:border-gray-800 dark:bg-gray-900/60">
                  <PromptBox
                    placeholder="Send a prompt..."
                    onSubmit={(v) => alert(v)}
                  />
                </div>
              </div>

              <Link
                href="/components/prompt-box"
                className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
              >
                <span>View documentation</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Card 2: ApprovalCard */}
            <div className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-xs hover:border-brand-600 hover:shadow-md transition-all dark:border-gray-800 dark:bg-[#111827] dark:hover:border-brand-600">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                  ApprovalCard
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Human-in-the-loop confirmation card for dangerous actions, mutations, code execution, and tool-call approvals.
                </p>

                <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50/80 p-3 dark:border-gray-800 dark:bg-gray-900/60">
                  <ApprovalCard
                    title="Deploy to Staging"
                    description="Rebuild image and promote to v1.4"
                    onApprove={() => alert("Approved")}
                    onReject={() => alert("Rejected")}
                  />
                </div>
              </div>

              <Link
                href="/components/approval-card"
                className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
              >
                <span>View documentation</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Card 3: Thinking */}
            <div className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-xs hover:border-brand-600 hover:shadow-md transition-all dark:border-gray-800 dark:bg-[#111827] dark:hover:border-brand-600">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                  Thinking
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Pure CSS animated bouncing dot reasoning indicator with configurable sizes, custom status labels, and zero runtime overhead.
                </p>

                <div className="mt-5 flex items-center justify-center rounded-xl border border-gray-100 bg-gray-50/80 p-6 dark:border-gray-800 dark:bg-gray-900/60 min-h-[95px]">
                  <Thinking label="Agent is reasoning" size="md" />
                </div>
              </div>

              <Link
                href="/components/thinking"
                className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
              >
                <span>View documentation</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section: Why AI Kit? (Copy, Paste, and Own the Code) */}
      <section className="py-24 border-t border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-[#0E131F]/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Why AI Kit?
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Copy, Paste, and Own the Code
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Traditional component packages lock you into rigid abstractions. AI Kit puts the source directly in your project.
            </p>
          </div>

          {/* Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Traditional NPM Packages */}
            <div className="rounded-3xl border border-red-200/80 bg-white p-8 shadow-xs dark:border-red-950 dark:bg-[#121620] space-y-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 dark:bg-red-950/80 dark:text-red-300">
                  Traditional NPM Packages
                </span>
                <span className="text-xs text-red-500 font-mono">Vendor Lock-in</span>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong className="text-gray-900 dark:text-white">Locked in node_modules:</strong> You can&apos;t modify internal markup or Tailwind classes without messy CSS hacks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong className="text-gray-900 dark:text-white">Breaking version upgrades:</strong> Minor updates can silently break your production chat interfaces.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong className="text-gray-900 dark:text-white">Heavy bundle bloat:</strong> Ships hundreds of unused components and runtime polyfills into your bundle.</span>
                </li>
              </ul>
            </div>

            {/* Card 2: The AI Kit Philosophy */}
            <div className="rounded-3xl border border-brand-500/40 bg-gradient-to-b from-purple-50/50 to-white p-8 shadow-md dark:border-brand-600/40 dark:from-[#17162E]/60 dark:to-[#111827] space-y-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  The AI Kit Philosophy
                </span>
                <span className="text-xs text-emerald-500 font-mono font-semibold">100% Freedom</span>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong className="text-gray-900 dark:text-white">You own the source code:</strong> Modify, style, and adapt every component directly in your project.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong className="text-gray-900 dark:text-white">Zero package dependencies:</strong> Pure React + Tailwind CSS with Lucide icons. No runtime bloat.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong className="text-gray-900 dark:text-white">React 18 & 19 verified:</strong> Type-checked with TypeScript 5.5+ for complete type safety and autocomplete.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-[#111827]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-brand-600 dark:bg-purple-950/60">
                <Layers className="h-4 w-4" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-gray-900 dark:text-white">
                100% Standalone
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Copy a single component file and it works immediately with zero config.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-[#111827]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                <Code2 className="h-4 w-4" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-gray-900 dark:text-white">
                Pure Tailwind CSS
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Styled with standard classes. Customize colors and animations effortlessly.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-[#111827]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <Zap className="h-3 w-3" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-gray-900 dark:text-white">
                Zero Runtime Lock-in
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                No third-party headless wrappers. Clean React state and semantic HTML.
              </p>
            </div>

            
          </div>
        </div>
      </section>

      {/* 6. Quick Code Example (macOS Terminal) */}
      <section className="border-t border-gray-200/80 bg-gray-50/50 py-20 dark:border-gray-800/80 dark:bg-[#0E131F]/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Developer Experience
            </h2>
            <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              As Simple As React Should Be
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-[#111827]">
            {/* Window Header */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-4 py-2.5 dark:border-gray-800 dark:bg-gray-900/60 select-none">
              <WindowDots size="sm" />
              <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                app/chat/page.tsx
              </span>
              <div className="w-12" />
            </div>

            {/* Code */}
            <div className="p-5 sm:p-6 overflow-x-auto">
              <CodeBlock
                code={`import { PromptBox, Thinking, ApprovalCard } from "@ai-kit/react";

export default function AIChatPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      {/* 1. Reasoning indicator during streaming */}
      <Thinking label="Agent is reasoning..." size="md" />

      {/* 2. Human-in-the-loop tool execution confirmation */}
      <ApprovalCard
        title="Execute Database Migration"
        description="ALTER TABLE users ADD COLUMN is_verified BOOLEAN;"
        onApprove={() => runTool("migrate_db")}
        onReject={() => cancelTool()}
      />

      {/* 3. Auto-resizing interactive prompt input */}
      <PromptBox
        placeholder="Ask the AI agent..."
        onSubmit={(prompt) => sendToLLM(prompt)}
      />
    </div>
  );
}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Call To Action */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 py-14 sm:px-12 sm:py-16 shadow-lg dark:border-gray-800 dark:bg-[#111827]">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Ready to build next-generation AI apps?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Explore the full component library, copy and paste into your project, or install via npm.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/components/prompt-box"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-600/20 hover:bg-brand-700 transition-all active:scale-95"
                >
                  <span>Explore Components Docs</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95 shadow-xs"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>Star on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Modern Multi-Column Innovative Footer */}
      <footer className="border-t border-gray-200/80 bg-gray-50/60 pt-16 pb-12 dark:border-gray-800/80 dark:bg-[#070A10] transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-gray-200/80 dark:border-gray-800/80">
            {/* Left Column: Brand, Mission, System Status (Col 5) */}
            <div className="space-y-5 lg:col-span-5">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-md shadow-brand-500/20 p-1.5 transition-transform group-hover:scale-105">
                  <AiKitLogo className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white">
                    AI Kit
                  </span>
                  <span className="rounded-md border border-purple-200 bg-purple-50 px-1.5 py-0.5 text-[10px] font-semibold text-purple-700 dark:border-purple-800/80 dark:bg-purple-950/80 dark:text-purple-300">
                    v1.2
                  </span>
                </div>
              </Link>

              <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                The open-source interface layer for autonomous agents, LLM chatbots, and generative UI workflows. Built with pure React, Tailwind CSS, and strict TypeScript.
              </p>

              {/* Status Pill + One-Click CLI Copy */}
              <div className="space-y-3 pt-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/70 px-3 py-1 text-[11px] font-medium text-emerald-800 dark:border-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <span>14 Production Primitives Active</span>
                </div>

                {/* Quick Interactive Terminal Copy in Footer */}
                <div className="flex max-w-xs items-center justify-between rounded-xl border border-gray-200 bg-white p-1.5 shadow-2xs dark:border-gray-800 dark:bg-gray-900/90 font-mono text-[11px] text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2 pl-2 overflow-hidden">
                    <Terminal className="h-3.5 w-3.5 text-brand-600 shrink-0" />
                    <span className="truncate">npm i @ai-kit/react</span>
                  </div>
                  <button
                    onClick={handleCopyInstall}
                    className="flex h-6 items-center gap-1 rounded-lg bg-gray-50 px-2 text-[10px] font-semibold text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors shrink-0"
                    title="Copy command"
                  >
                    {copiedCli ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>

              {/* Social Link Badges */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
                  title="GitHub Repository"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
                  title="Twitter / X"
                >
                  <TwitterXIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Column 2: Components & Primitives (Col 3) */}
            <div className="space-y-3 lg:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Components
              </h4>
              <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="/components/prompt-box" className="hover:text-brand-600 dark:hover:text-white transition-colors">
                    PromptBox & Composer
                  </Link>
                </li>
                <li>
                  <Link href="/components/message-bubble" className="hover:text-brand-600 dark:hover:text-white transition-colors">
                    MessageBubble & Avatars
                  </Link>
                </li>
                <li>
                  <Link href="/components/streaming-text" className="hover:text-brand-600 dark:hover:text-white transition-colors">
                    StreamingText Token Reveal
                  </Link>
                </li>
                <li>
                  <Link href="/components/approval-card" className="hover:text-brand-600 dark:hover:text-white transition-colors">
                    ApprovalCard (Human-in-loop)
                  </Link>
                </li>
                <li>
                  <Link href="/components/thinking" className="hover:text-brand-600 dark:hover:text-white transition-colors">
                    Thinking (Reasoning Waves)
                  </Link>
                </li>
                <li>
                  <Link href="/components/tool-call-card" className="hover:text-brand-600 dark:hover:text-white transition-colors">
                    ToolCallCard & Latency
                  </Link>
                </li>
                <li>
                  <Link href="/components/model-selector" className="hover:text-brand-600 dark:hover:text-white transition-colors">
                    ModelSelector Dropdown
                  </Link>
                </li>
                <li>
                  <Link href="/components/permission-prompt" className="hover:text-brand-600 dark:hover:text-white transition-colors">
                    PermissionPrompt Dialog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Documentation & Guides (Col 2) */}
            <div className="space-y-3 lg:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Documentation
              </h4>
              <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="/introduction" className="hover:text-brand-600 dark:hover:text-white transition-colors">
                    Introduction
                  </Link>
                </li>
                <li>
                  <Link href="/installation" className="hover:text-brand-600 dark:hover:text-white transition-colors">
                    Installation
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-white transition-colors">
                    <span>Changelog</span>
                    <span className="rounded bg-brand-50 px-1 py-0.2 text-[9px] font-bold text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                      NEW
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/introduction#tech-stack" className="hover:text-brand-600 dark:hover:text-white transition-colors">
                    Tech Stack
                  </Link>
                </li>
                <li>
                  <Link href="/introduction#accessibility" className="hover:text-brand-600 dark:hover:text-white transition-colors">
                    Accessibility (WAI-ARIA)
                  </Link>
                </li>
                <li>
                  <Link href="/introduction#how-is-this-different" className="hover:text-brand-600 dark:hover:text-white transition-colors">
                    Why Own The Code?
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Ecosystem & Standards (Col 2) */}
            <div className="space-y-3 lg:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Ecosystem
              </h4>
              <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                  <span>React 18 & 19 Ready</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400"></span>
                  <span>Tailwind CSS v3 & v4</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  <span>Strict TypeScript 5.5+</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400"></span>
                  <span>Lucide React Icons</span>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:underline pt-1"
                  >
                    <span>View on GitHub</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Craftsmanship */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-500">
            <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
              <span>© {new Date().getFullYear()} AI Kit. Released under the MIT License.</span>
              <span className="hidden sm:inline">•</span>
              <span>Zero runtime vendor lock-in.</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

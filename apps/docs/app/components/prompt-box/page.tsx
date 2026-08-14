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
import { PromptBox } from "@inaicode/react";

const PROMPTBOX_TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "multiline-input", title: "Multiline auto-resize" },
  { id: "custom-placeholders", title: "Custom placeholders" },
  { id: "disabled-state", title: "Disabled state" },
  { id: "props-reference", title: "Props reference" },
];

export default function PromptBoxPage() {
  const [copyDropdownOpen, setCopyDropdownOpen] = useState(false);
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const [installTab, setInstallTab] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");
  const [submittedHistory, setSubmittedHistory] = useState<string[]>([
    "How can I build an agentic workflow with Next.js?",
  ]);

  const triggerCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAction(label);
    setTimeout(() => {
      setCopiedAction(null);
      setCopyDropdownOpen(false);
    }, 1500);
  };

  const installCommands = {
    pnpm: "pnpm add @inaicode/react",
    npm: "npm i @inaicode/react",
    yarn: "yarn add @inaicode/react",
    bun: "bun add @inaicode/react",
  };

  return (
    <DocLayout
      breadcrumbSection="Input & Controls"
      breadcrumbPage="PromptBox"
      currentActive="PromptBox"
      tocItems={PROMPTBOX_TOC_ITEMS}
    >
      {/* Header Title Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            PromptBox
          </h1>
        </div>

        {/* Top Right Navigation pagination buttons */}
        <div className="flex items-center gap-1">
          <Link
            href="/components/approval-card"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
            title="Previous: ApprovalCard"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/thinking"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
            title="Next: Thinking"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Subtitle description */}
      <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
        Free and open-source React chat & prompt input component built for modern AI applications. Features auto-resizing height, keyboard shortcuts (Enter to submit, Shift+Enter for newlines), and a send action button.
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
          title="PromptBox example"
          code={`<PromptBox
  placeholder="Ask a question, analyze code, or run an AI task..."
  onSubmit={(value) => {
    console.log("Submitted prompt:", value);
  }}
/>`}
        >
          <div className="w-full max-w-xl space-y-4">
            <PromptBox
              placeholder="Ask a question, analyze code, or run an AI task..."
              onSubmit={(val) => {
                setSubmittedHistory((prev) => [val, ...prev]);
              }}
            />

            {submittedHistory.length > 0 && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/60">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                  Live Submission Feed
                </div>
                <div className="space-y-1.5">
                  {submittedHistory.slice(0, 3).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 font-mono bg-white dark:bg-gray-800/80 p-2 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <span className="text-brand-600 dark:text-brand-400">❯</span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Installation */}
      <InstallationSection
        componentName="PromptBox"
        slug="prompt-box"
        files={[
          {
            filename: "components/PromptBox.tsx",
            code: `"use client";

import React, { useRef, useState } from "react";

export interface PromptBoxProps {
  /** Called when the user submits (Enter or clicking Send) */
  onSubmit: (value: string) => void;
  /** Controlled value (optional — component manages its own state if omitted) */
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Disables input + send button, e.g. while a response is streaming */
  disabled?: boolean;
  className?: string;
}

export const PromptBox = ({
  onSubmit,
  value,
  onChange,
  placeholder = "Message...",
  disabled = false,
  className = "",
}: PromptBoxProps) => {
  const [internalValue, setInternalValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = (v: string) => {
    if (!isControlled) setInternalValue(v);
    onChange?.(v);
  };

  const handleSubmit = () => {
    const trimmed = currentValue.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    if (!isControlled) setInternalValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = \`\${Math.min(e.target.scrollHeight, 200)}px\`;
  };

  return (
    <div
      className={\`flex items-end gap-2 rounded-xl border border-gray-300 bg-white p-2 shadow-sm focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 dark:border-gray-700 dark:bg-gray-900 \${
        disabled ? "opacity-60" : ""
      } \${className}\`.trim()}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={currentValue}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="max-h-[200px] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-white"
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={disabled || !currentValue.trim()}
        aria-label="Send message"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 13V3M8 3L3 8M8 3L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
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
          Submit on Enter key, insert new lines using Shift + Enter.
        </p>
        <ComponentPreview
          code={`<PromptBox 
  placeholder="Send a prompt to the AI agent..."
  onSubmit={(val) => alert(\`Received: \${val}\`)}
/>`}
        >
          <div className="w-full max-w-lg">
            <PromptBox
              placeholder="Send a prompt to the AI agent..."
              onSubmit={(val) => alert(`Received: ${val}`)}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* SECTION: Multiline auto-resize */}
      <section id="multiline-input" className="scroll-mt-6 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Multiline auto-resize
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          As the user types longer multi-paragraph prompts, the container grows smoothly without awkward inner scrollbars.
        </p>
        <ComponentPreview
          code={`<PromptBox
  placeholder="Paste multi-line code or paragraphs here..."
  onSubmit={(val) => console.log(val)}
/>`}
        >
          <div className="w-full max-w-lg">
            <PromptBox
              placeholder="Paste multi-line code or paragraphs here..."
              onSubmit={(val) => alert(val)}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* SECTION: Custom placeholders */}
      <section id="custom-placeholders" className="scroll-mt-6 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Custom placeholders
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Easily customize placeholder text to match specific AI assistant personas and domain contexts.
        </p>
        <ComponentPreview
          code={`<PromptBox
  placeholder="e.g. 'Refactor this SQL query to use BigQuery partition pruning'"
  onSubmit={(val) => console.log(val)}
/>`}
        >
          <div className="w-full max-w-lg">
            <PromptBox
              placeholder="e.g. 'Refactor this SQL query to use BigQuery partition pruning'"
              onSubmit={(val) => alert(val)}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* SECTION: Disabled state */}
      <section id="disabled-state" className="scroll-mt-6 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Disabled state
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Disable the input when the AI agent is actively streaming or processing a turn.
        </p>
        <ComponentPreview
          code={`<PromptBox
  disabled
  placeholder="Agent is thinking, please wait..."
  onSubmit={() => {}}
/>`}
        >
          <div className="w-full max-w-lg opacity-75">
            <PromptBox
              disabled
              placeholder="Agent is thinking, please wait..."
              onSubmit={() => {}}
            />
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
                <td className="px-4 py-3 font-mono font-medium text-brand-600 dark:text-brand-400">onSubmit</td>
                <td className="px-4 py-3 font-mono text-gray-500">(value: string) =&gt; void</td>
                <td className="px-4 py-3 text-gray-400">required</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback fired when the user presses Enter or clicks Send.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono font-medium text-brand-600 dark:text-brand-400">placeholder</td>
                <td className="px-4 py-3 font-mono text-gray-500">string</td>
                <td className="px-4 py-3 font-mono text-gray-400">&ldquo;Send a message...&rdquo;</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Placeholder label displayed when textarea is empty.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono font-medium text-brand-600 dark:text-brand-400">disabled</td>
                <td className="px-4 py-3 font-mono text-gray-500">boolean</td>
                <td className="px-4 py-3 font-mono text-gray-400">false</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disables input and send button.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono font-medium text-brand-600 dark:text-brand-400">className</td>
                <td className="px-4 py-3 font-mono text-gray-500">string</td>
                <td className="px-4 py-3 font-mono text-gray-400">undefined</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Additional Tailwind or custom CSS classes.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer Navigation */}
      <div className="mt-16 flex items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-800">
        <Link
          href="/components/approval-card"
          className="group flex flex-col gap-1 text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
        >
          <span className="text-xs text-gray-400">Previous</span>
          <span className="flex items-center gap-1 text-base font-semibold text-gray-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
            ← ApprovalCard
          </span>
        </Link>

        <Link
          href="/components/thinking"
          className="group flex flex-col items-end gap-1 text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
        >
          <span className="text-xs text-gray-400">Next</span>
          <span className="flex items-center gap-1 text-base font-semibold text-gray-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
            Thinking →
          </span>
        </Link>
      </div>
    </DocLayout>
  );
}

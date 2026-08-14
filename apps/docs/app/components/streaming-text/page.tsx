"use client";

import React, { useState, useEffect } from "react";
import { DocLayout } from "../DocLayout";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { TOCItem } from "../DocTOC";
import { StreamingText } from "@inaicode/react";
import { Play } from "lucide-react";

const TOC: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "custom-cursor", title: "Custom cursor" },
  { id: "props-reference", title: "Props reference" },
];

export default function StreamingTextPage() {
  const fullText = "AI Kit provides lightweight, beautifully animated React components tailored for LLM chat and agentic apps.";
  const [displayedText, setDisplayedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const startStream = () => {
    setDisplayedText("");
    setIsStreaming(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index += 2;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 30);
  };

  return (
    <DocLayout
      breadcrumbSection="Conversation"
      breadcrumbPage="StreamingText"
      currentActive="StreamingText"
      tocItems={TOC}
    >
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          StreamingText
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Token-by-token text reveal effect with pulsing cursor for streaming LLM responses and agent outputs.
        </p>
      </div>

      <div className="mt-6">
        <ComponentPreview
          code={`<div className="space-y-4">
  <button onClick={startStream} className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs text-white">
    Simulate Stream
  </button>
  <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm">
    <StreamingText text={displayedText} isStreaming={isStreaming} />
  </div>
</div>`}
        >
          <div className="w-full max-w-lg space-y-4">
            <button
              onClick={startStream}
              disabled={isStreaming}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-brand-700 disabled:opacity-50 transition-all"
            >
              <Play className="h-3 w-3" />
              <span>{isStreaming ? "Streaming..." : "Simulate LLM Stream"}</span>
            </button>

            <div className="min-h-[80px] p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/60 text-sm">
              <StreamingText
                text={displayedText || "Click 'Simulate LLM Stream' to see token reveal..."}
                isStreaming={isStreaming}
              />
            </div>
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Installation */}
      <InstallationSection
        componentName="StreamingText"
        slug="streaming-text"
        files={[
          {
            filename: "components/StreamingText.tsx",
            code: `"use client";

import React from "react";

export interface StreamingTextProps {
  /** The text content to display or stream */
  text: string;
  /** Whether the stream is actively generating */
  isStreaming?: boolean;
  /** Custom cursor character, defaults to ▊ */
  cursor?: string;
  className?: string;
}

export const StreamingText = ({
  text,
  isStreaming = false,
  cursor = "▊",
  className = "",
}: StreamingTextProps) => {
  return (
    <span className={\`inline leading-relaxed whitespace-pre-wrap \${className}\`.trim()}>
      {text}
      {isStreaming && (
        <span
          className="inline-block ml-0.5 text-violet-600 dark:text-violet-400 animate-pulse font-mono select-none"
          aria-hidden="true"
        >
          {cursor}
        </span>
      )}
    </span>
  );
};`,
          },
        ]}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Custom cursor */}
      <section id="custom-cursor" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Custom cursor
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Customize cursor glyphs such as vertical pipes <code>|</code>, blocks <code>■</code>, or underscores <code>_</code>.
        </p>
        <ComponentPreview
          code={`<StreamingText text="Generating answer..." isStreaming cursor="|" />`}
        >
          <div className="p-4 text-sm font-mono">
            <StreamingText text="Generating answer with custom cursor..." isStreaming cursor="|" />
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
                <td className="px-4 py-3 text-brand-600 font-bold">text</td>
                <td className="px-4 py-3 text-purple-600">string</td>
                <td className="px-4 py-3 text-gray-400">—</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Streamed text to display</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-brand-600 font-bold">isStreaming</td>
                <td className="px-4 py-3 text-purple-600">boolean</td>
                <td className="px-4 py-3 text-gray-400">false</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">When true, displays the animated cursor</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-brand-600 font-bold">cursor</td>
                <td className="px-4 py-3 text-purple-600">string</td>
                <td className="px-4 py-3 text-gray-400">&quot;▊&quot;</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Cursor character symbol</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

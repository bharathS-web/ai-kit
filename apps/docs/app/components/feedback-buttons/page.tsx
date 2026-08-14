"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { FeedbackButtons } from "@inaicode/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "reason-tags", title: "Reason popup & hallucination tags" },
  { id: "props-reference", title: "Props reference" },
];

export default function FeedbackButtonsPage() {
  const [feedbackLog, setFeedbackLog] = useState<string | null>(null);

  return (
    <DocLayout
      breadcrumbSection="Feedback & Evaluation"
      breadcrumbPage="FeedbackButtons"
      currentActive="FeedbackButtons"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            FeedbackButtons
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Thumbs up/down feedback buttons with optional popover for tagging hallucination reasons, code errors, and custom comments.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/tabs-panel"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/rating-stars"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="FeedbackButtons example"
          code={`<FeedbackButtons
  onThumbsUp={() => console.log("Upvoted")}
  onThumbsDown={(reason, tags) => console.log(reason, tags)}
/>`}
        >
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Was this AI response helpful?
              </span>
              <FeedbackButtons
                onThumbsUp={() => setFeedbackLog("Positive feedback submitted (+1)")}
                onThumbsDown={(reason, tags) =>
                  setFeedbackLog(`Negative feedback: ${tags?.join(", ")} | "${reason || "No comment"}"`)
                }
              />
            </div>

            {feedbackLog && (
              <div className="rounded-xl bg-purple-50 p-2.5 text-xs font-mono text-brand-700 dark:bg-purple-950/60 dark:text-purple-300">
                {feedbackLog}
              </div>
            )}
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="FeedbackButtons"
        slug="feedback-buttons"
        codeSnippet={`import { FeedbackButtons } from "@inaicode/react";

<FeedbackButtons
  onThumbsUp={() => logVote("up")}
  onThumbsDown={(reason, tags) => logVote("down", { reason, tags })}
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Clicking thumbs up gives instant positive feedback; clicking thumbs down prompts the user with detailed reasons.
        </p>
        <ComponentPreview
          code={`<FeedbackButtons
  onThumbsUp={() => alert("Helpful response logged!")}
  onThumbsDown={(reason) => alert(\`Unhelpful: \${reason}\`)}
/>`}
        >
          <div className="flex items-center justify-center gap-3 py-4">
            <span className="text-xs text-gray-700 dark:text-gray-300">Rate answer:</span>
            <FeedbackButtons
              onThumbsUp={() => alert("Helpful response logged!")}
              onThumbsDown={(reason) => alert(`Unhelpful: ${reason}`)}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Reason Tags */}
      <section id="reason-tags" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Reason popup & hallucination tags
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Provides quick selectable tags like &quot;Hallucination&quot;, &quot;Code error&quot;, or &quot;Too verbose&quot; to improve RLHF dataset curation.
        </p>
        <ComponentPreview
          code={`<FeedbackButtons
  presetTags={[
    "Hallucination",
    "Didn't follow prompt",
    "Security vulnerability",
    "Slow execution"
  ]}
/>`}
        >
          <div className="flex items-center justify-center py-4">
            <FeedbackButtons
              presetTags={[
                "Hallucination",
                "Didn't follow prompt",
                "Security vulnerability",
                "Slow execution",
              ]}
            />
          </div>
        </ComponentPreview>
      </section>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Props Reference */}
      <section id="props-reference" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Props Reference
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 font-mono">
              <tr>
                <th className="p-3">Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <td className="p-3 font-mono text-brand-600">onThumbsUp</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Callback when clicking thumbs up.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onThumbsDown</td>
                <td className="p-3 font-mono">(reason?: string, tags?: string[]) =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Callback when clicking thumbs down or submitting reason.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">allowReasonPopup</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">true</td>
                <td className="p-3">Shows popup reason dialog when clicking thumbs down.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">presetTags</td>
                <td className="p-3 font-mono">string[]</td>
                <td className="p-3 font-mono">[&quot;Factually incorrect&quot;, ...]</td>
                <td className="p-3">Quick tag pills in the feedback dialog.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { RatingStars } from "@inaicode/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "size-variants", title: "Size variants" },
  { id: "props-reference", title: "Props reference" },
];

export default function RatingStarsPage() {
  const [rating, setRating] = useState(4);

  return (
    <DocLayout
      breadcrumbSection="Feedback & Evaluation"
      breadcrumbPage="RatingStars"
      currentActive="RatingStars"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            RatingStars
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Interactive star rating evaluation component for LLM response scoring and RLHF dataset gathering.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/feedback-buttons"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/api-key-input"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="RatingStars example"
          code={`<RatingStars
  rating={rating}
  showValueBadge={true}
  onChange={(val) => setRating(val)}
/>`}
        >
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <RatingStars
              rating={rating}
              size="lg"
              showValueBadge={true}
              onChange={(val) => setRating(val)}
            />
            <p className="text-xs text-gray-500 font-mono">
              Current score: <strong className="text-brand-600">{rating} / 5 stars</strong>
            </p>
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="RatingStars"
        slug="rating-stars"
        codeSnippet={`import { RatingStars } from "@inaicode/react";

<RatingStars
  rating={4}
  onChange={(newRating) => logScore(newRating)}
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Hover to preview rating and click to commit a quality score.
        </p>
        <ComponentPreview
          code={`<RatingStars
  rating={rating}
  size="md"
  onChange={(r) => setRating(r)}
/>`}
        >
          <div className="flex items-center justify-center py-4">
            <RatingStars
              rating={rating}
              size="md"
              onChange={(r) => setRating(r)}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Size Variants */}
      <section id="size-variants" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Size variants
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Available in small (14px), medium (20px), and large (24px) star sizes.
        </p>
        <ComponentPreview
          code={`<div className="flex flex-col gap-4">
  <RatingStars rating={5} size="sm" readOnly />
  <RatingStars rating={4} size="md" readOnly />
  <RatingStars rating={3} size="lg" readOnly />
</div>`}
        >
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <RatingStars rating={5} size="sm" readOnly />
            <RatingStars rating={4} size="md" readOnly />
            <RatingStars rating={3} size="lg" readOnly />
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
                <td className="p-3 font-mono text-brand-600">rating</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">0</td>
                <td className="p-3">Active rating count (0 to maxStars).</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">maxStars</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">5</td>
                <td className="p-3">Total number of star icons.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onChange</td>
                <td className="p-3 font-mono">(rating: number) =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Callback when clicking a star rating.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">readOnly</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Disables hover and click interactions.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">size</td>
                <td className="p-3 font-mono">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="p-3 font-mono">&quot;md&quot;</td>
                <td className="p-3">Icon dimensions.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { AudioPlayer } from "@ai-kit/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "playback-speeds", title: "Playback speeds" },
  { id: "props-reference", title: "Props reference" },
];

export default function AudioPlayerPage() {
  return (
    <DocLayout
      breadcrumbSection="Media & Multimodal"
      breadcrumbPage="AudioPlayer"
      currentActive="AudioPlayer"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            AudioPlayer
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            AI text-to-speech audio player featuring dynamic equalizer waveforms, scrubber time display, and playback speed toggles (1x, 1.25x, 1.5x, 2x).
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/image-upload-preview"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/tooltip"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="AudioPlayer example"
          code={`<AudioPlayer
  title="Gemini 2.5 Pro TTS Output"
  duration={28}
  playbackRate={1}
/>`}
        >
          <div className="w-full max-w-md py-4">
            <AudioPlayer
              title="Gemini 2.5 Pro TTS Output"
              duration={28}
            />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="AudioPlayer"
        slug="audio-player"
        codeSnippet={`import { AudioPlayer } from "@ai-kit/react";

<AudioPlayer
  title="Agent Voice Output"
  duration={45}
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click the play button to activate the simulated live equalizer frequency bars and time counters.
        </p>
        <ComponentPreview
          code={`<AudioPlayer title="OpenAI TTS HD" duration={42} />`}
        >
          <div className="w-full max-w-md py-4">
            <AudioPlayer title="OpenAI TTS HD" duration={42} />
          </div>
        </ComponentPreview>
      </section>

      {/* Playback Speeds */}
      <section id="playback-speeds" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Playback speeds
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click the multiplier badge on the right to toggle between 1x, 1.25x, 1.5x, and 2x speeds.
        </p>
        <ComponentPreview
          code={`<AudioPlayer title="Voice Response" duration={18} playbackRate={1.5} />`}
        >
          <div className="w-full max-w-md py-4">
            <AudioPlayer title="Voice Response" duration={18} playbackRate={1.5} />
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
                <td className="p-3 font-mono text-brand-600">title</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">&quot;AI Voice Output&quot;</td>
                <td className="p-3">Track name or speech descriptor.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">duration</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">32</td>
                <td className="p-3">Total audio duration in seconds.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">isPlaying</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Controlled playback status.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">playbackRate</td>
                <td className="p-3 font-mono">1 | 1.25 | 1.5 | 2</td>
                <td className="p-3 font-mono">1</td>
                <td className="p-3">Audio speed multiplier.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onPlayPause</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Callback when clicking play/pause button.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

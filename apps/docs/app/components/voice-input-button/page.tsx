"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { VoiceInputButton } from "@inaicode/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "size-variants", title: "Size variants" },
  { id: "props-reference", title: "Props reference" },
];

export default function VoiceInputButtonPage() {
  const [state, setState] = useState<"idle" | "listening" | "processing" | "error">("idle");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (state === "listening") {
      timer = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [state]);

  const handleStart = () => {
    setState("listening");
  };

  const handleStop = () => {
    setState("processing");
    setTimeout(() => {
      setState("idle");
    }, 1800);
  };

  return (
    <DocLayout
      breadcrumbSection="Input & Controls"
      breadcrumbPage="VoiceInputButton"
      currentActive="VoiceInputButton"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            VoiceInputButton
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Microphone toggle button featuring animated audio waveform pulses, recording duration timers, and processing states.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/suggested-prompts"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/slash-command-menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="VoiceInputButton example"
          code={`<VoiceInputButton
  state={state}
  durationSeconds={seconds}
  onStart={() => startRecording()}
  onStop={() => stopRecording()}
/>`}
        >
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <VoiceInputButton
              state={state}
              durationSeconds={seconds}
              onStart={handleStart}
              onStop={handleStop}
              size="lg"
            />
            <p className="text-xs text-gray-500 font-mono">
              Status: <strong className="text-brand-600 dark:text-brand-400">{state}</strong>
            </p>
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="VoiceInputButton"
        slug="voice-input-button"
        codeSnippet={`import { VoiceInputButton } from "@inaicode/react";

<VoiceInputButton
  state="idle"
  onStart={() => startSpeechRecognition()}
  onStop={() => stopSpeechRecognition()}
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click the microphone button to test recording state with pulsing animated wave rings and countdown duration.
        </p>
        <ComponentPreview
          code={`<VoiceInputButton
  state={state}
  onStart={() => setState("listening")}
  onStop={() => setState("idle")}
/>`}
        >
          <div className="flex items-center justify-center py-4">
            <VoiceInputButton
              state={state}
              durationSeconds={seconds}
              onStart={handleStart}
              onStop={handleStop}
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
          Available in small (32px), medium (40px), and large (48px) sizes to fit header bars or standalone chat docks.
        </p>
        <ComponentPreview
          code={`<div className="flex items-center gap-6">
  <VoiceInputButton size="sm" />
  <VoiceInputButton size="md" />
  <VoiceInputButton size="lg" />
</div>`}
        >
          <div className="flex items-center justify-center gap-6 py-4">
            <VoiceInputButton size="sm" />
            <VoiceInputButton size="md" />
            <VoiceInputButton size="lg" />
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
                <td className="p-3 font-mono text-brand-600">state</td>
                <td className="p-3 font-mono">&quot;idle&quot; | &quot;listening&quot; | &quot;processing&quot; | &quot;error&quot;</td>
                <td className="p-3 font-mono">&quot;idle&quot;</td>
                <td className="p-3">Current voice recording engine state.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onStart</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Callback when user clicks to start recording.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onStop</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Callback when user clicks to stop recording.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">durationSeconds</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Live recording duration in seconds.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">size</td>
                <td className="p-3 font-mono">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="p-3 font-mono">&quot;md&quot;</td>
                <td className="p-3">Dimensions of button and icons.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

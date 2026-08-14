"use client";

import React, { useState } from "react";
import { DocLayout } from "../DocLayout";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { TOCItem } from "../DocTOC";
import { ModelSelector } from "@inaicode/react";

const TOC: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "props-reference", title: "Props reference" },
];

const MODELS = [
  { id: "claude-3-7-sonnet", name: "Claude 3.7 Sonnet", badge: "Thinking", description: "Hybrid reasoning model" },
  { id: "gpt-4o", name: "GPT-4o", badge: "Fast", description: "Multimodal flagship" },
  { id: "gemini-2-flash", name: "Gemini 2.0 Flash", badge: "Fast", description: "Low latency real-time" },
  { id: "deepseek-r1", name: "DeepSeek R1", badge: "Reasoning", description: "Open reasoning model" },
];

export default function ModelSelectorPage() {
  const [selectedModel, setSelectedModel] = useState("claude-3-7-sonnet");

  return (
    <DocLayout
      breadcrumbSection="Input & Controls"
      breadcrumbPage="ModelSelector"
      currentActive="ModelSelector"
      tocItems={TOC}
    >
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          ModelSelector
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Clean dropdown for switching between LLM providers and models, with support for badges, descriptions, and active states.
        </p>
      </div>

      <div className="mt-6">
        <ComponentPreview
          code={`const [model, setModel] = useState("claude-3-7-sonnet");

<ModelSelector
  models={[
    { id: "claude-3-7-sonnet", name: "Claude 3.7 Sonnet", badge: "Thinking" },
    { id: "gpt-4o", name: "GPT-4o", badge: "Fast" },
    { id: "gemini-2-flash", name: "Gemini 2.0 Flash" },
  ]}
  value={model}
  onChange={setModel}
/>`}
        >
          <div className="p-4 flex flex-col items-center gap-3">
            <ModelSelector
              models={MODELS}
              value={selectedModel}
              onChange={setSelectedModel}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Selected model ID: <code className="font-mono font-semibold text-brand-600">{selectedModel}</code>
            </p>
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Installation */}
      <InstallationSection
        componentName="ModelSelector"
        slug="model-selector"
        files={[
          {
            filename: "components/ModelSelector.tsx",
            code: `"use client";

import React, { useState, useRef, useEffect } from "react";

export interface AIModel {
  id: string;
  name: string;
  provider?: string;
  badge?: string;
  description?: string;
}

export interface ModelSelectorProps {
  models: AIModel[];
  value: string;
  onChange: (modelId: string) => void;
  disabled?: boolean;
  className?: string;
}

export const ModelSelector = ({
  models,
  value,
  onChange,
  disabled = false,
  className = "",
}: ModelSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedModel = models.find((m) => m.id === value) || models[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={\`relative inline-block text-xs \${className}\`.trim()}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-800 shadow-xs hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 transition-all"
      >
        <span className="flex h-2 w-2 rounded-full bg-violet-600" />
        <span className="font-semibold">{selectedModel?.name || "Select Model"}</span>
        {selectedModel?.badge && (
          <span className="rounded bg-violet-50 px-1.5 py-0.5 text-[10px] font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
            {selectedModel.badge}
          </span>
        )}
        <svg
          className={\`h-4 w-4 text-gray-400 transition-transform \${isOpen ? "rotate-180" : ""}\`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 z-50 w-64 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-gray-800 dark:bg-gray-900 animate-in fade-in zoom-in-95 duration-100">
          <div className="space-y-1">
            {models.map((model) => {
              const isSelected = model.id === value;
              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => {
                    onChange(model.id);
                    setIsOpen(false);
                  }}
                  className={\`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-left transition-colors \${
                    isSelected
                      ? "bg-violet-50 text-violet-900 dark:bg-violet-950/60 dark:text-violet-200 font-semibold"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }\`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span>{model.name}</span>
                      {model.badge && (
                        <span className="rounded bg-violet-100 px-1.5 py-0.2 text-[9px] font-bold text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                          {model.badge}
                        </span>
                      )}
                    </div>
                    {model.description && (
                      <div className="text-[11px] text-gray-400 font-normal">
                        {model.description}
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <svg className="h-4 w-4 text-violet-600 dark:text-violet-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};`,
          },
        ]}
      />

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
                <td className="px-4 py-3 text-brand-600 font-bold">models</td>
                <td className="px-4 py-3 text-purple-600">AIModel[]</td>
                <td className="px-4 py-3 text-gray-400">—</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Array of selectable model items</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-brand-600 font-bold">value</td>
                <td className="px-4 py-3 text-purple-600">string</td>
                <td className="px-4 py-3 text-gray-400">—</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">ID of the currently selected model</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-brand-600 font-bold">onChange</td>
                <td className="px-4 py-3 text-purple-600">(modelId: string) =&gt; void</td>
                <td className="px-4 py-3 text-gray-400">—</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Callback fired when a model is picked</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

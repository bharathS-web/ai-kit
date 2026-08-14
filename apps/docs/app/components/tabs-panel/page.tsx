"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, FileCode, Terminal, Sparkles } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { TabsPanel, TabItem } from "@inaicode/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "underlined-variant", title: "Underlined variant" },
  { id: "props-reference", title: "Props reference" },
];

export default function TabsPanelPage() {
  const [activeTab, setActiveTab] = useState("file1");
  const [tabs, setTabs] = useState<TabItem[]>([
    {
      id: "file1",
      label: "agent_executor.ts",
      icon: <FileCode className="h-3.5 w-3.5 text-blue-500" />,
      closable: true,
    },
    {
      id: "file2",
      label: "schema.sql",
      icon: <Terminal className="h-3.5 w-3.5 text-brand-500" />,
      closable: true,
      badge: "Modified",
    },
    {
      id: "file3",
      label: "README.md",
      icon: <Sparkles className="h-3.5 w-3.5 text-amber-500" />,
      closable: false,
    },
  ]);

  const handleClose = (id: string) => {
    setTabs(tabs.filter((t) => t.id !== id));
    if (activeTab === id && tabs.length > 1) {
      setActiveTab(tabs[0].id);
    }
  };

  const handleAdd = () => {
    const newId = `file-${Date.now()}`;
    setTabs([
      ...tabs,
      {
        id: newId,
        label: `new_script_${tabs.length + 1}.ts`,
        closable: true,
      },
    ]);
    setActiveTab(newId);
  };

  return (
    <DocLayout
      breadcrumbSection="Artifacts & Canvas"
      breadcrumbPage="TabsPanel"
      currentActive="TabsPanel"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            TabsPanel
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Multi-file tab switcher with close triggers, badges, icon slots, and tab addition support for IDE and canvas interfaces.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/artifact-panel"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/feedback-buttons"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="TabsPanel example"
          code={`<TabsPanel
  tabs={tabs}
  activeTab={activeTab}
  onChange={(id) => setActiveTab(id)}
  onCloseTab={(id) => handleClose(id)}
  onAddTab={() => handleAdd()}
/>`}
        >
          <div className="w-full max-w-2xl py-4 space-y-3">
            <TabsPanel
              tabs={tabs}
              activeTab={activeTab}
              onChange={(id) => setActiveTab(id)}
              onCloseTab={handleClose}
              onAddTab={handleAdd}
            />

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50 text-xs font-mono text-gray-700 dark:text-gray-300">
              Active tab content for: <strong>{activeTab}</strong>
            </div>
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="TabsPanel"
        slug="tabs-panel"
        codeSnippet={`import { TabsPanel } from "@inaicode/react";

<TabsPanel
  tabs={[
    { id: "1", label: "index.ts" },
    { id: "2", label: "styles.css" }
  ]}
  activeTab="1"
  onChange={(id) => setTab(id)}
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enclosed tab switcher for switching between active files and opening new scratch documents.
        </p>
        <ComponentPreview
          code={`<TabsPanel
  tabs={tabs}
  activeTab={activeTab}
  onChange={(id) => setActiveTab(id)}
/>`}
        >
          <div className="w-full max-w-xl py-4">
            <TabsPanel
              tabs={tabs}
              activeTab={activeTab}
              onChange={(id) => setActiveTab(id)}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Underlined Variant */}
      <section id="underlined-variant" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Underlined variant
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Minimalist underlined navigation tabs for page sections and configuration panels.
        </p>
        <ComponentPreview
          code={`<TabsPanel
  variant="underlined"
  tabs={tabs}
  activeTab={activeTab}
  onChange={(id) => setActiveTab(id)}
/>`}
        >
          <div className="w-full max-w-2xl py-4">
            <TabsPanel
              variant="underlined"
              tabs={tabs}
              activeTab={activeTab}
              onChange={(id) => setActiveTab(id)}
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
                <td className="p-3 font-mono text-brand-600">tabs</td>
                <td className="p-3 font-mono">TabItem[]</td>
                <td className="p-3 font-mono">[]</td>
                <td className="p-3">Array of tab items with id, label, icon, closable, and badge.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">activeTab</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">ID of currently active tab.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onChange</td>
                <td className="p-3 font-mono">(id: string) =&gt; void</td>
                <td className="p-3 font-mono">required</td>
                <td className="p-3">Callback when clicking a tab.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onCloseTab</td>
                <td className="p-3 font-mono">(id: string) =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Callback when clicking close &apos;x&apos; on a closable tab.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onAddTab</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Callback when clicking + button.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">variant</td>
                <td className="p-3 font-mono">&quot;enclosed&quot; | &quot;underlined&quot;</td>
                <td className="p-3 font-mono">&quot;enclosed&quot;</td>
                <td className="p-3">Visual style presentation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

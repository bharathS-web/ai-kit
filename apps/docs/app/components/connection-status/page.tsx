"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { ConnectionStatus } from "@inaicode/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "interactive-demo", title: "Interactive state switcher" },
  { id: "props-reference", title: "Props reference" },
];

export default function ConnectionStatusPage() {
  const [currentStatus, setCurrentStatus] = useState<
    "connected" | "connecting" | "reconnecting" | "offline" | "error"
  >("connected");

  return (
    <DocLayout
      breadcrumbSection="Status & Telemetry"
      breadcrumbPage="ConnectionStatus"
      currentActive="ConnectionStatus"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            ConnectionStatus
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Real-time SSE / WebSocket streaming connection status indicator with ping latency telemetry and reconnect triggers.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/token-usage-bar"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/diff-view"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="ConnectionStatus example"
          code={`<div className="flex flex-wrap items-center gap-4">
  <ConnectionStatus status="connected" latencyMs={24} />
  <ConnectionStatus status="reconnecting" />
  <ConnectionStatus status="offline" onReconnect={() => alert("Reconnecting...")} />
</div>`}
        >
          <div className="flex flex-wrap items-center justify-center gap-4 py-4">
            <ConnectionStatus status="connected" latencyMs={24} />
            <ConnectionStatus status="reconnecting" />
            <ConnectionStatus
              status="offline"
              onReconnect={() => alert("Reconnecting...")}
            />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="ConnectionStatus"
        slug="connection-status"
        codeSnippet={`import { ConnectionStatus } from "@inaicode/react";

<ConnectionStatus
  status="connected"
  latencyMs={32}
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Displays real-time SSE stream status with ping latency in milliseconds and reconnect triggers.
        </p>
        <ComponentPreview
          code={`<ConnectionStatus
  status="connected"
  latencyMs={18}
/>`}
        >
          <div className="flex items-center justify-center py-4">
            <ConnectionStatus status="connected" latencyMs={18} />
          </div>
        </ComponentPreview>
      </section>

      {/* State Switcher */}
      <section id="interactive-demo" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive state switcher
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Switch between states to view connected, connecting, reconnecting, offline, and error modes.
        </p>
        <ComponentPreview
          code={`<ConnectionStatus
  status="${currentStatus}"
  latencyMs={${currentStatus === "connected" ? 18 : 0}}
  onReconnect={() => setCurrentStatus("connected")}
/>`}
        >
          <div className="flex flex-col items-center justify-center py-4 space-y-4">
            <ConnectionStatus
              status={currentStatus}
              latencyMs={currentStatus === "connected" ? 18 : undefined}
              onReconnect={() => setCurrentStatus("connected")}
            />

            <div className="flex flex-wrap gap-2">
              {(["connected", "connecting", "reconnecting", "offline", "error"] as const).map(
                (st) => (
                  <button
                    key={st}
                    onClick={() => setCurrentStatus(st)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono capitalize transition-all ${
                      currentStatus === st
                        ? "bg-brand-600 font-bold text-white shadow-2xs"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {st}
                  </button>
                )
              )}
            </div>
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
                <td className="p-3 font-mono text-brand-600">status</td>
                <td className="p-3 font-mono">&quot;connected&quot; | &quot;connecting&quot; | &quot;reconnecting&quot; | &quot;offline&quot; | &quot;error&quot;</td>
                <td className="p-3 font-mono">&quot;connected&quot;</td>
                <td className="p-3">Current network streaming status.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">latencyMs</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Ping roundtrip latency in milliseconds.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">showPing</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">true</td>
                <td className="p-3">Displays latency value and activity icon.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onReconnect</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Callback when clicking reconnect button during offline states.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

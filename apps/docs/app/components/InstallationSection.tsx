"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import { WindowDots } from "./WindowDots";

interface FileItem {
  filename: string;
  code: string;
}

interface InstallationSectionProps {
  componentName: string;
  slug?: string;
  files?: FileItem[];
  codeSnippet?: string;
  cliCommand?: string;
}

export function InstallationSection({
  componentName,
  slug,
  files = [],
  codeSnippet,
  cliCommand,
}: InstallationSectionProps) {
  const [tab, setTab] = useState<"cli" | "manual">("cli");
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedFile, setCopiedFile] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [pm, setPm] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");

  const effectiveSlug =
    slug ||
    componentName
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();

  const pmCommands = {
    pnpm: cliCommand || `pnpm dlx @inaicode/cli add ${effectiveSlug}`,
    npm: cliCommand
      ? cliCommand.replace("pnpm dlx", "npx")
      : `npx @inaicode/cli add ${effectiveSlug}`,
    yarn: cliCommand
      ? cliCommand.replace("pnpm dlx", "yarn dlx")
      : `yarn dlx @inaicode/cli add ${effectiveSlug}`,
    bun: cliCommand
      ? cliCommand.replace("pnpm dlx", "bunx")
      : `bunx @inaicode/cli add ${effectiveSlug}`,
  };

  const effectiveFiles: FileItem[] =
    files && files.length > 0
      ? files
      : [
          {
            filename: `${componentName}.tsx`,
            code:
              codeSnippet ||
              `import { ${componentName} } from "@inaicode/react";\n\nexport function MyComponent() {\n  return <${componentName} />;\n}`,
          },
        ];

  const activeFile = effectiveFiles[activeFileIndex] || effectiveFiles[0];
  const activeCode = activeFile ? activeFile.code : "";

  const handleCopyFile = () => {
    navigator.clipboard.writeText(activeCode);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(pmCommands[pm]);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <section id="installation" className="scroll-mt-8 space-y-6 w-full min-w-0">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Installation
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          You can add this {componentName} component using our CLI or manually:
        </p>
      </div>

      {/* Tabs Switcher: CLI first, then Manual */}
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setTab("cli")}
          className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors -mb-[2px] cursor-pointer ${
            tab === "cli"
              ? "border-brand-600 font-semibold text-brand-600 dark:border-brand-400 dark:text-brand-400"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-200"
          }`}
        >
          CLI
        </button>
        <button
          onClick={() => setTab("manual")}
          className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors -mb-[2px] cursor-pointer ${
            tab === "manual"
              ? "border-brand-600 font-semibold text-brand-600 dark:border-brand-400 dark:text-brand-400"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-200"
          }`}
        >
          Manual
        </button>
      </div>

      {/* CLI TAB: Integrated Terminal Code Window */}
      {tab === "cli" && (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#0E131F] shadow-xs">
            {/* Terminal Header with Traffic Lights & PM Switcher */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/90 px-4 py-2.5 dark:border-gray-800 dark:bg-[#111827]/80">
              <div className="flex items-center gap-3">
                <WindowDots />
                <div className="flex items-center gap-1">
                  {(["pnpm", "npm", "yarn", "bun"] as const).map((item) => (
                    <button
                      key={item}
                      onClick={() => setPm(item)}
                      className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                        pm === item
                          ? "bg-purple-50 text-brand-700 border border-purple-200 font-semibold dark:bg-gray-800 dark:text-purple-300 dark:border-gray-700"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCopyCli}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white transition-colors cursor-pointer"
                title="Copy Command"
              >
                {copiedCli ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-4 font-mono text-xs flex items-center gap-2.5 text-gray-800 dark:text-gray-200 bg-white dark:bg-[#0B0F19]">
              <span className="select-none text-brand-600 dark:text-brand-400 font-bold">$</span>
              <span className="select-all">{pmCommands[pm]}</span>
            </div>
          </div>
        </div>
      )}

      {/* MANUAL TAB: Directly show the code window only */}
      {tab === "manual" && (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#0E131F] shadow-xs">
            {/* Box Header */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/90 px-4 py-2.5 dark:border-gray-800 dark:bg-[#111827]/80">
              <div className="flex items-center gap-3">
                <WindowDots />
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {effectiveFiles.map((file, idx) => (
                    <button
                      key={file.filename}
                      onClick={() => setActiveFileIndex(idx)}
                      className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                        activeFileIndex === idx
                          ? "bg-purple-50 text-brand-700 border border-purple-200 font-semibold dark:bg-gray-800 dark:text-purple-300 dark:border-gray-700"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
                      }`}
                    >
                      {file.filename}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCopyFile}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white transition-colors cursor-pointer"
              >
                {copiedFile ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Content */}
            <div
              className={`relative overflow-hidden transition-all duration-300 ${
                isExpanded ? "max-h-none" : "max-h-80"
              }`}
            >
              <div className="p-4">
                <CodeBlock
                  code={activeCode}
                  language="tsx"
                  showLineNumbers
                  className="bg-transparent border-0 rounded-none m-0"
                />
              </div>

              {!isExpanded && (
                <div className="absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0E131F] dark:via-[#0E131F]/80 pb-3">
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="rounded-xl border border-gray-200 bg-white/95 px-4 py-1.5 text-xs font-semibold text-gray-700 shadow-md hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800/90 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white transition-all backdrop-blur-xs cursor-pointer"
                  >
                    Expand Code ({activeCode.split("\n").length} lines)
                  </button>
                </div>
              )}
            </div>

            {isExpanded && (
              <div className="border-t border-gray-100 bg-gray-50/60 p-2 text-center dark:border-gray-800 dark:bg-[#111827]/50">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer"
                >
                  Collapse code
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

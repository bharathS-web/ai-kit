"use client";

import React, { useState } from "react";
import { DocLayout } from "../DocLayout";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { TOCItem } from "../DocTOC";
import { FileAttachment } from "@ai-kit/react";

const TOC: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "props-reference", title: "Props reference" },
];

export default function FileAttachmentPage() {
  const [files, setFiles] = useState([
    { id: 1, name: "schema_v2.sql", size: "4.2 KB", type: "code" as const },
    { id: 2, name: "architecture_diagram.png", size: "1.4 MB", type: "image" as const },
    { id: 3, name: "quarterly_finops_report.pdf", size: "320 KB", type: "pdf" as const },
  ]);

  const handleRemove = (id: number) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <DocLayout
      breadcrumbSection="Input & Controls"
      breadcrumbPage="FileAttachment"
      currentActive="FileAttachment"
      tocItems={TOC}
    >
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          FileAttachment
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Visual upload chip with file type icons, byte size indicator, truncate overflow, and remove button.
        </p>
      </div>

      <div className="mt-6">
        <ComponentPreview
          code={`<div className="flex flex-wrap gap-2">
  <FileAttachment
    fileName="schema_v2.sql"
    fileSize="4.2 KB"
    fileType="code"
    onRemove={() => {}}
  />
  <FileAttachment
    fileName="architecture_diagram.png"
    fileSize="1.4 MB"
    fileType="image"
    onRemove={() => {}}
  />
</div>`}
        >
          <div className="flex flex-wrap gap-2.5">
            {files.map((file) => (
              <FileAttachment
                key={file.id}
                fileName={file.name}
                fileSize={file.size}
                fileType={file.type}
                onRemove={() => handleRemove(file.id)}
              />
            ))}
            {files.length === 0 && (
              <button
                onClick={() =>
                  setFiles([
                    { id: 1, name: "schema_v2.sql", size: "4.2 KB", type: "code" },
                    { id: 2, name: "architecture.png", size: "1.4 MB", type: "image" },
                  ])
                }
                className="text-xs text-brand-600 hover:underline"
              >
                Reset attachments
              </button>
            )}
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Installation */}
      <InstallationSection
        componentName="FileAttachment"
        slug="file-attachment"
        files={[
          {
            filename: "components/FileAttachment.tsx",
            code: `"use client";

import React from "react";

export interface FileAttachmentProps {
  fileName: string;
  fileSize?: string;
  fileType?: "image" | "pdf" | "code" | "audio" | "document" | "generic";
  onRemove?: () => void;
  className?: string;
}

export const FileAttachment = ({
  fileName,
  fileSize,
  fileType = "generic",
  onRemove,
  className = "",
}: FileAttachmentProps) => {
  const typeIcons: Record<NonNullable<FileAttachmentProps["fileType"]>, React.ReactNode> = {
    image: (
      <svg className="h-4 w-4 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    ),
    pdf: (
      <svg className="h-4 w-4 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M10 12v6" />
        <path d="M10 15h4" />
      </svg>
    ),
    code: (
      <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    audio: (
      <svg className="h-4 w-4 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    ),
    document: (
      <svg className="h-4 w-4 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" x2="8" y1="13" y2="13" />
        <line x1="16" x2="8" y1="17" y2="17" />
      </svg>
    ),
    generic: (
      <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  };

  return (
    <div
      className={\`group inline-flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs shadow-xs dark:border-gray-800 dark:bg-gray-900 \${className}\`.trim()}
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60">
        {typeIcons[fileType]}
      </div>

      <div className="min-w-0 pr-1">
        <p className="truncate font-medium text-gray-900 dark:text-white max-w-[150px] sm:max-w-[200px]">
          {fileName}
        </p>
        {fileSize && (
          <p className="text-[10px] text-gray-400 dark:text-gray-500">{fileSize}</p>
        )}
      </div>

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove attachment"
          className="ml-1 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>
        </button>
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
                <td className="px-4 py-3 text-brand-600 font-bold">fileName</td>
                <td className="px-4 py-3 text-purple-600">string</td>
                <td className="px-4 py-3 text-gray-400">—</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">File title string (truncated if too long)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-brand-600 font-bold">fileType</td>
                <td className="px-4 py-3 text-purple-600">&quot;image&quot; | &quot;pdf&quot; | &quot;code&quot; | &quot;audio&quot; | &quot;document&quot; | &quot;generic&quot;</td>
                <td className="px-4 py-3 text-gray-400">&quot;generic&quot;</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Renders appropriate icon style</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

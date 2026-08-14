"use client";

import React, { useState } from "react";
import { Check, Copy, Columns2, AlignJustify, FileCode2 } from "lucide-react";

export interface DiffViewProps {
  oldCode: string;
  newCode: string;
  fileName?: string;
  viewMode?: "split" | "unified";
  allowCopy?: boolean;
  className?: string;
}

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  oldLineNumber?: number;
  newLineNumber?: number;
  content: string;
}

export function DiffView({
  oldCode,
  newCode,
  fileName,
  viewMode: initialViewMode = "unified",
  allowCopy = true,
  className = "",
}: DiffViewProps) {
  const [viewMode, setViewMode] = useState<"split" | "unified">(initialViewMode);
  const [copied, setCopied] = useState(false);

  const oldLines = oldCode.trim().split("\n");
  const newLines = newCode.trim().split("\n");

  // Simple clean diff alignment
  const diffLines: DiffLine[] = [];
  const maxLen = Math.max(oldLines.length, newLines.length);

  let oldIdx = 0;
  let newIdx = 0;

  while (oldIdx < oldLines.length || newIdx < newLines.length) {
    const oldL = oldLines[oldIdx];
    const newL = newLines[newIdx];

    if (oldL === newL) {
      diffLines.push({
        type: "unchanged",
        oldLineNumber: oldIdx + 1,
        newLineNumber: newIdx + 1,
        content: oldL || "",
      });
      oldIdx++;
      newIdx++;
    } else {
      if (oldIdx < oldLines.length) {
        diffLines.push({
          type: "removed",
          oldLineNumber: oldIdx + 1,
          content: oldL,
        });
        oldIdx++;
      }
      if (newIdx < newLines.length) {
        diffLines.push({
          type: "added",
          newLineNumber: newIdx + 1,
          content: newL,
        });
        newIdx++;
      }
    }
  }

  const additions = diffLines.filter((l) => l.type === "added").length;
  const deletions = diffLines.filter((l) => l.type === "removed").length;

  const handleCopyNew = () => {
    navigator.clipboard.writeText(newCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-200 bg-gray-950 text-gray-100 shadow-xl dark:border-gray-800 select-none ${className}`}
    >
      {/* Diff Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-gray-800 bg-gray-900/90 px-4 py-2.5 text-xs text-gray-400 gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#EC6A5E]" />
            <span className="h-3 w-3 rounded-full bg-[#F5BF4F]" />
            <span className="h-3 w-3 rounded-full bg-[#61C554]" />
          </div>

          <div className="flex items-center gap-2">
            <FileCode2 className="h-4 w-4 text-brand-400" />
            <span className="font-mono text-xs text-gray-200">
              {fileName || "file_diff.ts"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="text-emerald-400 font-bold">+{additions}</span>
            <span className="text-red-400 font-bold">-{deletions}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Split / Unified View Toggle */}
          <div className="flex items-center rounded-lg border border-gray-800 bg-gray-950 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("unified")}
              className={`flex h-6 w-6 items-center justify-center rounded-md transition-all ${
                viewMode === "unified"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              title="Unified View"
            >
              <AlignJustify className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`flex h-6 w-6 items-center justify-center rounded-md transition-all ${
                viewMode === "split"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              title="Split View"
            >
              <Columns2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {allowCopy && (
            <button
              onClick={handleCopyNew}
              className="flex items-center gap-1.5 rounded-lg border border-gray-700 bg-gray-800 px-2.5 py-1 text-xs font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy New</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Unified Diff View */}
      {viewMode === "unified" && (
        <div className="overflow-x-auto p-2 font-mono text-xs max-h-96">
          <table className="w-full border-collapse">
            <tbody>
              {diffLines.map((line, idx) => {
                const isAdd = line.type === "added";
                const isDel = line.type === "removed";

                return (
                  <tr
                    key={idx}
                    className={`leading-relaxed ${
                      isAdd
                        ? "bg-emerald-950/40 text-emerald-300"
                        : isDel
                        ? "bg-red-950/40 text-red-300"
                        : "text-gray-300"
                    }`}
                  >
                    <td className="w-10 pr-2 text-right select-none text-gray-600">
                      {line.oldLineNumber || ""}
                    </td>
                    <td className="w-10 pr-2 text-right select-none text-gray-600">
                      {line.newLineNumber || ""}
                    </td>
                    <td className="w-6 text-center select-none font-bold">
                      {isAdd ? "+" : isDel ? "-" : " "}
                    </td>
                    <td className="whitespace-pre pl-2 py-0.5">{line.content}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Split Diff View */}
      {viewMode === "split" && (
        <div className="grid grid-cols-2 divide-x divide-gray-800 overflow-x-auto p-2 font-mono text-xs max-h-96">
          {/* Old File Column */}
          <div className="space-y-0.5 pr-2">
            <div className="pb-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Original
            </div>
            {oldLines.map((line, idx) => (
              <div
                key={idx}
                className="flex items-start text-red-300 bg-red-950/20 px-1 py-0.5 rounded-xs"
              >
                <span className="w-6 select-none text-gray-600 text-right pr-2">
                  {idx + 1}
                </span>
                <span className="whitespace-pre overflow-x-auto">{line}</span>
              </div>
            ))}
          </div>

          {/* New File Column */}
          <div className="space-y-0.5 pl-2">
            <div className="pb-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Modified
            </div>
            {newLines.map((line, idx) => (
              <div
                key={idx}
                className="flex items-start text-emerald-300 bg-emerald-950/20 px-1 py-0.5 rounded-xs"
              >
                <span className="w-6 select-none text-gray-600 text-right pr-2">
                  {idx + 1}
                </span>
                <span className="whitespace-pre overflow-x-auto">{line}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

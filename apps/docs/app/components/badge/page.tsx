"use client";

import React from "react";
import { DocLayout } from "../DocLayout";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { TOCItem } from "../DocTOC";
import { Badge } from "@inaicode/react";
import { Sparkles, CheckCircle2 } from "lucide-react";

const TOC: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "props-reference", title: "Props reference" },
];

export default function BadgePage() {
  return (
    <DocLayout
      breadcrumbSection="Foundations"
      breadcrumbPage="Badge"
      currentActive="Badge"
      tocItems={TOC}
    >
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Badge
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Status indicator badge for AI model tiers, agent states, tool tags, and version pills.
        </p>
      </div>

      <div className="mt-6">
        <ComponentPreview
          code={`<div className="flex flex-wrap gap-2">
  <Badge variant="brand" dot>Claude 3.7</Badge>
  <Badge variant="success" dot>Tool Succeeded</Badge>
  <Badge variant="warning">Thinking</Badge>
  <Badge variant="error" dot>Failed</Badge>
  <Badge variant="outline">v1.0.0</Badge>
</div>`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand" dot>Claude 3.7</Badge>
            <Badge variant="success" dot>Tool Succeeded</Badge>
            <Badge variant="warning">Thinking</Badge>
            <Badge variant="error" dot>Failed</Badge>
            <Badge variant="default">Default</Badge>
            <Badge variant="outline">v1.0.0</Badge>
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Installation */}
      <InstallationSection
        componentName="Badge"
        slug="badge"
        files={[
          {
            filename: "components/Badge.tsx",
            code: `"use client";

import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "brand" | "success" | "warning" | "error" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
  brand:
    "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-800/60",
  success:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60",
  warning:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60",
  error:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800/60",
  outline:
    "bg-transparent text-gray-700 border-gray-300 dark:text-gray-300 dark:border-gray-700",
};

const dotColors: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-gray-400 dark:bg-gray-500",
  brand: "bg-violet-600 dark:bg-violet-400",
  success: "bg-emerald-600 dark:bg-emerald-400",
  warning: "bg-amber-600 dark:bg-amber-400",
  error: "bg-red-600 dark:bg-red-400",
  outline: "bg-gray-500",
};

const sizeStyles: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-[11px] gap-1 rounded-md",
  md: "px-2.5 py-1 text-xs gap-1.5 rounded-lg",
};

export const Badge = ({
  children,
  variant = "default",
  size = "sm",
  dot = false,
  icon,
  className = "",
  ...props
}: BadgeProps) => {
  return (
    <span
      className={\`inline-flex items-center font-medium border shadow-xs \${variantStyles[variant]} \${sizeStyles[size]} \${className}\`.trim()}
      {...props}
    >
      {dot && (
        <span
          className={\`h-1.5 w-1.5 shrink-0 rounded-full \${dotColors[variant]}\`}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
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
                <td className="px-4 py-3 text-brand-600 font-bold">variant</td>
                <td className="px-4 py-3 text-purple-600">&quot;default&quot; | &quot;brand&quot; | &quot;success&quot; | &quot;warning&quot; | &quot;error&quot; | &quot;outline&quot;</td>
                <td className="px-4 py-3 text-gray-400">&quot;default&quot;</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Badge surface and text color scheme</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-brand-600 font-bold">dot</td>
                <td className="px-4 py-3 text-purple-600">boolean</td>
                <td className="px-4 py-3 text-gray-400">false</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Renders a small status dot indicator</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

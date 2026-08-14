"use client";

import React from "react";
import { DocLayout } from "../DocLayout";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { TOCItem } from "../DocTOC";
import { Avatar } from "@inaicode/react";

const TOC: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "props-reference", title: "Props reference" },
];

export default function AvatarPage() {
  return (
    <DocLayout
      breadcrumbSection="Foundations"
      breadcrumbPage="Avatar"
      currentActive="Avatar"
      tocItems={TOC}
    >
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Avatar
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          User and AI agent avatar component with fallback initials, bot icons, and online/busy status indicators.
        </p>
      </div>

      <div className="mt-6">
        <ComponentPreview
          code={`<div className="flex flex-wrap items-center gap-4">
  <Avatar bot size="lg" status="online" />
  <Avatar name="Alex Rivera" size="lg" status="online" />
  <Avatar name="Sarah Connor" size="md" status="away" />
  <Avatar name="John Doe" size="sm" />
</div>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <Avatar bot size="lg" status="online" />
            <Avatar name="Alex Rivera" size="lg" status="online" />
            <Avatar name="Sarah Connor" size="md" status="away" />
            <Avatar name="John Doe" size="sm" />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* SECTION: Installation */}
      <InstallationSection
        componentName="Avatar"
        slug="avatar"
        files={[
          {
            filename: "components/Avatar.tsx",
            code: `"use client";

import React, { useState } from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "busy" | "offline" | "away";
  bot?: boolean;
}

const sizeStyles: Record<NonNullable<AvatarProps["size"]>, { box: string; text: string; status: string }> = {
  xs: { box: "h-6 w-6", text: "text-[10px]", status: "h-1.5 w-1.5" },
  sm: { box: "h-8 w-8", text: "text-xs", status: "h-2 w-2" },
  md: { box: "h-10 w-10", text: "text-sm", status: "h-2.5 w-2.5" },
  lg: { box: "h-12 w-12", text: "text-base", status: "h-3 w-3" },
  xl: { box: "h-16 w-16", text: "text-xl", status: "h-3.5 w-3.5" },
};

const statusColors: Record<NonNullable<AvatarProps["status"]>, string> = {
  online: "bg-emerald-500",
  busy: "bg-red-500",
  away: "bg-amber-500",
  offline: "bg-gray-400",
};

export const Avatar = ({
  src,
  alt = "",
  name,
  size = "md",
  status,
  bot = false,
  className = "",
  ...props
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const s = sizeStyles[size];

  const getInitials = (n?: string) => {
    if (!n) return bot ? "AI" : "?";
    return n
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className={\`relative inline-flex shrink-0 select-none \${s.box} \${className}\`.trim()}
      {...props}
    >
      <div
        className={\`flex h-full w-full items-center justify-center overflow-hidden rounded-full font-medium \${
          bot
            ? "bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-xs"
            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
        } \${s.text}\`}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || name || "Avatar"}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : bot ? (
          <svg className="h-3/5 w-3/5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </svg>
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {status && (
        <span
          className={\`absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-gray-900 \${s.status} \${statusColors[status]}\`}
        />
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
                <td className="px-4 py-3 text-brand-600 font-bold">bot</td>
                <td className="px-4 py-3 text-purple-600">boolean</td>
                <td className="px-4 py-3 text-gray-400">false</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Displays AI agent bot icon and gradient surface</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-brand-600 font-bold">status</td>
                <td className="px-4 py-3 text-purple-600">&quot;online&quot; | &quot;busy&quot; | &quot;away&quot; | &quot;offline&quot;</td>
                <td className="px-4 py-3 text-gray-400">—</td>
                <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-400">Status dot ring color</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { DocHeader } from "./DocHeader";
import { DocSidebar } from "./DocSidebar";
import { DocTOC, TOCItem } from "./DocTOC";

interface DocLayoutProps {
  breadcrumbSection?: string;
  breadcrumbPage: string;
  currentActive: string;
  tocItems?: TOCItem[];
  children: React.ReactNode;
}

export function DocLayout({
  breadcrumbSection = "Components",
  breadcrumbPage,
  currentActive,
  tocItems,
  children,
}: DocLayoutProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = document.getElementById("main-scroll-container");
    if (!container) return;

    const handleScroll = () => {
      const totalHeight = container.scrollHeight - container.clientHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (container.scrollTop / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 transition-colors">
      {/* 1. Static Top Header with Anchored Search Popover (Fixed at top) */}
      <DocHeader
        breadcrumbSection={breadcrumbSection}
        breadcrumbPage={breadcrumbPage}
      />

      {/* Top Reading Progress Bar */}
      <div className="relative h-[2px] w-full bg-gray-100 dark:bg-gray-800/40 shrink-0 z-10">
        <div
          className="h-full bg-gradient-to-r from-brand-600 via-purple-500 to-indigo-500 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Body Area (Height locked to remaining viewport) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Fixed & Independently scrollable) */}
        <DocSidebar currentActive={currentActive} />

        {/* Center Main Content: Even, minimal padding on both left and right */}
        <main
          id="main-scroll-container"
          className="min-w-0 flex-1 overflow-y-auto px-6 py-8 md:px-8"
        >
          <div className="w-full min-w-0">{children}</div>
        </main>

        {/* Right Sidebar TOC (Fixed & Independently scrollable) */}
        {tocItems && tocItems.length > 0 && <DocTOC items={tocItems} />}
      </div>
    </div>
  );
}

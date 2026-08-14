"use client";

import React, { useEffect, useState } from "react";
import { AlignLeft } from "lucide-react";

export interface TOCItem {
  id: string;
  title: string;
}

interface DocTOCProps {
  items?: TOCItem[];
}

export function DocTOC({ items = [] }: DocTOCProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    const scrollContainer = document.getElementById("main-scroll-container");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const containerRect = scrollContainer.getBoundingClientRect();

      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        const element = document.getElementById(item.id);
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const relativeTop = elementRect.top - containerRect.top;

          // If the element has scrolled into view near the top (e.g. within top 120px)
          if (relativeTop <= 120) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    const scrollContainer = document.getElementById("main-scroll-container");

    if (element && scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      // Accurately position the heading with a generous 28px breathing room below top bar
      const targetScroll =
        scrollContainer.scrollTop + (elementRect.top - containerRect.top) - 28;

      scrollContainer.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: "smooth",
      });

      setActiveId(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <aside className="h-full w-60 shrink-0 overflow-y-auto px-4 py-8 hidden xl:block select-none border-l border-gray-100 dark:border-gray-800/40">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        <AlignLeft className="h-3.5 w-3.5" />
        <span>On this page</span>
      </div>

      <div className="mt-4 border-l border-gray-200 dark:border-gray-800">
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`block py-1 text-xs transition-all ${
                  isActive
                    ? "-ml-[2px] border-l-2 border-brand-600 pl-3 font-semibold text-brand-600 dark:border-brand-400 dark:text-brand-300"
                    : "pl-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {item.title}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

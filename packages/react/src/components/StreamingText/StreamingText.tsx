"use client";

import React from "react";

export interface StreamingTextProps {
  /** The text content to display or stream */
  text: string;
  /** Whether the stream is actively generating */
  isStreaming?: boolean;
  /** Custom cursor character, defaults to ▊ */
  cursor?: string;
  className?: string;
}

export const StreamingText = ({
  text,
  isStreaming = false,
  cursor = "▊",
  className = "",
}: StreamingTextProps) => {
  return (
    <span className={`inline leading-relaxed whitespace-pre-wrap ${className}`.trim()}>
      {text}
      {isStreaming && (
        <span
          className="inline-block ml-0.5 text-violet-600 dark:text-violet-400 animate-pulse font-mono select-none"
          aria-hidden="true"
        >
          {cursor}
        </span>
      )}
    </span>
  );
};

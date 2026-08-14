"use client";

import React, { useState } from "react";
import { Avatar } from "../Avatar";

export interface MessageBubbleProps {
  role: "user" | "assistant" | "system";
  content: React.ReactNode;
  timestamp?: string;
  avatar?: React.ReactNode;
  name?: string;
  actions?: React.ReactNode;
  status?: "sending" | "sent" | "error";
  className?: string;
}

export const MessageBubble = ({
  role,
  content,
  timestamp,
  avatar,
  name,
  actions,
  status = "sent",
  className = "",
}: MessageBubbleProps) => {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";
  const isSystem = role === "system";

  const handleCopy = () => {
    if (typeof content === "string") {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isSystem) {
    return (
      <div className={`flex justify-center py-2 text-xs text-gray-500 dark:text-gray-400 ${className}`.trim()}>
        <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60">
          {content}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`group flex gap-3 max-w-2xl ${
        isUser ? "ml-auto flex-row-reverse" : "mr-auto flex-row"
      } ${className}`.trim()}
    >
      {/* Avatar Slot */}
      <div className="shrink-0 pt-0.5">
        {avatar || (
          <Avatar
            bot={!isUser}
            name={name || (isUser ? "User" : "AI Assistant")}
            size="sm"
          />
        )}
      </div>

      {/* Bubble Container */}
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        {/* Name / Header */}
        {(name || timestamp) && (
          <div className="mb-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 px-1">
            {name && <span className="font-semibold text-gray-700 dark:text-gray-300">{name}</span>}
            {timestamp && <span className="text-[11px]">{timestamp}</span>}
          </div>
        )}

        {/* Content Box */}
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? "bg-violet-600 text-white rounded-tr-xs shadow-xs"
              : "bg-gray-100 text-gray-900 dark:bg-gray-800/90 dark:text-gray-100 rounded-tl-xs border border-gray-200/60 dark:border-gray-700/60 shadow-xs"
          } ${status === "error" ? "border-red-500 bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200" : ""}`}
        >
          {content}
        </div>

        {/* Action Row / Footer */}
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity px-1">
          {typeof content === "string" && (
            <button
              onClick={handleCopy}
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              title="Copy message"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          )}
          {actions}
        </div>
      </div>
    </div>
  );
};

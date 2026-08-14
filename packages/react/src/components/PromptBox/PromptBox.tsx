"use client";

import React, { useRef, useState } from "react";

export interface PromptBoxProps {
  /** Called when the user submits (Enter or clicking Send) */
  onSubmit: (value: string) => void;
  /** Controlled value (optional — component manages its own state if omitted) */
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Disables input + send button, e.g. while a response is streaming */
  disabled?: boolean;
  className?: string;
}

export const PromptBox = ({
  onSubmit,
  value,
  onChange,
  placeholder = "Message...",
  disabled = false,
  className = "",
}: PromptBoxProps) => {
  const [internalValue, setInternalValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = (v: string) => {
    if (!isControlled) setInternalValue(v);
    onChange?.(v);
  };

  const handleSubmit = () => {
    const trimmed = currentValue.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    if (!isControlled) setInternalValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  return (
    <div
      className={`flex items-end gap-2 rounded-xl border border-gray-300 bg-white p-2 shadow-sm focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 ${
        disabled ? "opacity-60" : ""
      } ${className}`.trim()}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={currentValue}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="max-h-[200px] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={disabled || !currentValue.trim()}
        aria-label="Send message"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 13V3M8 3L3 8M8 3L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

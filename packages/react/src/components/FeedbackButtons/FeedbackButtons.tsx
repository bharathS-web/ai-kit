"use client";

import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, Check, X, Send } from "lucide-react";

export interface FeedbackButtonsProps {
  onThumbsUp?: () => void;
  onThumbsDown?: (reason?: string, tags?: string[]) => void;
  allowReasonPopup?: boolean;
  presetTags?: string[];
  className?: string;
}

export function FeedbackButtons({
  onThumbsUp,
  onThumbsDown,
  allowReasonPopup = true,
  presetTags = [
    "Factually incorrect",
    "Hallucination",
    "Didn't follow instructions",
    "Syntax / Code error",
    "Too verbose",
  ],
  className = "",
}: FeedbackButtonsProps) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customComment, setCustomComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleUp = () => {
    if (vote === "up") {
      setVote(null);
    } else {
      setVote("up");
      setIsPopupOpen(false);
      onThumbsUp?.();
    }
  };

  const handleDown = () => {
    if (vote === "down") {
      setVote(null);
      setIsPopupOpen(false);
    } else {
      setVote("down");
      if (allowReasonPopup) {
        setIsPopupOpen(true);
      } else {
        onThumbsDown?.();
      }
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmitFeedback = () => {
    onThumbsDown?.(customComment, selectedTags);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsPopupOpen(false);
      setIsSubmitted(false);
    }, 1200);
  };

  return (
    <div className={`relative inline-flex items-center gap-1 select-none ${className}`}>
      <button
        type="button"
        onClick={handleUp}
        className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-all active:scale-90 ${
          vote === "up"
            ? "border-emerald-500 bg-emerald-50 text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
            : "border-transparent text-gray-400 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-700 dark:hover:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        }`}
        title="Helpful response"
      >
        <ThumbsUp className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        onClick={handleDown}
        className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-all active:scale-90 ${
          vote === "down"
            ? "border-red-500 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950/60 dark:text-red-300"
            : "border-transparent text-gray-400 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-700 dark:hover:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        }`}
        title="Unhelpful response"
      >
        <ThumbsDown className="h-3.5 w-3.5" />
      </button>

      {/* Optional Feedback Reason Dialog Popover */}
      {isPopupOpen && (
        <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl backdrop-blur-md dark:border-gray-800 dark:bg-[#111827] z-50 animate-in fade-in zoom-in-95 duration-150 text-left">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2 dark:border-gray-800">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white">
              Why was this unhelpful?
            </h4>
            <button
              type="button"
              onClick={() => setIsPopupOpen(false)}
              className="rounded-md p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {isSubmitted ? (
            <div className="py-6 text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Check className="h-5 w-5 mx-auto mb-1" />
              <span>Thank you for your feedback!</span>
            </div>
          ) : (
            <div className="mt-3 space-y-3">
              {/* Preset Tags */}
              <div className="flex flex-wrap gap-1.5">
                {presetTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${
                        isSelected
                          ? "bg-purple-100 text-brand-700 font-bold border border-purple-300 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              {/* Textarea */}
              <textarea
                value={customComment}
                onChange={(e) => setCustomComment(e.target.value)}
                placeholder="Additional details (optional)..."
                rows={2}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2 text-xs text-gray-900 focus:border-brand-500 focus:bg-white focus:outline-hidden dark:border-gray-800 dark:bg-gray-900 dark:text-white resize-none"
              />

              <button
                type="button"
                onClick={handleSubmitFeedback}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-600 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 transition-all active:scale-95"
              >
                <Send className="h-3 w-3" />
                <span>Submit Feedback</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

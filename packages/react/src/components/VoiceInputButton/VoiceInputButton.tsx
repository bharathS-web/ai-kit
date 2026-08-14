"use client";

import React from "react";
import { Mic, Square, Loader2, AlertCircle } from "lucide-react";

export interface VoiceInputButtonProps {
  state?: "idle" | "listening" | "processing" | "error";
  onStart?: () => void;
  onStop?: () => void;
  durationSeconds?: number;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export function VoiceInputButton({
  state = "idle",
  onStart,
  onStop,
  durationSeconds,
  size = "md",
  disabled = false,
  className = "",
}: VoiceInputButtonProps) {
  const isListening = state === "listening";
  const isProcessing = state === "processing";
  const isError = state === "error";

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const formatDuration = (seconds?: number) => {
    if (seconds === undefined) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`relative inline-flex items-center gap-2 select-none ${className}`}>
      {/* Listening Pulse Waves */}
      {isListening && (
        <>
          <span className="absolute -inset-1 rounded-full bg-red-500/25 animate-ping" />
          <span className="absolute -inset-2.5 rounded-full bg-red-500/15 animate-pulse" />
        </>
      )}

      {/* Button */}
      <button
        type="button"
        disabled={disabled || isProcessing}
        onClick={isListening ? onStop : onStart}
        className={`relative flex items-center justify-center rounded-full transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
          sizeClasses[size]
        } ${
          isListening
            ? "bg-red-500 text-white shadow-lg shadow-red-500/30 ring-2 ring-red-400"
            : isProcessing
            ? "bg-purple-100 text-brand-600 dark:bg-purple-950 dark:text-purple-300"
            : isError
            ? "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300"
            : "border border-gray-200 bg-white text-gray-600 shadow-2xs hover:border-brand-500 hover:text-brand-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-brand-400"
        }`}
        aria-label={isListening ? "Stop recording voice" : "Start voice recording"}
      >
        {isListening ? (
          <Square className={`${iconSizes[size]} fill-current`} />
        ) : isProcessing ? (
          <Loader2 className={`${iconSizes[size]} animate-spin`} />
        ) : isError ? (
          <AlertCircle className={iconSizes[size]} />
        ) : (
          <Mic className={iconSizes[size]} />
        )}
      </button>

      {/* Recording Duration Pill & Live Waveform Indicator */}
      {isListening && durationSeconds !== undefined && (
        <div className="flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-mono font-semibold text-red-600 dark:border-red-950 dark:bg-red-950/60 dark:text-red-400 animate-in fade-in">
          {/* Animated 3-bar Audio Wave */}
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 bg-red-500 rounded-full h-full animate-[pulse_0.6s_ease-in-out_infinite]" />
            <span className="w-0.5 bg-red-500 rounded-full h-2 animate-[pulse_0.4s_ease-in-out_infinite]" />
            <span className="w-0.5 bg-red-500 rounded-full h-3 animate-[pulse_0.7s_ease-in-out_infinite]" />
          </div>
          <span>{formatDuration(durationSeconds)}</span>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Volume2, RotateCcw } from "lucide-react";

export interface AudioPlayerProps {
  src?: string;
  title?: string;
  duration?: number;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  playbackRate?: 1 | 1.25 | 1.5 | 2;
  onPlaybackRateChange?: (rate: 1 | 1.25 | 1.5 | 2) => void;
  className?: string;
}

export function AudioPlayer({
  src,
  title = "AI Voice Output",
  duration = 32,
  isPlaying: controlledIsPlaying,
  onPlayPause,
  playbackRate = 1,
  onPlaybackRateChange,
  className = "",
}: AudioPlayerProps) {
  const [internalIsPlaying, setInternalIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [rate, setRate] = useState<1 | 1.25 | 1.5 | 2>(playbackRate);

  const isPlaying =
    controlledIsPlaying !== undefined ? controlledIsPlaying : internalIsPlaying;

  const handleToggle = () => {
    if (onPlayPause) {
      onPlayPause();
    } else {
      setInternalIsPlaying(!internalIsPlaying);
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setInternalIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / rate);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration, rate]);

  const toggleRate = () => {
    const rates: Array<1 | 1.25 | 1.5 | 2> = [1, 1.25, 1.5, 2];
    const nextIdx = (rates.indexOf(rate) + 1) % rates.length;
    const nextRate = rates[nextIdx];
    setRate(nextRate);
    onPlaybackRateChange?.(nextRate);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // 18 simulated audio wave bars
  const waveHeights = [40, 65, 30, 85, 55, 95, 70, 45, 80, 100, 60, 75, 50, 90, 65, 40, 80, 45];
  const progressRatio = currentTime / duration;

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-xs dark:border-gray-800 dark:bg-[#111827] select-none ${className}`}
    >
      {/* Play/Pause Button */}
      <button
        type="button"
        onClick={handleToggle}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-500/20 hover:bg-brand-700 transition-all active:scale-95"
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4 fill-current" />
        ) : (
          <Play className="h-4 w-4 fill-current ml-0.5" />
        )}
      </button>

      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="truncate font-semibold text-gray-900 dark:text-white">
            {title}
          </span>
          <span className="font-mono text-[11px] text-gray-400">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Audio Waveform Bars */}
        <div className="flex items-center gap-1 h-6 py-1">
          {waveHeights.map((h, i) => {
            const isPlayed = i / waveHeights.length <= progressRatio;
            return (
              <div
                key={i}
                className="flex-1 rounded-full transition-all duration-150"
                style={{
                  height: `${h}%`,
                  backgroundColor: isPlayed ? "#7F56D9" : undefined,
                }}
              >
                <div
                  className={`h-full w-full rounded-full ${
                    isPlayed
                      ? "bg-brand-600"
                      : "bg-gray-200 dark:bg-gray-800"
                  } ${isPlaying && isPlayed ? "animate-pulse" : ""}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Speed Multiplier Button */}
      <button
        type="button"
        onClick={toggleRate}
        className="flex h-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50/80 px-2 font-mono text-[11px] font-bold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors active:scale-95"
        title="Playback Speed"
      >
        {rate}x
      </button>
    </div>
  );
}

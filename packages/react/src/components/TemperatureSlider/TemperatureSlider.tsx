"use client";

import React from "react";
import { Sliders, Flame, Sparkles } from "lucide-react";

export interface TemperatureSliderProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showPresets?: boolean;
  className?: string;
}

export function TemperatureSlider({
  value,
  onChange,
  min = 0,
  max = 2,
  step = 0.1,
  label = "Model Temperature",
  showPresets = true,
  className = "",
}: TemperatureSliderProps) {
  const getDescriptor = (val: number) => {
    if (val <= 0.3) return { text: "Precise & Deterministic", color: "text-blue-500" };
    if (val <= 0.8) return { text: "Balanced & Analytical", color: "text-brand-500" };
    if (val <= 1.3) return { text: "Creative & Fluent", color: "text-purple-500" };
    return { text: "Highly Imaginative", color: "text-pink-500" };
  };

  const descriptor = getDescriptor(value);

  const presets = [
    { label: "Precise", value: 0.2 },
    { label: "Balanced", value: 0.7 },
    { label: "Creative", value: 1.2 },
  ];

  return (
    <div className={`space-y-2.5 text-left select-none ${className}`}>
      {/* Header with Descriptor & Value Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Flame className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span className="text-xs font-bold text-gray-900 dark:text-white">
            {label}
          </span>
          <span className={`text-[11px] font-medium ml-1 ${descriptor.color}`}>
            • {descriptor.text}
          </span>
        </div>

        <span className="rounded-md border border-purple-200 bg-purple-50 px-2 py-0.5 font-mono text-xs font-bold text-brand-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300">
          {value.toFixed(1)}
        </span>
      </div>

      {/* Slider Control */}
      <div className="space-y-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="h-2 w-full appearance-none rounded-lg bg-gray-200 accent-brand-600 focus:outline-hidden dark:bg-gray-800 cursor-pointer"
        />

        <div className="flex justify-between text-[10px] font-mono text-gray-400">
          <span>{min.toFixed(1)} (Exact)</span>
          <span>{max.toFixed(1)} (Random)</span>
        </div>
      </div>

      {/* Quick Presets */}
      {showPresets && (
        <div className="flex items-center gap-1.5 pt-1">
          <span className="text-[10px] uppercase font-semibold text-gray-400">
            Presets:
          </span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onChange(preset.value)}
              className={`rounded-lg px-2 py-0.5 text-[11px] font-medium transition-all ${
                Math.abs(value - preset.value) < 0.05
                  ? "bg-brand-600 font-bold text-white shadow-2xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {preset.label} ({preset.value})
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

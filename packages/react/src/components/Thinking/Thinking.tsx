import React from "react";

export interface ThinkingProps {
  /** Text shown next to the animated indicator */
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

const sizeStyles = {
  sm: { dot: "h-1.5 w-1.5", text: "text-xs", gap: "gap-1" },
  md: { dot: "h-2 w-2", text: "text-sm", gap: "gap-1.5" },
};

export const Thinking = ({ label = "Thinking", size = "md", className = "" }: ThinkingProps) => {
  const s = sizeStyles[size];

  return (
    <div className={`inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 ${className}`.trim()}>
      {label && <span className={s.text}>{label}</span>}
      <span className={`flex items-center ${s.gap}`}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce ${s.dot}`}
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }}
          />
        ))}
      </span>
    </div>
  );
};

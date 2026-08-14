"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

export interface RatingStarsProps {
  rating?: number;
  maxStars?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  showValueBadge?: boolean;
  className?: string;
}

export function RatingStars({
  rating = 0,
  maxStars = 5,
  onChange,
  readOnly = false,
  size = "md",
  showValueBadge = false,
  className = "",
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const starSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const currentRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div
      className={`inline-flex items-center gap-1 select-none ${className}`}
      onMouseLeave={() => !readOnly && setHoverRating(null)}
    >
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= currentRating;

        return (
          <button
            key={index}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(starValue)}
            onMouseEnter={() => !readOnly && setHoverRating(starValue)}
            className={`transition-all ${
              readOnly ? "cursor-default" : "cursor-pointer active:scale-90 hover:scale-110"
            }`}
            aria-label={`Rate ${starValue} of ${maxStars} stars`}
          >
            <Star
              className={`${starSizes[size]} transition-colors ${
                isFilled
                  ? "fill-amber-400 text-amber-400"
                  : "fill-transparent text-gray-300 dark:text-gray-700"
              }`}
            />
          </button>
        );
      })}

      {showValueBadge && rating > 0 && (
        <span className="ml-1.5 rounded-md bg-amber-50 px-1.5 py-0.5 text-xs font-mono font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

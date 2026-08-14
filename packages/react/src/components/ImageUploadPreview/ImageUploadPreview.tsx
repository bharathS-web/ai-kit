"use client";

import React, { useState } from "react";
import { X, ZoomIn, Plus, Image as ImageIcon, Loader2 } from "lucide-react";

export interface ImageUploadItem {
  id: string;
  url: string;
  name?: string;
  size?: string;
  isUploading?: boolean;
  progress?: number;
}

export interface ImageUploadPreviewProps {
  images: ImageUploadItem[];
  onRemove?: (id: string) => void;
  onAdd?: () => void;
  maxImages?: number;
  allowZoom?: boolean;
  className?: string;
}

export function ImageUploadPreview({
  images = [],
  onRemove,
  onAdd,
  maxImages = 4,
  allowZoom = true,
  className = "",
}: ImageUploadPreviewProps) {
  const [zoomedImage, setZoomedImage] = useState<ImageUploadItem | null>(null);

  return (
    <div className={`space-y-2 select-none ${className}`}>
      <div className="flex flex-wrap items-center gap-3">
        {images.map((img) => (
          <div
            key={img.id}
            className="group relative h-20 w-20 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-800 shadow-xs"
          >
            {/* Image Thumbnail */}
            <img
              src={img.url}
              alt={img.name || "Upload preview"}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />

            {/* Uploading Spinner & Progress */}
            {img.isUploading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-2xs text-white">
                <Loader2 className="h-5 w-5 animate-spin" />
                {img.progress !== undefined && (
                  <span className="font-mono text-[10px] mt-1">
                    {img.progress}%
                  </span>
                )}
              </div>
            )}

            {/* Hover Actions Overlay */}
            {!img.isUploading && (
              <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                {allowZoom && (
                  <button
                    type="button"
                    onClick={() => setZoomedImage(img)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md hover:bg-white transition-transform active:scale-90"
                    title="Zoom image"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                )}

                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(img.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition-transform active:scale-90"
                    title="Remove image"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Add Image Slot */}
        {onAdd && images.length < maxImages && (
          <button
            type="button"
            onClick={onAdd}
            className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50 text-gray-400 hover:border-brand-500 hover:bg-purple-50/30 hover:text-brand-600 dark:border-gray-700 dark:bg-gray-900/40 dark:hover:border-brand-500 transition-all active:scale-95"
          >
            <Plus className="h-5 w-5" />
            <span className="mt-1 text-[10px] font-medium">Add file</span>
          </button>
        )}
      </div>

      {/* Zoom Modal Dialog */}
      {zoomedImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] max-w-[85vw] overflow-hidden rounded-3xl border border-white/20 bg-gray-900 p-2 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setZoomedImage(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={zoomedImage.url}
              alt={zoomedImage.name || ""}
              className="max-h-[80vh] rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

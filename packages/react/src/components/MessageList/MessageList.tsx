"use client";

import React, { useEffect, useRef } from "react";

export interface MessageListProps {
  children: React.ReactNode;
  autoScroll?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
}

export const MessageList = ({
  children,
  autoScroll = true,
  emptyState,
  className = "",
}: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [children, autoScroll]);

  const isEmpty = React.Children.count(children) === 0;

  return (
    <div
      ref={containerRef}
      className={`flex flex-col flex-1 overflow-y-auto p-4 space-y-4 ${className}`.trim()}
    >
      {isEmpty && emptyState ? (
        <div className="flex flex-1 items-center justify-center py-12">
          {emptyState}
        </div>
      ) : (
        <>
          {children}
          <div ref={bottomRef} className="h-px shrink-0" />
        </>
      )}
    </div>
  );
};

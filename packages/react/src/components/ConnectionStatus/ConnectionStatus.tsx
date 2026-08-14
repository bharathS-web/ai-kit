"use client";

import React from "react";
import { Wifi, WifiOff, RotateCcw, Activity } from "lucide-react";

export interface ConnectionStatusProps {
  status: "connected" | "connecting" | "reconnecting" | "offline" | "error";
  latencyMs?: number;
  showPing?: boolean;
  onReconnect?: () => void;
  className?: string;
}

export function ConnectionStatus({
  status = "connected",
  latencyMs,
  showPing = true,
  onReconnect,
  className = "",
}: ConnectionStatusProps) {
  const isConnected = status === "connected";
  const isPending = status === "connecting" || status === "reconnecting";
  const isOffline = status === "offline" || status === "error";

  const config = {
    connected: {
      label: "Live Stream Connected",
      badgeColor: "bg-emerald-500",
      pingBg: "bg-emerald-400",
      textColor: "text-emerald-700 dark:text-emerald-300",
      bgColor: "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60",
    },
    connecting: {
      label: "Establishing Connection...",
      badgeColor: "bg-amber-500",
      pingBg: "bg-amber-400",
      textColor: "text-amber-700 dark:text-amber-300",
      bgColor: "bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60",
    },
    reconnecting: {
      label: "Reconnecting to Agent...",
      badgeColor: "bg-amber-500",
      pingBg: "bg-amber-400",
      textColor: "text-amber-700 dark:text-amber-300",
      bgColor: "bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60",
    },
    offline: {
      label: "Session Offline",
      badgeColor: "bg-red-500",
      pingBg: "bg-red-400",
      textColor: "text-red-700 dark:text-red-300",
      bgColor: "bg-red-50/80 dark:bg-red-950/40 border-red-200 dark:border-red-900/60",
    },
    error: {
      label: "Connection Dropped",
      badgeColor: "bg-red-500",
      pingBg: "bg-red-400",
      textColor: "text-red-700 dark:text-red-300",
      bgColor: "bg-red-50/80 dark:bg-red-950/40 border-red-200 dark:border-red-900/60",
    },
  };

  const current = config[status];

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border px-3 py-1 text-xs font-medium shadow-2xs select-none ${current.bgColor} ${className}`}
    >
      {/* Pulsing Status Dot */}
      <span className="relative flex h-2 w-2">
        {isConnected || isPending ? (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${current.pingBg}`}
          />
        ) : null}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${current.badgeColor}`}
        />
      </span>

      <span className={`font-semibold ${current.textColor}`}>
        {current.label}
      </span>

      {/* Latency Meter */}
      {isConnected && showPing && latencyMs !== undefined && (
        <span className="flex items-center gap-1 font-mono text-[10px] text-gray-500 dark:text-gray-400 pl-1 border-l border-gray-200 dark:border-gray-800">
          <Activity className="h-3 w-3 text-emerald-500" />
          <span>{latencyMs}ms</span>
        </span>
      )}

      {/* Reconnect Action Button */}
      {isOffline && onReconnect && (
        <button
          type="button"
          onClick={onReconnect}
          className="ml-1 flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-red-700 shadow-2xs hover:bg-gray-50 dark:bg-gray-900 dark:text-red-300 dark:hover:bg-gray-800 transition-all active:scale-95"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reconnect</span>
        </button>
      )}
    </div>
  );
}

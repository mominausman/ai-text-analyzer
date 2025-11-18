import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sentiments = {
  positive: {
    label: "Positive",
    gradient: "from-emerald-500/90 via-emerald-400 to-teal-400",
    text: "text-emerald-100",
    glow: "shadow-[0_0_45px_rgba(16,185,129,0.35)]",
  },
  neutral: {
    label: "Neutral",
    gradient: "from-slate-500 via-slate-400 to-zinc-300",
    text: "text-slate-900",
    glow: "shadow-[0_0_45px_rgba(148,163,184,0.35)]",
  },
  negative: {
    label: "Negative",
    gradient: "from-rose-500/90 via-red-500 to-orange-400",
    text: "text-rose-50",
    glow: "shadow-[0_0_45px_rgba(244,63,94,0.35)]",
  },
} as const;

export type SentimentKey = keyof typeof sentiments;

export function formatTimestamp(date = new Date()) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function generateUUID(): string {
  // Use crypto.randomUUID if available (modern browsers)
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback UUID v4 generator
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}


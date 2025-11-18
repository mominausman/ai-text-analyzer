"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full min-h-[140px] resize-none rounded-3xl border border-slate-200/60 bg-white/90 p-5 text-base text-slate-900 shadow-inner shadow-slate-900/5 outline-none transition focus-visible:ring-2 focus-visible:ring-slate-900/30 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-100",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };


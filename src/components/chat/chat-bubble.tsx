import { cn, formatTimestamp } from "@/lib/utils";
import type { ChatMessage } from "@/types/analysis";

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";
  return (
    <div
      className={cn(
        "flex flex-col gap-2 text-sm",
        isUser ? "items-end" : "items-start",
      )}
    >
      <span className="text-xs uppercase tracking-wide text-slate-500">
        {isUser ? "You" : "Astra (AI)"}
      </span>
      <div
        className={cn(
          "max-w-2xl rounded-3xl border p-4 text-base shadow-lg transition",
          isUser
            ? "border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-indigo-500/20"
            : "border-slate-200/60 bg-white/80 text-slate-900 shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/60 dark:text-slate-100",
        )}
      >
        {message.content}
      </div>
      <time className="text-xs text-slate-400">
        {message.createdAt || formatTimestamp()}
      </time>
    </div>
  );
}


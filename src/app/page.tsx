"use client";

import { useMemo, useState } from "react";
import { Loader2, Sparkles, Wand2 } from "lucide-react";

import { AnalysisCard } from "@/components/chat/analysis-card";
import { ChatBubble } from "@/components/chat/chat-bubble";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatTimestamp, generateUUID } from "@/lib/utils";
import type { AIAnalysis, ChatMessage } from "@/types/analysis";

const demoText =
  "We love the product direction, but onboarding still feels clunky and slow. Support is warm, yet follow-up takes too long. I’m hopeful about the roadmap but losing patience with execution.";

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateUUID(),
      role: "assistant",
      content:
        "Hey, I'm Astra. Drop any text—customer feedback, release notes, journal entries—and I'll instantly distill the sentiment, tone, and action items for you.",
      createdAt: formatTimestamp(),
    },
  ]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const highlightStats = useMemo(
    () => [
      { label: "Sentiment pulse", value: "Real-time" },
      { label: "Insights surfaced", value: "5+" },
      { label: "Model", value: "Groq Llama 3.3 70B" },
    ],
    [],
  );

  const handleSubmit = async (text?: string) => {
    const content = (text ?? draft).trim();
    if (!content || isLoading) return;

    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      id: generateUUID(),
      role: "user",
      content,
      createdAt: formatTimestamp(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      const data = (await response.json()) as { analysis?: AIAnalysis; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Astra couldn't reach Groq right now. Try again.");
      }

      if (!data.analysis) {
        throw new Error("No analysis received from server");
      }
      const aiMessage: ChatMessage = {
        id: generateUUID(),
        role: "assistant",
        content: data.analysis.summary,
        analysis: data.analysis,
        createdAt: formatTimestamp(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setDraft("");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-50">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_50%),radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.25),transparent_45%)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-24 pt-16 md:px-8 lg:px-12">
        <header className="space-y-6 text-center md:text-left">
          <Badge className="mx-auto flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs md:mx-0">
            <Sparkles className="h-4 w-4" />
            Powered by Groq + llama-3.3-70b
          </Badge>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
            A beautiful AI sentiment studio for every piece of text.
          </h1>
          <p className="text-lg text-slate-300 md:max-w-2xl">
            Paste customer feedback, marketing drafts, or daily reflections. Astra instantly
            captures emotional tone, summarizes key signals, and suggests next moves.
          </p>
          <div className="grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
            {highlightStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  {stat.label}
                </p>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className={cn("border-white/10 bg-white/5 p-6 text-slate-900 shadow-2xl shadow-emerald-500/10")}>
            <form
              className="flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                void handleSubmit();
              }}
            >
              <label className="text-sm font-semibold text-slate-500 dark:text-slate-200">
                Paste text to analyze
              </label>
              <Textarea
                value={draft}
                placeholder="Tell Astra what's on your mind..."
                onChange={(event) => setDraft(event.target.value)}
              />
              {error && (
                <p className="rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-200">
                  {error}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Thinking
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Wand2 className="h-4 w-4" />
                      Analyze with Astra
                    </span>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-slate-200"
                  onClick={() => {
                    setDraft(demoText);
                    void handleSubmit(demoText);
                  }}
                >
                  Use demo text
                </Button>
              </div>
            </form>
          </Card>

          <Card className="border-white/10 bg-white/5 p-6 text-slate-900 shadow-2xl shadow-cyan-500/10">
            <div className="space-y-5">
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Astra is interpreting the vibe…
                </div>
              )}
            </div>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase tracking-wide text-slate-400">
              Rich analysis cards
            </p>
            <h2 className="text-3xl font-semibold text-white">
              Every response arrives as a ready-to-share insight.
            </h2>
          </div>
          <div className="grid gap-6">
            {messages
              .filter((message) => message.analysis)
              .map((message) => (
                <AnalysisCard key={message.id} analysis={message.analysis!} />
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}

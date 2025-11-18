import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sentiments, type SentimentKey } from "@/lib/utils";
import type { AIAnalysis } from "@/types/analysis";

interface AnalysisCardProps {
  analysis: AIAnalysis;
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
  const palette = sentiments[analysis.sentiment as SentimentKey] ?? sentiments.neutral;

  return (
    <Card className={`border-none bg-white/90 dark:bg-slate-900/70 ${palette.glow}`}>
      <CardHeader className="flex flex-col gap-3">
        <div
          className={`inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r ${palette.gradient} px-4 py-1`}
        >
          <Badge variant="glow" className="border-none bg-transparent text-xs">
            {palette.label}
          </Badge>
          <span className={`text-xs font-semibold uppercase ${palette.text}`}>
            {(analysis.confidence * 100).toFixed(0)}% confidence
          </span>
        </div>
        <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-white">
          {analysis.summary}
        </CardTitle>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Tone: <span className="font-medium text-slate-900 dark:text-slate-50">{analysis.tone}</span>{" "}
          • Mood:{" "}
          <span className="font-medium text-slate-900 dark:text-slate-50">
            {analysis.mood}
          </span>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Highlights
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {analysis.highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200/60 bg-white/60 px-4 py-3 text-sm shadow-sm dark:border-slate-800/70 dark:bg-slate-900/40"
              >
                <p className="font-semibold text-slate-900 dark:text-slate-50">
                  {item.title}
                </p>
                <p className="mt-1 text-slate-600 dark:text-slate-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Suggestions
          </p>
          <ul className="mt-3 space-y-2">
            {analysis.suggestions.map((suggestion, index) => (
              <li
                key={`${suggestion}-${index}`}
                className="flex items-start gap-3 rounded-2xl border border-slate-200/60 bg-white/70 px-4 py-3 text-sm leading-relaxed shadow-sm dark:border-slate-800/70 dark:bg-slate-900/40"
              >
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900/10 text-xs font-semibold text-slate-900 dark:bg-white/10 dark:text-slate-100">
                  {index + 1}
                </span>
                <span className="text-slate-900 dark:text-slate-100">
                  {suggestion}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}


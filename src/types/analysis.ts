export type SentimentLabel = "positive" | "neutral" | "negative";

export interface Insight {
  title: string;
  detail: string;
}

export interface AIAnalysis {
  summary: string;
  sentiment: SentimentLabel;
  confidence: number;
  mood: string;
  tone: string;
  highlights: Insight[];
  suggestions: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  analysis?: AIAnalysis;
}


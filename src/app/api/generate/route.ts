import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { z } from "zod";

import { env } from "@/lib/env";
import type { AIAnalysis } from "@/types/analysis";

const groq = new Groq({ apiKey: env.GROQ_API_KEY });

const requestSchema = z.object({
  message: z.string().min(1).max(2000),
});

const analysisSchema = z.object({
  summary: z.string(),
  sentiment: z.enum(["positive", "neutral", "negative"]),
  confidence: z.number().min(0).max(1),
  mood: z.string(),
  tone: z.string(),
  highlights: z
    .array(
      z.object({
        title: z.string(),
        detail: z.string(),
      }),
    )
    .min(2),
  suggestions: z.array(z.string()).min(2),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { message } = requestSchema.parse(json);

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      max_tokens: 700,
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: `You are Astra, an empathetic AI text sentiment analyst and summarizer. 
Respond ONLY with valid JSON following this schema:
{
  "summary": string,
  "sentiment": "positive" | "neutral" | "negative",
  "confidence": number between 0 and 1,
  "mood": string,
  "tone": string,
  "highlights": [{ "title": string, "detail": string }],
  "suggestions": [string]
}
Summaries must be concise but vivid. Offer actionable suggestions rooted in the text.`,
            },
          ],
        },
        {
          role: "user",
          content: [{ type: "text", text: message }],
        },
      ],
    });

    const rawContent = completion.choices[0].message?.content;
    
    if (!rawContent) {
      throw new Error("No content received from Groq");
    }

    // Handle both string and array content formats
    let normalized: string;
    if (typeof rawContent === "string") {
      normalized = rawContent;
    } else if (Array.isArray(rawContent)) {
      const contentArray = rawContent as Array<string | { text: string }>;
      normalized = contentArray
        .map((chunk) => {
          if (typeof chunk === "string") {
            return chunk;
          }
          if (typeof chunk === "object" && chunk !== null && "text" in chunk) {
            return chunk.text;
          }
          return "";
        })
        .join("");
    } else {
      normalized = "";
    }

    const cleaned = normalized
      .replace(/```json|```/g, "")
      .replace(/[\u0000-\u001F]+/g, "")
      .trim();

    const parsed = analysisSchema.parse(JSON.parse(cleaned));

    return NextResponse.json({ analysis: parsed satisfies AIAnalysis });
  } catch (error) {
    console.error("Groq API error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request", details: error.issues },
        { status: 400 },
      );
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "AI response was malformed. Please try again." },
        { status: 502 },
      );
    }
    return NextResponse.json(
      { error: "Failed to generate analysis" },
      { status: 500 },
    );
  }
}


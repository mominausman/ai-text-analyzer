import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Astra · AI Sentiment Studio",
  description:
    "Groq-powered sentiment analyzer and summarizer with a luxurious chat experience, built on Next.js 14.",
  metadataBase: new URL("https://ai-text-analyzer.vercel.app"),
  openGraph: {
    title: "Astra · AI Sentiment Studio",
    description:
      "Instantly summarize tone, mood, and next steps with a Groq Llama 3.3 70B assistant.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Astra · AI Sentiment Studio",
    description:
      "Chat with a beautiful AI sentiment and summary assistant powered by Groq.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

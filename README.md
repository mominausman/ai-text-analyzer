## Astra · AI Text Analyzer

A polished Next.js 14 (App Router) experience for exploring sentiment, tone, and summaries using Groq's `llama-3.3-70b` model. The UI combines Tailwind CSS v4 with shadcn-inspired components (Card, Button, Textarea, Badge, Loader2) to deliver a luxurious chat surface and rich AI insight cards that are ready to share.

### ✨ Stack
- Next.js 16 / React 19 with the App Router and TypeScript
- Tailwind CSS v4 + custom shadcn/ui components
- Groq SDK (`llama-3.3-70b`) behind a secure `/api/generate` server route
- Ready-to-deploy configuration for Vercel

### 🔐 Environment Setup
1. Duplicate `env.example` → `.env.local`
2. Fill in your key:
   ```
   GROQ_API_KEY=sk-your-key
   ```
3. `.env*` files are ignored via `.gitignore`, keeping secrets out of source control.

### 🚀 Getting Started
Install dependencies (already included if you ran `npm install` after cloning):
```bash
npm install
```

Run the development server:
```bash
npm run dev
```
Visit `http://localhost:3000` to explore Astra.

### 🧠 How it works
- `src/app/api/generate/route.ts` validates input, calls Groq, and enforces a JSON contract for sentiment, mood, tone, highlights, and suggestions.
- `src/app/page.tsx` renders the chat-style UI, user bubbles, and shadcn-style analysis cards.
- UI primitives live under `src/components/ui` and mirror the shadcn API for future component expansion.

### ✅ Deployment
This project ships with the default Next.js / Vercel build pipeline:
```bash
npm run build
npm run start
```
Deploying to Vercel requires setting `GROQ_API_KEY` in the Vercel dashboard. No other configuration changes are necessary.

Enjoy the vibe-first AI sentiment studio!

import { z } from "zod";

const envSchema = z.object({
  GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),
});

const parsed = envSchema.safeParse({
  GROQ_API_KEY: process.env.GROQ_API_KEY,
});

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables: ${parsed.error.flatten().fieldErrors.GROQ_API_KEY?.join(", ")}`,
  );
}

export const env = parsed.data;


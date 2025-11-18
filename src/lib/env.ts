import { z } from "zod";

const envSchema = z.object({
  GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),
});

let cachedEnv: z.infer<typeof envSchema> | null = null;

function getEnv() {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = envSchema.safeParse({
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  });

  if (!parsed.success) {
    throw new Error(
      `Invalid environment variables: ${parsed.error.flatten().fieldErrors.GROQ_API_KEY?.join(", ")}`,
    );
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}

// Lazy evaluation - only validate when accessed, not at module load
export const env = {
  get GROQ_API_KEY() {
    return getEnv().GROQ_API_KEY;
  },
};


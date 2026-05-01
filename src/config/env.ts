import { z } from "zod";

function normalizeOptionalString(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  const s = String(value).trim();
  return s === "" ? undefined : s;
}

const clientEnvSchema = z.object({
  VITE_API_URL: z.union([z.string().url(), z.undefined()]),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

function readClientEnv(): ClientEnv {
  const raw = {
    VITE_API_URL: normalizeOptionalString(import.meta.env.VITE_API_URL),
  };

  const parsed = clientEnvSchema.safeParse(raw);
  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error(`Invalid environment variables: ${parsed.error.message}`);
  }
  return parsed.data;
}

/** Validated Vite client env. Evaluated once; throws if optional URL is present but invalid. */
export const clientEnv: ClientEnv = readClientEnv();

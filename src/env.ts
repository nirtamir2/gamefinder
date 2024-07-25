import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    RAWG_API_KEY: z.string().min(1),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
    DRIZZLE_DATABASE_URL: z.string().min(1),
    IS_REAL_DATA: z.coerce.boolean().default(false),
    // ONLY_BOOLEAN: z
    // 	.string()
    // 	// only allow "true" or "false"
    // 	.refine((s) => s === "true" || s === "false")
    // 	// transform to boolean
    // 	.transform((s) => s === "true"),
    // ZOD_NUMBER_COERCION: z.coerce.number(),
  },
  client: {
    // NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    IS_REAL_DATA: process.env["IS_REAL_DATA"],
    GOOGLE_GENERATIVE_AI_API_KEY: process.env["GOOGLE_GENERATIVE_AI_API_KEY"],
    RAWG_API_KEY: process.env["RAWG_API_KEY"],
    DRIZZLE_DATABASE_URL: process.env["DRIZZLE_DATABASE_URL"],
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});

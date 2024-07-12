import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    RAWG_API_KEY: z.string().min(1),
    GEMINI_API_KEY: z.string().min(1),
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
    GEMINI_API_KEY: process.env["GEMINI_API_KEY"],
    RAWG_API_KEY: process.env["RAWG_API_KEY"],
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});

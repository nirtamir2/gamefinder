import { defineConfig } from "drizzle-kit";
import process from "node:process";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    url: process.env["DRIZZLE_DATABASE_URL"]!,
  },
  migrations: {
    prefix: "timestamp",
  },
});

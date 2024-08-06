import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const recommendationSchema = z
  .object({
    games: z
      .array(
        z.object({
          name: z.string().describe("discover name"),
          explanation: z
            .string()
            .describe(
              "why did you choose to recommend this discover to me (use up to 25 words, second person)",
            ),
        }),
      )
      .describe("discover recommendations"),
  })
  .describe("result");

export const recommendGamesWithAI = async ({
  genres,
  platforms,
  likedGames,
}: {
  likedGames: Array<string>;
  platforms: Array<string> | null;
  genres: Array<string> | null;
}) => {
  "use server";
  const result = await generateObject({
    mode: "json",
    model: google("models/gemini-1.5-flash-latest"),
    temperature: 0,
    system:
      "You are a professional video discover recommender. The user will provide you some games he liked. Find 8 games similar to the discover mentioned that they might like and return their names.",
    prompt: [
      `Games I liked: ${likedGames.join(", ")}.`,
      platforms == null ? null : `Platform i use: ${platforms.join(", ")}`,
      genres == null ? null : `My favorite genres: ${genres.join(", ")}`,
    ]
      .filter((prompt) => prompt != null)
      .join(" "),
    schema: recommendationSchema,
  });
  return result.object;
};

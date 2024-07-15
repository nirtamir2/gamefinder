import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const recommendationSchema = z
  .object({
    games: z
      .array(
        z.object({
          name: z.string().describe("game name"),
          explanation: z
            .string()
            .describe("why did you choose to recommend this game"),
        }),
      )
      .describe("game recommendations"),
  })
  .describe("result");

export const recommendGamesWithAI = async ({
  genre,
  platforms,
  likedGames,
}: {
  likedGames: Array<string>;
  platforms: Array<string>;
  genre: string;
}) => {
  "use server";
  const result = await generateObject({
    mode: "json",
    model: google("models/gemini-1.5-flash-latest"),
    temperature: 0,
    system:
      "You are a professional video game recommender. The user will provide you some games he liked. Find 8 games similar to the game mentioned that they might like and return their names.",
    prompt: `Games i liked: ${likedGames.join(", ")}.
Platform i use: ${platforms.join(", ")}
My favorite genre: ${genre}`,
    schema: recommendationSchema,
  });
  return result.object;
};

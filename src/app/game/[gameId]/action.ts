import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const recommendationSchema = z.object({
  recommendedGames: z
    .array(z.string().describe("game name"))
    .describe("the recommendation game names"),
});

export const recommendGamesWithAI = async ({
  likedGames,
}: {
  likedGames: Array<string>;
}) => {
  "use server";
  const result = await generateObject({
    model: google("models/gemini-1.5-flash-latest"),
    temperature: 0,
    system:
      "You are a professional video game recommender. The user will provide you some games he liked - and your job is to recommend him about games he might like",
    prompt: `Recommend me some games like ${likedGames.join(",")}`,
    schema: recommendationSchema,
  });
  return result.object;
};

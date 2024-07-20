"use server";

import { pathFor } from "@nirtamir2/next-static-paths";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  likedGames: z.array(z.string()).min(1),
  genres: z.array(z.string()),
  platforms: z.array(z.string()),
});

export async function navigateToSearchResult(data: FormData) {
  const { platforms, likedGames, genres } = schema.parse({
    likedGames: [data.get("likedGames")],
    genres: [data.get("genres")],
    platforms: [data.get("platforms")],
  });

  const urlWithSearchParams = new URLSearchParams();
  for (const likedGame of likedGames) {
    urlWithSearchParams.append("likedGames", likedGame);
  }
  for (const genre of genres) {
    urlWithSearchParams.append("genress", genre);
  }
  for (const platform of platforms) {
    urlWithSearchParams.append("platforms", platform);
  }

  const url = `${pathFor("/game/[gameId]", { gameId: "gta" })}?${urlWithSearchParams.toString()}`;

  redirect(url);
}

"use server";

import { pathFor } from "@nirtamir2/next-static-paths";
import { redirect } from "next/navigation";
import { createSerializer } from "nuqs/server";
import { stringArraySchema } from "@/utils/stringArraySchema";

const searchParamsSchemaSerializer = createSerializer({
  likedGames: stringArraySchema,
  genres: stringArraySchema,
  platforms: stringArraySchema,
});

export async function navigateToSearchResult(data: FormData) {
  const likedGames = String(data.get("likedGames"));
  const genres = String(data.get("genres"));
  const platforms = String(data.get("platforms"));

  const searchParams = searchParamsSchemaSerializer({
    likedGames: stringArraySchema.parseServerSide(likedGames),
    genres: stringArraySchema.parseServerSide(genres),
    platforms: stringArraySchema.parseServerSide(platforms),
  });

  const url = `${pathFor("/game/[gameId]", { gameId: "gta" })}${searchParams}`;

  redirect(url);
}

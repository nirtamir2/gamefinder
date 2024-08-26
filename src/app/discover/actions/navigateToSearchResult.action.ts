"use server";

import { pathFor } from "@nirtamir2/next-static-paths";
import { revalidatePath } from "next/cache";
import { searchParamsSchemaSerializer } from "@/app/discover/actions/searchParamsSchemaSerializer";
import { stringArraySchema } from "@/utils/stringArraySchema";

export async function navigateToSearchResult(_: unknown, data: FormData) {
  const likedGames = String(data.get("likedGames"));
  const genres = String(data.get("genres"));
  const platforms = String(data.get("platforms"));

  const searchParams = searchParamsSchemaSerializer({
    likedGames: stringArraySchema.parseServerSide(likedGames),
    genres: stringArraySchema.parseServerSide(genres),
    platforms: stringArraySchema.parseServerSide(platforms),
  });

  const url = `${pathFor("/discover")}${searchParams}`;

  revalidatePath(url);
}

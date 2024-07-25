import "server-only";
import { db } from "@/server/db/db";
import { searchedGames } from "@/server/db/schema";

export async function fetchGamesDataFromDb() {
  return await db.select().from(searchedGames);
}

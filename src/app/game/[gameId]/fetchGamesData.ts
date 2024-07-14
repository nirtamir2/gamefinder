import { recommendGamesWithAI } from "@/app/game/[gameId]/action";
import { mockData } from "@/app/game/[gameId]/mock-data";
import { fetchGames } from "@/lib/fetchGames";
import {env} from "@/env";

async function _fetchGamesData(gameId: string) {
  const aiRecommendationResult = await recommendGamesWithAI({
    likedGames: [gameId],
  });
  const populatedGames = await Promise.all(
    aiRecommendationResult.recommendedGames.map((game) => {
      return fetchGames(game);
    }),
  );

  return populatedGames
    .map((games) => games.results[0])
    .filter((game) => game != null);
}

export async function fetchGamesData(_gameId: string) {
  if (env.IS_REAL_DATA) {
    return await _fetchGamesData(_gameId);
  }
  return mockData;
}

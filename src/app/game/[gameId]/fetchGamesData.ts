import { recommendGamesWithAI } from "@/app/game/[gameId]/action";
import { fetchGames } from "@/lib/fetchGames";

async function _fetchGamesData(gameId: string) {
  const aiRecommendationResult = await recommendGamesWithAI({
    likedGames: [gameId],
    // TODO: use the url for that
    genre: "RPG",
    platforms: ["XBOX", "PC"],
  });
  const populatedGames = await Promise.all(
    aiRecommendationResult.games.map((game) => {
      return fetchGames(game.name);
    }),
  );

  return populatedGames.flatMap((games, index) => {
    const recommendedGame = aiRecommendationResult.games[index];
    const firstGameSearchResult = games.results[0];

    if (recommendedGame == null || firstGameSearchResult == null) {
      return [];
    }

    return {
      id: firstGameSearchResult.slug,
      data: firstGameSearchResult,
      explanation: recommendedGame.explanation,
    };
  });
}

export async function fetchGamesData(_gameId: string) {
  return await _fetchGamesData(_gameId);
}

export type FetchGameDataResult = Awaited<ReturnType<typeof fetchGamesData>>;

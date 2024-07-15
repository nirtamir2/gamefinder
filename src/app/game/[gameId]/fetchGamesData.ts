import { recommendGamesWithAI } from "@/app/game/[gameId]/action";
import { fetchGames } from "@/lib/fetchGames";

async function _fetchGamesData(gameId: string) {
  const aiRecommendationResult = await recommendGamesWithAI({
    likedGames: [gameId],
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
    const gameData = games.results[0];
    if (recommendedGame == null || gameData == null) {
      return [];
    }
    return {
      id: recommendedGame.name,
      data: gameData,
      explanation: recommendedGame.explanation,
    };
  });
}

export async function fetchGamesData(_gameId: string) {
  return await _fetchGamesData(_gameId);
}

export type FetchGameDataResult = Awaited<ReturnType<typeof fetchGamesData>>;

import { recommendGamesWithAI } from "@/app/game/[gameId]/action";
import { populateGameMovies } from "@/lib/populateGameMovies";
import { populatedGame } from "@/lib/populatedGame";
import { searchGames } from "@/lib/searchGames";

export async function fetchGamesData(gameId: string) {
  const aiRecommendationResult = await recommendGamesWithAI({
    likedGames: [gameId],
    // TODO: use the url for that
    genre: "RPG",
    platforms: ["XBOX", "PC"],
  });
  const gamesSearchResults = await Promise.all(
    aiRecommendationResult.games.map((game) => {
      return searchGames(game.name);
    }),
  );

  const searchedGames = gamesSearchResults.flatMap((games, index) => {
    const recommendedGame = aiRecommendationResult.games[index];
    const firstGameSearchResult = games.results[0];

    if (recommendedGame == null || firstGameSearchResult == null) {
      return [];
    }

    return {
      id: firstGameSearchResult.slug,
      slug: firstGameSearchResult.slug,
      searchData: firstGameSearchResult,
      explanation: recommendedGame.explanation,
    };
  });

  const gameSlugs = searchedGames.map((game) => game.slug);
  const populatedGames = await Promise.all(
    gameSlugs.map((slug) => populatedGame(slug)),
  );
  const populatedGameMovies = await Promise.all(
    gameSlugs.map((slug) => populateGameMovies(slug)),
  );

  return searchedGames.flatMap((searchedGame, index) => {
    const gameData = populatedGames[index];
    const gameMovies = populatedGameMovies[index];
    if (gameMovies == null || gameData == null) {
      return [];
    }
    return {
      ...searchedGame,
      gameData,
      gameMovies,
    };
  });
}

export type FetchGameDataResult = Awaited<ReturnType<typeof fetchGamesData>>;

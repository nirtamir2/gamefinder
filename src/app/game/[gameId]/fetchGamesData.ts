import "server-only";
import { recommendGamesWithAI } from "@/app/game/[gameId]/actions/recommendGamesWithAI.action";
import { mockData } from "@/app/mocks/mock-data";
import { env } from "@/env";
import {
  createFirebaseCustomDataEntry,
  fetchGameFromFirebase,
  getFirebaseCustomDataEntry,
  initFirebaseFetchGameCount,
  updateFirebaseFetchGameCount,
  updateFirebaseFetchedGame,
} from "@/firebase/firebaseFirestoreFunctions";
import { populateGameMovies } from "@/lib/populateGameMovies";
import { populatedGame } from "@/lib/populatedGame";
import { searchGames } from "@/lib/searchGames";

async function fetchGameDataFromApi(gameSlug: string) {
  const [populatedGameData, populatedGameMovies] = await Promise.all([
    populatedGame(gameSlug),
    populateGameMovies(gameSlug),
  ]);
  return { populatedGameData, populatedGameMovies };
}

export async function fetchGamesData({
  likedGames,
  genres,
  platforms,
}: {
  likedGames: Array<string>;
  genres: Array<string> | null;
  platforms: Array<string> | null;
}) {
  if (env.IS_MOCK_DATA) {
    return mockData;
  }
  const aiRecommendationResult = await recommendGamesWithAI({
    likedGames,
    genres,
    platforms,
  });
  const gamesSearchResults = await Promise.allSettled(
    aiRecommendationResult.games.map((game) => {
      return searchGames(game.name);
    }),
  );

  const searchedGames = gamesSearchResults
    .flatMap((a) => (a.status === "fulfilled" ? a.value : []))
    .flatMap((games, index) => {
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

  const gameSearches = searchedGames.map((game) => {
    return {
      slug: game.slug,
      searchData: game.searchData,
      explanation: game.explanation,
    };
  });

  return await Promise.all(
    gameSearches.map(async ({ slug, searchData, explanation }) => {
      const fetchedGameDoc = await fetchGameFromFirebase(slug);
      if (!fetchedGameDoc.exists()) {
        const { populatedGameData, populatedGameMovies } =
          await fetchGameDataFromApi(slug);
        await Promise.all([
          updateFirebaseFetchedGame(slug, {
            id: slug,
            slug,
            gameData: populatedGameData,
            gameMovies: populatedGameMovies,
            searchData,
          }),
          createFirebaseCustomDataEntry(slug),
        ]);

        await initFirebaseFetchGameCount(slug);

        return {
          ...searchData,
          id: slug,
          explanation,
          gameData: populatedGameData,
          gameMovies: populatedGameMovies,
          customGameData: null,
        };
      }

      await updateFirebaseFetchGameCount(slug);

      const data = fetchedGameDoc.data() as Awaited<
        Parameters<typeof updateFirebaseFetchedGame>[1]
      >;
      const customGameData = await getFirebaseCustomDataEntry(slug);
      return {
        ...searchData,
        id: slug,
        explanation,
        gameData: data.gameData,
        gameMovies: data.gameMovies,
        customGameData,
      };
    }),
  );
}

export type FetchGameDataResult = Awaited<ReturnType<typeof fetchGamesData>>;

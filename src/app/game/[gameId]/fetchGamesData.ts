import "server-only";
import {
  collection,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { recommendGamesWithAI } from "@/app/game/[gameId]/actions/recommendGamesWithAI.action";
import { mockData } from "@/app/mocks/mock-data";
import { env } from "@/env";
import { firebaseFirestore } from "@/firebase/firebaseFirestore";
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

async function fetchGameFromFirebase(gameSlug: string) {
  return await getDoc(
    doc(collection(firebaseFirestore, "fetched_games"), gameSlug),
  );
}

function updateFirebaseFetchedGame(
  gameSlug: string,
  data: {
    id: string;
    slug: string;
    gameData: Awaited<ReturnType<typeof populatedGame>>;
    gameMovies: Awaited<ReturnType<typeof populateGameMovies>>;
    searchData: NonNullable<
      Awaited<ReturnType<typeof searchGames>>["results"][0]
    >;
  },
) {
  return setDoc(doc(firebaseFirestore, "fetched_games", gameSlug), data);
}

function createFirebaseCustomDataEntry(gameSlug: string) {
  return setDoc(doc(firebaseFirestore, "custom_game_data", gameSlug), {
    assets: [{ type: "video", src: "" }],
  });
}

function updateFirebaseFetchGameCount(gameSlug: string) {
  return updateDoc(doc(firebaseFirestore, "retrieved_game_count", gameSlug), {
    count: increment(1),
  });
}
function initFirebaseFetchGameCount(gameSlug: string) {
  return setDoc(doc(firebaseFirestore, "retrieved_game_count", gameSlug), {
    count: 0,
  });
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

  const gameSearches = searchedGames.map((game) => {
    return { slug: game.slug, searchData: game.searchData };
  });

  return await Promise.all(
    gameSearches.map(async ({ slug, searchData }) => {
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
          gameData: populatedGameData,
          gameMovies: populatedGameMovies,
        };
      }

      await updateFirebaseFetchGameCount(slug);

      const data = fetchedGameDoc.data() as Awaited<
        Parameters<typeof updateFirebaseFetchedGame>[1]
      >;
      return {
        ...searchData,
        id: slug,
        gameData: data.gameData,
        gameMovies: data.gameMovies,
      };
    }),
  );
}

export type FetchGameDataResult = Awaited<ReturnType<typeof fetchGamesData>>;

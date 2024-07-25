import {
  collection,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseFirestore } from "@/firebase/firebaseFirestore";
import type { populateGameMovies } from "@/lib/populateGameMovies";
import type { populatedGame } from "@/lib/populatedGame";
import type { searchGames } from "@/lib/searchGames";

const firestoreCollection = {
  retrieved_game_count: "retrieved_game_count",
  custom_game_data: "custom_game_data",
  fetched_games: "fetched_games",
} as const;

export function updateFirebaseFetchGameCount(gameSlug: string) {
  return updateDoc(
    doc(firebaseFirestore, firestoreCollection.retrieved_game_count, gameSlug),
    {
      count: increment(1),
    },
  );
}

export function initFirebaseFetchGameCount(gameSlug: string) {
  return setDoc(
    doc(firebaseFirestore, firestoreCollection.retrieved_game_count, gameSlug),
    {
      count: 0,
    },
  );
}

export function createFirebaseCustomDataEntry(gameSlug: string) {
  return setDoc(
    doc(firebaseFirestore, firestoreCollection.custom_game_data, gameSlug),
    {
      assets: [{ type: "video", src: "" }],
    },
  );
}

export async function fetchGameFromFirebase(gameSlug: string) {
  return await getDoc(
    doc(
      collection(firebaseFirestore, firestoreCollection.fetched_games),
      gameSlug,
    ),
  );
}

export function updateFirebaseFetchedGame(
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
  return setDoc(
    doc(firebaseFirestore, firestoreCollection.fetched_games, gameSlug),
    data,
  );
}

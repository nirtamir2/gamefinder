import { collection, getDocs } from "firebase/firestore";
import { PopulateFirestoreDBButton } from "@/app/debug/PopulateFirestoreDBButton";
import { firebaseFirestore } from "@/firebase/firebaseFirestore";
import type { FirebaseCustomGameDataResult } from "@/firebase/firebaseFirestoreFunctions";
import { firestoreCollection } from "@/firebase/firestoreCollection";

const exampleAsset = [
  { type: "video", src: "" },
  { type: "video", src: "" },
];

async function fetchDebugData() {
  const [customGameData, retrievedGameCountData] = await Promise.all([
    getDocs(
      collection(firebaseFirestore, firestoreCollection.custom_game_data),
    ),
    getDocs(
      collection(firebaseFirestore, firestoreCollection.retrieved_game_count),
    ),
  ]);

  const customGameDataDocs = Object.assign(
    {},
    ...customGameData.docs.map((a) => {
      return {
        [a.id]: a.data() as FirebaseCustomGameDataResult,
      };
    }),
  );

  const retrievedGameCountDataDocs: Record<string, number> = Object.assign(
    {},
    ...retrievedGameCountData.docs.map((a) => {
      return {
        [a.id]: (a.data() as { count: number }).count,
      };
    }),
  );

  return Object.entries(retrievedGameCountDataDocs)
    .map(([key, count]) => {
      return {
        key,
        count,
        assets: customGameDataDocs[key].assets,
      };
    })
    .filter((a) => a.assets.length === 0)
    .toSorted((a, b) => (a.count > b.count ? -1 : a.count === b.count ? 0 : 1));
}

export default async function DebugGamesPage() {
  const finalData = await fetchDebugData();

  return (
    <main>
      <div>
        <PopulateFirestoreDBButton />
      </div>
      <div className="text-2xl">Example</div>
      <pre>{JSON.stringify(exampleAsset, null, 2)}</pre>
      <hr />
      <div className="text-2xl">Data</div>
      <pre>{JSON.stringify(finalData, null, 2)}</pre>
    </main>
  );
}

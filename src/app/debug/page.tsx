import { collection, getDocs } from "firebase/firestore";
import { firebaseFirestore } from "@/firebase/firebaseFirestore";
import type { FirebaseCustomGameDataResult } from "@/firebase/firebaseFirestoreFunctions";
import { firestoreCollection } from "@/firebase/firestoreCollection";

const exampleAsset = [
  { type: "video", src: "" },
  { type: "video", src: "" },
];

export default async function DebugGamesPage() {
  const customGameData = await getDocs(
    collection(firebaseFirestore, firestoreCollection.custom_game_data),
  );

  const customGameDataDocs = Object.assign(
    {},
    ...customGameData.docs.map((a) => {
      return {
        [a.id]: a.data() as FirebaseCustomGameDataResult,
      };
    }),
  );

  const retrievedGameCountData = await getDocs(
    collection(firebaseFirestore, firestoreCollection.retrieved_game_count),
  );

  const retrievedGameCountDataDocs: Record<string, number> = Object.assign(
    {},
    ...retrievedGameCountData.docs.map((a) => {
      return {
        [a.id]: (a.data() as { count: number }).count,
      };
    }),
  );

  const finalData = Object.entries(retrievedGameCountDataDocs)
    .map(([key, count]) => {
      return {
        key,
        count,
        assets: customGameDataDocs[key].assets,
      };
    })
    .filter((a) => a.assets.length === 0)
    .toSorted((a, b) => (a.count > b.count ? -1 : a.count === b.count ? 0 : 1));

  return (
    <main>
      <div className="text-2xl">Example</div>
      <pre>{JSON.stringify(exampleAsset, null, 2)}</pre>
      <hr />
      <div className="text-2xl">Data</div>
      <pre>{JSON.stringify(finalData, null, 2)}</pre>
    </main>
  );
}

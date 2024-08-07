"use client";

import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firebaseFirestore } from "@/firebase/firebaseFirestore";
import type { FirebaseCustomGameDataResult } from "@/firebase/firebaseFirestoreFunctions";
import { firestoreCollection } from "@/firebase/firestoreCollection";
import { fetchPublicStorageAssets } from "@/lib/fetchPublicStorageAssets";

type Data = {
  type: string;
  slug: string;
  publicUrl: string;
};

function groupItemsBySlug(items: Array<Data>): Record<string, Array<Data>> {
  // eslint-disable-next-line unicorn/no-array-reduce
  return items.reduce((acc: Record<string, Array<Data>>, data) => {
    if (acc[data.slug] == null) {
      acc[data.slug] = [];
    }
    acc[data.slug]?.push(data);
    return acc;
  }, {});
}

export function PopulateFirestoreDBButton() {
  const [state, setState] = useState({});

  async function handlePopulateDB() {
    const allStorageAssets = await fetchPublicStorageAssets();
    const assetsBySlug = groupItemsBySlug(allStorageAssets);

    setState(assetsBySlug);

    await Promise.all(
      Object.entries(assetsBySlug).map(([slug, assets]) => {
        const data: FirebaseCustomGameDataResult = {
          assets: assets.map((asset) => {
            return {
              type: asset.type === "mp4" ? "video" : "image",
              src: asset.publicUrl,
            };
          }),
        };
        return setDoc(
          doc(firebaseFirestore, firestoreCollection.custom_game_data, slug),
          data,
        );
      }),
    );
  }

  return (
    <div>
      <button type="button" onClick={handlePopulateDB}>
        Populate firestore
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

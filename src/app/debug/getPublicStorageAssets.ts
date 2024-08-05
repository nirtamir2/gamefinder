import { listAll, ref } from "firebase/storage";
import { firebaseStorage } from "@/firebase/firebaseStorage";

function getStoragePublicFullPathUrl(firestoreFullPath: string) {
  return `https://firebasestorage.googleapis.com/v0/b/gamefinder-4e85d.appspot.com/o/${encodeURIComponent(firestoreFullPath)}?alt=media`;
}

function parseFilename(
  filename: string,
): { slug: string; type: string } | null {
  const regex = /^(.+?)-\d+\.(\w+)$/;
  const match = filename.match(regex);

  return match != null && match[1] != null && match[2] != null
    ? {
        slug: match[1],
        type: match[2],
      }
    : null;
}

export async function getPublicStorageAssets() {
  const listRef = ref(firebaseStorage, "public");
  const items = await listAll(listRef);
  return items.items.flatMap((item) => {
    const firestoreFullPath = item.fullPath;
    const publicUrl = getStoragePublicFullPathUrl(firestoreFullPath);
    const parsedFileName = parseFilename(item.name);
    if (parsedFileName != null) {
      const { type, slug } = parsedFileName;
      return {
        type,
        slug,
        publicUrl,
      };
    }

    return [];
  });
}

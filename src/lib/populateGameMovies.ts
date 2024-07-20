import { env } from "@/env";

interface Root {
  count: number;
  next: null;
  previous: null;
  results: Array<Result>;
}

interface Result {
  id: number;
  name: string;
  preview: string;
  data: Data;
}

interface Data {
  "480": string;
  max: string;
}

export async function populateGameMovies(slug: string) {
  const response = await fetch(
    `https://api.rawg.io/api/games/${slug}/movies?key=${env.RAWG_API_KEY}`,
  );
  return (await response.json()) as Root;
}

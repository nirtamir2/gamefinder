import { fetchGames } from "@/lib/fetchGames";

export default async function Home() {
const games = await fetchGames("gta");
const game = games.results[0]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <pre className="w-60">{JSON.stringify(game, null, 2)}</pre>
    </main>
  );
}

import { recommendGamesWithAI } from "@/app/game/[gameId]/action";

export default async function GamePage(props: { params: { gameId: string } }) {
  const { params } = props;
  const { gameId } = params;
  const games = await recommendGamesWithAI({ likedGames: [gameId] });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <pre className="w-60">{JSON.stringify(games, null, 2)}</pre>
    </main>
  );
}

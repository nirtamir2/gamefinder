import { cache } from "react";
import { GamesCarousel } from "@/app/game/[gameId]/GamesCarousel";
import { fetchGamesData as _fetchGamesData } from "@/app/game/[gameId]/fetchGamesData";

const fetchGamesData = cache(_fetchGamesData);

export default async function GamePage(props: { params: { gameId: string } }) {
  const { params } = props;
  const { gameId } = params;

  const games = await fetchGamesData(decodeURIComponent(gameId));

  return (
    <main className="container min-h-screen">
      <GamesCarousel games={games} />
    </main>
  );
}

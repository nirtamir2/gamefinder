import { cache } from "react";
import { GamesCarousel } from "@/app/game/[gameId]/GamesCarousel";
import { fetchGamesData as _fetchGamesData } from "@/app/game/[gameId]/fetchGamesData";

const fetchGamesData = cache(_fetchGamesData);

export default async function GamePage(props: {
  searchParams?: {
    likedGames?: undefined | string | Array<string>;
    genres?: undefined | string | Array<string>;
    platforms?: undefined | string | Array<string>;
  };
}) {
  const { searchParams } = props;
  const likedGames =
    searchParams?.likedGames == null ? [] : [searchParams.likedGames].flat();
  const genres =
    searchParams?.genres == null ? [] : [searchParams.genres].flat();
  const platforms =
    searchParams?.platforms == null ? [] : [searchParams.platforms].flat();

  if (likedGames.length === 0) {
    throw new Error("Game not set");
  }

  const games = await fetchGamesData({
    likedGames,
    genres,
    platforms,
  });

  return (
    <main className="container min-h-screen">
      <GamesCarousel games={games} />
    </main>
  );
}

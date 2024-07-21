import { cache } from "react";
import { parseAsArrayOf, parseAsString } from "nuqs/server";
import { fetchGamesData as _fetchGamesData } from "@/app/game/[gameId]/fetchGamesData";
import { GamesCarousel } from "@/components/GamesCarousel";
import { ModifySearchDrawer } from "@/components/ModifySearchDrawer";

const fetchGamesData = cache(_fetchGamesData);

const stringArraySchema = parseAsArrayOf(parseAsString).withDefault([]);

export default async function GamePage(props: {
  searchParams?: {
    likedGames?: undefined | string | Array<string>;
    genres?: undefined | string | Array<string>;
    platforms?: undefined | string | Array<string>;
  };
}) {
  const { searchParams } = props;
  const likedGames = stringArraySchema.parseServerSide(
    searchParams?.likedGames,
  );
  const genres = stringArraySchema.parseServerSide(searchParams?.genres);
  const platforms = stringArraySchema.parseServerSide(searchParams?.platforms);

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
      <div className="fixed left-0 top-0 z-10 w-full bg-gradient-to-b from-background to-transparent p-8">
        <ModifySearchDrawer />
      </div>
      <GamesCarousel games={games} />
    </main>
  );
}

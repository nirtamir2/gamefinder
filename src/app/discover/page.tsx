"use client";

import { Games } from "@/components/Games";
import { GameProvider } from "@/components/providers/GameProvider";
import { stringArraySchema } from "@/utils/stringArraySchema";

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

  return (
    <GameProvider
      initialLikedGames={likedGames}
      initialGenres={genres}
      initialPlatforms={platforms}
    >
      <Games />
    </GameProvider>
  );
}

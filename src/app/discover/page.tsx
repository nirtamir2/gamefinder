"use client";

import { SearchParametersProviderProvider } from "@/app/GamesProvider";
import { Games } from "@/app/discover/Games";
import { DiscoverGamesDrawer } from "@/components/DiscoverGamesDrawer";
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
    <SearchParametersProviderProvider
      initialLikedGames={likedGames}
      initialGenres={genres}
      initialPlatforms={platforms}
    >
      <main className="container min-h-dvh">
        <div className="fixed left-0 top-0 z-10 w-full bg-gradient-to-b from-background to-transparent p-8">
          <DiscoverGamesDrawer
            trigger={<div className="text-white underline">Modify search</div>}
            triggerAsChild={false}
          />
        </div>
        <Games />
      </main>
    </SearchParametersProviderProvider>
  );
}

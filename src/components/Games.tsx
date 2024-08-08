"use client";

import LoadingPage from "@/app/debug/loading/page";
import ErrorPage from "@/app/discover/error";
import { DiscoverGamesDrawer } from "@/components/DiscoverGamesDrawer";
import { GamesCarousel } from "@/components/GamesCarousel";
import { useGameProvider } from "@/components/providers/GameContext";
import { IconButton } from "@/components/ui/IconButton";
import type { FetchGameDataResult } from "@/lib/fetchGamesData";
import { useGamesQuery } from "@/react-query/useGamesQuery";

function DiscoverGamesPage(props: { games: FetchGameDataResult }) {
  const { games } = props;

  return (
    <main className="container min-h-dvh">
      <div className="fixed left-0 top-0 z-10 w-full bg-gradient-to-b from-background to-transparent p-8">
        <div className="flex justify-center pt-4">
          <DiscoverGamesDrawer
            triggerAsChild
            trigger={<IconButton iconName="settings">Modify search</IconButton>}
          />
        </div>
      </div>
      <GamesCarousel games={games} />
    </main>
  );
}

export function Games() {
  const { likedGames, genres, platforms } = useGameProvider();
  const { data, isPending, error, isSuccess } = useGamesQuery({
    likedGames,
    genres,
    platforms,
  });
  if (isPending) {
    return <LoadingPage />;
  }
  if (error) {
    return <ErrorPage error={error} />;
  }
  if (isSuccess) {
    return <DiscoverGamesPage games={data} />;
  }
  return null;
}

"use client";

import { pathFor } from "@nirtamir2/next-static-paths";
import Image from "next/image";
import Link from "next/link";
import LoadingPage from "@/app/debug/loading/page";
import ErrorPage from "@/app/discover/error";
import cubeImageSrc from "@/assets/cube.png";
import { DiscoverGamesDesktopForm } from "@/components/DiscoverGamesDesktopForm";
import { DiscoverGamesDrawer } from "@/components/DiscoverGamesDrawer";
import { GamesCarousel } from "@/components/GamesCarousel";
import { useMediaQuery } from "@/components/hooks/useMediaQuery";
import { useGameProvider } from "@/components/providers/GameContext";
import { IconButton } from "@/components/ui/IconButton";
import type { FetchGameDataResult } from "@/lib/fetchGamesData";
import { useGamesQuery } from "@/react-query/useGamesQuery";

function DiscoverGamesPage(props: { games: FetchGameDataResult }) {
  const { games } = props;
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  return (
    <main className="container flex min-h-dvh flex-col xl:max-w-full">
      <div className="left-0 top-0 z-10 h-0 w-full xl:sticky">
        {isDesktop ? (
          <header className="flex h-header w-full justify-between">
            <Link href={pathFor("/")} className="h-0 shrink-0">
              <Image
                src={cubeImageSrc}
                height={133}
                width={133}
                alt="gameplays.io logo"
              />
            </Link>
            <div className="flex w-full items-center justify-center bg-black/20 bg-gradient-to-b from-background to-transparent pr-32 pt-12">
              <DiscoverGamesDesktopForm />
            </div>
          </header>
        ) : (
          <div className="flex justify-center bg-gradient-to-b from-background to-transparent px-8 pb-8 pt-12">
            <DiscoverGamesDrawer
              triggerAsChild
              trigger={
                <IconButton iconName="settings">Modify search</IconButton>
              }
            />
          </div>
        )}
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

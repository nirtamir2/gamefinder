"use client";

import { type ReactNode, useMemo, useState } from "react";
import { pathFor } from "@nirtamir2/next-static-paths";
import { useRouter } from "next/navigation";
import { createSerializer } from "nuqs/server";
import { stringArraySchema } from "@/utils/stringArraySchema";
import { GameContext } from "./GameContext";

type Props = {
  children: ReactNode;
  initialLikedGames?: Array<string>;
  initialGenres?: Array<string>;
  initialPlatforms?: Array<string>;
};
export const GameProvider = ({
  children,
  initialLikedGames,
  initialGenres,
  initialPlatforms,
}: Props) => {
  const [likedGames, setLikedGames] = useState(initialLikedGames ?? []);
  const [genres, setGenres] = useState(initialGenres ?? []);
  const [platforms, setPlatforms] = useState(initialPlatforms ?? []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  const value = useMemo(() => {
    function updateSearchParameters({
      likedGames,
      genres,
      platforms,
    }: {
      likedGames: Array<string>;
      genres: Array<string>;
      platforms: Array<string>;
    }) {
      setLikedGames(likedGames);
      setGenres(genres);
      setPlatforms(platforms);
      setIsDrawerOpen(false);

      const searchParamsSchemaSerializer = createSerializer({
        likedGames: stringArraySchema,
        genres: stringArraySchema,
        platforms: stringArraySchema,
      });

      const searchParams = searchParamsSchemaSerializer({
        likedGames: stringArraySchema.parseServerSide(likedGames),
        genres: stringArraySchema.parseServerSide(genres),
        platforms: stringArraySchema.parseServerSide(platforms),
      });

      const url = `${pathFor("/discover")}${searchParams}`;
      router.push(url);
    }

    return {
      likedGames,
      genres,
      platforms,
      updateSearchParameters,
      isDrawerOpen,
      setIsDrawerOpen,
    };
  }, [genres, isDrawerOpen, likedGames, platforms, router]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

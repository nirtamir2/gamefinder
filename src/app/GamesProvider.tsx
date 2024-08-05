"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { pathFor } from "@nirtamir2/next-static-paths";
import { useRouter } from "next/navigation";
import { createSerializer } from "nuqs/server";
import { stringArraySchema } from "@/utils/stringArraySchema";

type ContextType = {
  likedGames: Array<string>;
  genres: Array<string>;
  platforms: Array<string>;
  updateSearchParameters: (searchParameters: {
    likedGames: Array<string>;
    genres: Array<string>;
    platforms: Array<string>;
  }) => void;
};

const SearchParametersProviderContext = createContext<ContextType>({
  likedGames: [],
  genres: [],
  platforms: [],
  updateSearchParameters: () => {
    // do nothing
  },
});

type Props = {
  children: ReactNode;
  initialLikedGames?: Array<string>;
  initialGenres?: Array<string>;
  initialPlatforms?: Array<string>;
};

export const SearchParametersProviderProvider = ({
  children,
  initialLikedGames,
  initialGenres,
  initialPlatforms,
}: Props) => {
  const [likedGames, setLikedGames] = useState(initialLikedGames ?? []);
  const [genres, setGenres] = useState(initialGenres ?? []);
  const [platforms, setPlatforms] = useState(initialPlatforms ?? []);
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
    };
  }, [genres, likedGames, platforms, router]);

  return (
    <SearchParametersProviderContext.Provider value={value}>
      {children}
    </SearchParametersProviderContext.Provider>
  );
};

export const useSearchParametersProvider = () => {
  return useContext(SearchParametersProviderContext);
};

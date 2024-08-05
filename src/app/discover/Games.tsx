"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParametersProvider } from "@/app/GamesProvider";
import ErrorPage from "@/app/discover/error";
import { fetchGamesData } from "@/app/discover/fetchGamesData";
import { GamesCarousel } from "@/components/GamesCarousel";
import { Loader } from "@/components/ui/Loader/Loader";

export function Games() {
  const { likedGames, genres, platforms } = useSearchParametersProvider();
  const { data, isPending, error, isSuccess } = useQuery({
    staleTime: Infinity,
    queryKey: ["discover", { likedGames, genres, platforms }],
    queryFn: () =>
      fetchGamesData({
        likedGames,
        genres,
        platforms,
      }),
  });
  if (isPending) {
    return <Loader />;
  }
  if (error) {
    return <ErrorPage error={error} />;
  }
  if (isSuccess) {
    return <GamesCarousel games={data} />;
  }
  return null;
}

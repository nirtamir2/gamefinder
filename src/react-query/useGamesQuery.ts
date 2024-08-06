import { useQuery } from "@tanstack/react-query";
import { fetchGamesData } from "@/lib/fetchGamesData";

export function useGamesQuery({
  likedGames,
  genres,
  platforms,
}: {
  likedGames: Array<string>;
  genres: Array<string>;
  platforms: Array<string>;
}) {
  return useQuery({
    staleTime: Infinity,
    queryKey: ["discover" as const, { likedGames, genres, platforms }],
    queryFn: async () => {
      return await fetchGamesData({
        likedGames,
        genres,
        platforms,
      });
    },
  });
}

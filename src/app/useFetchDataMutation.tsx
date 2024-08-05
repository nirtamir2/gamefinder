import { useMutation } from "@tanstack/react-query";
import { fetchGamesData } from "@/app/discover/fetchGamesData";

export function useFetchDataMutation() {
  return useMutation({ mutationFn: fetchGamesData });
}

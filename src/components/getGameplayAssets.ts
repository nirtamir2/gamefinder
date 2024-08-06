import type { FetchGameDataResult } from "@/lib/fetchGamesData";

export function getGameplayAssets({
  game,
}: {
  game: FetchGameDataResult[number];
}) {
  const { assets } = game.customGameData ?? { assets: [] };

  const apiVideoAssets = game.gameMovies.results.map((result) => ({
    type: "video" as const,
    src: result.data.max,
  }));
  const apiImageAssets = [
    {
      type: "image" as const,
      src:
        game.gameData.background_image_additional ??
        game.gameData.background_image,
    },
  ];

  const combineAssets: Array<{ type: "video" | "image"; src: string }> =
    assets.length > 0
      ? assets
      : apiVideoAssets.length > 0
        ? apiVideoAssets
        : apiImageAssets;
  return combineAssets;
}

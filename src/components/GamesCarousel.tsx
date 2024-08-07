import { GameHeader } from "@/components/GameHeader";
import { GameplayAsset } from "@/components/GameplayAsset";
import { LearnMoreDrawer } from "@/components/LearnMoreDrawer";
import { getGameplayAssets } from "@/components/getGameplayAssets";
import { PlatformList } from "@/components/platform/PlatformList";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import type { FetchGameDataResult } from "@/lib/fetchGamesData";

export function GamesCarousel(props: { games: FetchGameDataResult }) {
  const { games } = props;

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
    >
      <CarouselContent>
        {games.map((game) => {
          const assets = getGameplayAssets({
            game,
          });
          return (
            <CarouselItem key={game.id}>
              <div key={game.id} className="relative size-full">
                {assets.map((asset, index) => {
                  if (index === 0) {
                    return (
                      <GameplayAsset
                        key={asset.src}
                        asset={asset}
                        gameData={game.gameData}
                      />
                    );
                  }
                  return null;
                })}
                <div className="absolute bottom-0 z-10 w-full bg-gradient-to-b from-transparent via-background via-50% to-background p-8 sm:p-24">
                  <GameHeader
                    name={game.gameData.name}
                    rating={game.gameData.rating}
                  />
                  <div className="pt-2 text-lg text-white">
                    {game.explanation}
                  </div>
                  <div className="pt-4">
                    <PlatformList gameData={game.gameData} />
                  </div>
                  <div className="pt-8">
                    <LearnMoreDrawer game={game} />
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="absolute -left-10 top-1/2 hidden bg-green-200 md:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}

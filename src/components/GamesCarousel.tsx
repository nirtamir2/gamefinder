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
              <div key={game.id} className="relative block size-full sm:flex">
                {assets.map((asset, index) => {
                  if (index === 0) {
                    return (
                      <div key={asset.src} className="relative size-full">
                        <GameplayAsset asset={asset} gameData={game.gameData} />
                      </div>
                    );
                  }
                  return null;
                })}
                <div className="absolute bottom-0 z-10 w-full bg-gradient-to-b from-transparent via-background via-50% to-background p-8 sm:relative sm:flex sm:flex-col sm:py-40">
                  <GameHeader
                    name={game.gameData.name}
                    rating={game.gameData.rating}
                  />
                  <div className="pt-2 leading-snug text-white">
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
      <div className="absolute bottom-40 left-1/2 hidden sm:block">
        <div className="flex flex-col gap-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
    </Carousel>
  );
}

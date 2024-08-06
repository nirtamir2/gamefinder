import type { FetchGameDataResult } from "@/app/discover/fetchGamesData";
import { GameplayAsset } from "@/components/GameplayAsset";
import { PlatformList } from "@/components/PlatformList";
import { getGameplayAssets } from "@/components/getGameplayAssets";
import { Button } from "@/components/ui/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";

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
                  <div>
                    <span className="inline pb-4 pr-4 text-2xl font-semibold text-white">
                      {game.gameData.name}
                    </span>
                    <span className="inline rounded-md bg-green-500 px-2.5 py-1 align-text-top text-sm font-bold text-black">
                      {Math.round(game.gameData.rating * 20)}
                    </span>
                  </div>
                  <div className="pt-2 text-lg text-white">
                    {game.explanation}
                  </div>
                  <div className="pt-4">
                    <PlatformList gameData={game.gameData} />
                  </div>
                  <div className="pt-8">
                    <Button>Buy Game</Button>
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

import { useRef } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
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
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      plugins={[WheelGesturesPlugin()]}
    >
      <CarouselContent ref={ref}>
        {games.map((game) => {
          const assets = getGameplayAssets({
            game,
          });
          return (
            <CarouselItem key={game.id}>
              <div
                key={game.id}
                className="size-full xl:flex xl:items-center xl:justify-center"
              >
                <div className="relative size-full xl:max-h-desktop-video xl:max-w-desktop-carousel xl:pt-20">
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
                  <div className="absolute right-0 z-10 w-full max-xl:bottom-0 xl:top-0 xl:size-0 xl:pt-20">
                    <div className="z-10 w-full bg-gradient-to-b from-transparent via-background via-50% to-background p-8 xl:relative xl:flex xl:w-96 xl:flex-col xl:pt-0">
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
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div
        className="absolute hidden w-full justify-center xl:flex"
        style={{
          bottom: `calc((100vh - var(--desktop-video-max-height)) / 2)`,
        }}
      >
        <div className="relative w-desktop-carousel">
          <div className="absolute -right-20 bottom-0">
            <div className="flex flex-col gap-4">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}

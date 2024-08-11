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
              <div
                key={game.id}
                className="size-full xl:flex xl:justify-center"
                style={{
                  maxHeight: "1100px",
                }}
              >
                <div
                  className="relative flex size-full flex-col justify-center xl:max-w-[450px]"
                  style={{ maxHeight: "1100px" }}
                >
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
                  <div className="absolute right-0 z-10 w-full max-xl:bottom-0 xl:top-0 xl:size-0">
                    <div className="z-10 w-full bg-gradient-to-b from-transparent via-background via-50% to-background p-8 xl:relative xl:flex xl:w-96 xl:flex-col xl:pb-[100px] xl:pt-[180px]">
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

                      <div className="items-left hidden flex-col gap-4 pt-8 xl:flex">
                        <CarouselPrevious />
                        <CarouselNext />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}

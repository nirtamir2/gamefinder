import type { FetchGameDataResult } from "@/app/game/[gameId]/fetchGamesData";
import { HorizontalGameCarousel } from "@/components/HorizontalGameCarousel";
import {
  PlatformIcon,
  getUnifiedPlatformName,
} from "@/components/PlatformIcon";
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
          const uniqPlatformNames = [
            ...new Set(
              game.gameData.platforms.map((platform) =>
                getUnifiedPlatformName(platform.platform.slug),
              ),
            ),
          ].filter((platformName) => platformName != null);
          return (
            <CarouselItem key={game.id}>
              <div key={game.id} className="relative size-full">
                <HorizontalGameCarousel
                  game={game}
                  customGameData={game.customGameData}
                />
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
                  <ul className="flex flex-wrap items-center gap-2">
                    {uniqPlatformNames.map((platformName) => {
                      return (
                        <li key={platformName}>
                          <PlatformIcon platform={platformName} />
                        </li>
                      );
                    })}
                  </ul>
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

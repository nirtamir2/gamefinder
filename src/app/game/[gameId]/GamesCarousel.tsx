import Image from "next/image";
import type { FetchGameDataResult } from "@/app/game/[gameId]/fetchGamesData";
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
        {games.map((game) => (
          <CarouselItem key={game.id}>
            <div key={game.id} className="relative size-full">
              {game.gameData.background_image == null ? (
                <div className="size-full bg-background"></div>
              ) : (
                <Image
                  fill
                  style={{
                    objectFit: "cover",
                    userSelect: "none",
                  }}
                  sizes="100vw"
                  src={game.gameData.background_image}
                  alt=""
                />
              )}
              <div className="absolute bottom-0 z-10 w-full bg-gradient-to-b from-transparent via-background via-50% to-background p-8 sm:p-24">
                <div>
                  <div className="inline pb-4 pr-4 text-3xl font-semibold text-white">
                    {game.gameData.name}
                  </div>
                  <span className="rounded bg-green-500 p-1 text-xs text-black">
                    {Math.round(game.gameData.rating * 20)}
                  </span>
                </div>
                <div className="text-lg text-white">{game.gameData.slug}</div>
                <div className="flex flex-wrap gap-4">
                  {game.gameData.genres.map((genre) => {
                    return (
                      <div key={genre.id} className="text-lg text-white">
                        {genre.name}
                      </div>
                    );
                  })}
                </div>
                <div className="text-lg text-white">{game.explanation}</div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute -left-10 top-1/2 hidden bg-green-200 md:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}

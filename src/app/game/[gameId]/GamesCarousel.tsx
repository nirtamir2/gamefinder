import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import type { Result } from "@/lib/fetchGames";

export function GamesCarousel(props: { games: Array<Result> }) {
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
            <div key={game.name} className="relative h-full w-full">
              {game.background_image == null ? (
                <div className="size-full bg-background"></div>
              ) : (
                <Image
                  fill
                  style={{
                    objectFit: "cover",
                    userSelect: "none",
                  }}
                  sizes="100vw"
                  src={game.background_image}
                  alt=""
                />
              )}
              <div className="from-transparent absolute bottom-0 z-10 w-full bg-gradient-to-b via-background via-50% to-background p-8 sm:p-24">
                <div>
                  <div className="inline pb-4 pr-4 text-3xl font-semibold text-white">
                    {game.name}
                  </div>
                  <span className="bg-green-500 text-black rounded p-1 text-xs">
                    {Math.round(game.rating * 20)}
                  </span>
                </div>
                <div className="text-lg text-white">{game.released}</div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="bg-green-200 absolute -left-10 top-1/2 hidden md:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}

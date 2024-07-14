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
            <div key={game.name}>
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
              <div className="absolute bottom-0 z-10 w-full bg-gradient-to-b from-transparent to-background p-4">
                <div className="text-lg text-white">{game.name}</div>
                <div className="text-lg text-white">{game.released}</div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

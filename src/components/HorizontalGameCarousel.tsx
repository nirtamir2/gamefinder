import Image from "next/image";
import type { FetchGameDataResult } from "@/app/game/[gameId]/fetchGamesData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import type { FirebaseCustomGameDataResult } from "@/firebase/firebaseFirestoreFunctions";

export function HorizontalGameCarousel(props: {
  customGameData: FirebaseCustomGameDataResult | null;
  game: FetchGameDataResult[number];
}) {
  const { customGameData, game } = props;
  const { assets } = customGameData ?? { assets: [] };

  const fullImage =
    game.gameData.background_image == null ? (
      <div className="size-full bg-background"></div>
    ) : (
      <Image
        fill
        style={{
          objectFit: "cover",
          userSelect: "none",
        }}
        sizes="100vw"
        src={
          game.gameData.background_image_additional ??
          game.gameData.background_image
        }
        alt=""
      />
    );

  const apiVideoAssets = game.gameMovies.results.map((result) => ({
    type: "video",
    src: result.data.max,
  }));
  const apiImageAssets = [
    {
      type: "image",
      src:
        game.gameData.background_image_additional ??
        game.gameData.background_image,
    },
  ];

  const combineAssets =
    assets.length > 0
      ? assets
      : apiVideoAssets.length > 0
        ? apiVideoAssets
        : apiImageAssets;

  return (
    <Carousel>
      <CarouselContent>
        {combineAssets.map((asset) => {
          const imageOrVideo =
            asset.type === "image" ? (
              <Image
                fill
                style={{
                  objectFit: "cover",
                  userSelect: "none",
                }}
                sizes="100vw"
                src={asset.src}
                alt=""
              />
            ) : (
              <video
                playsInline
                autoPlay
                muted
                loop
                preload="auto"
                className="h-full object-cover"
              >
                <source src={asset.src} type="video/mp4" />
                {fullImage}
              </video>
            );

          return (
            <CarouselItem key={asset.src}>
              <div className="relative size-full">{imageOrVideo}</div>
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

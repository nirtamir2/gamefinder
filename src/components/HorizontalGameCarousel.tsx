import { GameplayAsset } from "@/components/GameplayAsset";
import { getGameplayAssets } from "@/components/getGameplayAssets";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import type { FirebaseCustomGameDataResult } from "@/firebase/firebaseFirestoreFunctions";
import type { FetchGameDataResult } from "@/lib/fetchGamesData";

export function HorizontalGameCarousel(props: {
  customGameData: FirebaseCustomGameDataResult | null;
  game: FetchGameDataResult[number];
}) {
  const { game } = props;
  const combineAssets = getGameplayAssets({ game });

  return (
    <Carousel>
      <CarouselContent>
        {combineAssets.map((asset) => {
          return (
            <CarouselItem key={asset.src}>
              <div className="relative size-full">
                <GameplayAsset asset={asset} gameData={game.gameData} />
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

import { GameHeader } from "@/components/GameHeader";
import { getGameplayAssets } from "@/components/getGameplayAssets";
import { Button } from "@/components/ui/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import { Icon } from "@/components/ui/icons/Icon";
import type { FetchGameDataResult } from "@/lib/fetchGamesData";

interface Props {
  game: FetchGameDataResult[number];
}

export function LearnMoreDrawer(props: Props) {
  const { game } = props;

  const gameplayVideos = getGameplayAssets({ game }).filter(
    (asset) => asset.type === "video",
  );
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Learn more</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="absolute right-4 top-4">
          <DrawerClose>
            <Icon name="x" height={24} width={24} className="text-white" />
            <div className="sr-only">Close</div>
          </DrawerClose>
        </div>
        <DrawerHeader>
          <DrawerTitle>
            <GameHeader
              name={game.gameData.name}
              rating={game.gameData.rating}
            />
          </DrawerTitle>
          <DrawerDescription>
            <div className="sr-only">Game details</div>
          </DrawerDescription>
        </DrawerHeader>
        <div className="container flex flex-col gap-6 px-8 pb-16 pt-8">
          <div className="pb-16 text-white">
            {game.gameData.description_raw}
          </div>
          {gameplayVideos.length > 0 ? (
            <div className="flex flex-col gap-8">
              <div className="font-bold text-white">Gameplay Videos:</div>
              <ul>
                {gameplayVideos.map((asset) => {
                  return (
                    <li key={asset.src}>
                      <a href={asset.src} className="text-white underline">
                        {asset.src}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
          <div className="font-bold text-white">Platforms:</div>
          <ul className="flex flex-col gap-6">
            {game.gameData.platforms.map((platform) => {
              return (
                <li key={platform.platform.id} className="text-white underline">
                  {platform.platform.name}
                </li>
              );
            })}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

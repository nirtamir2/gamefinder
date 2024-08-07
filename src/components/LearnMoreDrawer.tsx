import { GameHeader } from "@/components/GameHeader";
import { Button } from "@/components/ui/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsable";
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

function getYoutubeSearchUrl(youtubeSearchTerm: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(youtubeSearchTerm)}`;
}

function getGoogleSearchUrl(searchTerm: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
}

export function LearnMoreDrawer(props: Props) {
  const { game } = props;

  const youtubeSearchTerm = `${game.gameData.name} gameplay`;
  const youtubeSearchUrl = getYoutubeSearchUrl(youtubeSearchTerm);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Learn more</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="absolute right-6 top-6">
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
        <div className="container flex flex-col gap-6 px-8 pb-8">
          <Collapsible>
            <div className="relative max-h-32 overflow-hidden">
              <div className="pb-16 text-white">
                {game.gameData.description_raw}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
            </div>
            <CollapsibleTrigger asChild>
              <button>Read more</button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="pb-16 text-white">
                {game.gameData.description_raw}
              </div>
            </CollapsibleContent>
          </Collapsible>
          <div className="flex flex-col gap-8">
            <div className="font-bold text-white">Gameplay Videos:</div>
            <ul>
              <li>
                <a
                  rel="noopener noreferrer"
                  href={youtubeSearchUrl}
                  target="_blank"
                  className="text-white underline"
                >
                  Watch on YouTube
                </a>
              </li>
            </ul>
          </div>
          <div className="font-bold text-white">Platforms:</div>
          <ul className="flex flex-col gap-6">
            {game.gameData.platforms.map((platform) => {
              const searchTerm = `${game.gameData.name} ${platform.platform.name}`;
              const googleSearchUrl = getGoogleSearchUrl(searchTerm);
              return (
                <li key={platform.platform.id} className="text-white underline">
                  <a rel="noopener noreferrer" href={googleSearchUrl} target="_blank">
                    {platform.platform.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

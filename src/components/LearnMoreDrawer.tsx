import { useState } from "react";
import { clsx } from "clsx";
import { GameHeader } from "@/components/GameHeader";
import { Button } from "@/components/ui/Button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/Collapsable";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
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

function CollapsibleDescription(props: { description: string }) {
  const { description } = props;

  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex flex-col">
        <div className="relative flex-1 overflow-hidden">
          <div
            className={clsx(
              `text-white transition-all duration-300`,
              isOpen ? "max-h-full" : "max-h-32",
            )}
          >
            {description}
          </div>
          {isOpen ? null : (
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
          )}
        </div>
        <CollapsibleTrigger className="text-left underline">
          {isOpen ? "Read less" : "Read more"}
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  );
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
        <div className="absolute right-6 top-6 z-50 p-4">
          <DrawerClose>
            <Icon name="x" height={24} width={24} className="text-white" />
            <div className="sr-only">Close</div>
          </DrawerClose>
        </div>

        <div className="container flex flex-col gap-6 px-8 pb-8">
          <div>
            <div className="mb-4 mt-8">
              <GameHeader
                name={game.gameData.name}
                rating={game.gameData.rating}
              />
            </div>
            <DrawerDescription>
              <div className="sr-only">Game details</div>
            </DrawerDescription>

            <div className="pt-3">
              <CollapsibleDescription
                description={game.gameData.description_raw}
              />
            </div>
          </div>
          <div className="mb-2 flex flex-col gap-4">
            <div className="mt-4 font-bold text-white">Gameplay</div>
            <a
              rel="noopener noreferrer"
              href={youtubeSearchUrl}
              target="_blank"
              className="text-white underline"
            >
              Watch on YouTube
            </a>
          </div>
          <div className="mt-4 font-bold text-white">Available Platforms</div>
          <ul className="flex flex-col gap-4">
            {game.gameData.platforms.map((platform) => {
              const searchTerm = `${game.gameData.name} ${platform.platform.name}`;
              const googleSearchUrl = getGoogleSearchUrl(searchTerm);
              return (
                <li key={platform.platform.id}>
                  <a
                    rel="noopener noreferrer"
                    className="text-white underline"
                    href={googleSearchUrl}
                    target="_blank"
                  >
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

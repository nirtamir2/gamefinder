import { useState } from "react";
import { generateRandomPrompt } from "@/components/generateRandomPrompt";
import { PlatformsDrawer } from "@/components/platform/PlatformsDrawer";
import { useGameProvider } from "@/components/providers/GameContext";
import { Icon } from "@/components/ui/icons/Icon";

export function DiscoverGamesDesktopForm() {
  const { updateSearchParameters, genres } = useGameProvider();

  function handleSubmit({
    likedGames,
    currentPlatforms,
  }: {
    likedGames: string;
    currentPlatforms: Array<string>;
  }) {
    updateSearchParameters({
      likedGames: [likedGames],
      platforms: currentPlatforms,
      genres,
    });
  }

  const [likedGames, setLikedGames] = useState<string>("");
  const { platforms } = useGameProvider();

  const [currentPlatforms, setCurrentPlatforms] =
    useState<Array<string>>(platforms);

  const [placeholderText] = useState<string>(
    `example: ${generateRandomPrompt()}`,
  );

  return (
    <form
      className="relative flex w-[500px] items-center gap-8"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({ likedGames, currentPlatforms });
      }}
    >
      <div className="group relative w-full">
        <input
          required
          className="w-full resize-none appearance-none rounded-full bg-button-background py-4 pl-6 pr-14 text-white transition duration-200 placeholder:text-gray-500 focus:bg-button-background-brighter"
          id="likedGames"
          name="likedGames"
          placeholder={placeholderText}
          value={likedGames}
          onChange={(e) => {
            setLikedGames(e.target.value);
          }}
        />
        <div className="absolute right-3 top-0 flex h-full items-center">
          <button type="submit" className="rounded-full p-3">
            <Icon
              name="search"
              className="text-gray-500 transition-colors group-hover:text-white"
              height={16}
              width={16}
            />
            <span className="sr-only">Submit</span>
          </button>
        </div>
      </div>
      <div className="absolute left-full w-96">
        <PlatformsDrawer
          initialPlatforms={platforms}
          onFinishSelectPlatforms={(platforms) => {
            setCurrentPlatforms(platforms);
          }}
        />
      </div>
    </form>
  );
}

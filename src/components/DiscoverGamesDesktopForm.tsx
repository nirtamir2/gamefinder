import { useState } from "react";
import { generateRandomPrompt } from "@/components/generateRandomPrompt";
import { PlatformsDrawer } from "@/components/platform/PlatformsDrawer";
import { useGameProvider } from "@/components/providers/GameContext";
import { SearchInput } from "@/components/ui/SearchInput";

export function DiscoverGamesDesktopForm() {
  const { platforms, updateSearchParameters, genres } = useGameProvider();
  const [likedGames, setLikedGames] = useState<string>("");
  const [currentPlatforms, setCurrentPlatforms] =
    useState<Array<string>>(platforms);
  const [placeholderText] = useState<string>(
    `example: ${generateRandomPrompt()}`,
  );

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

  return (
    <form
      className="relative flex w-desktop-header items-center gap-8"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({ likedGames, currentPlatforms });
      }}
    >
      <SearchInput
        required
        id="likedGames"
        name="likedGames"
        placeholder={placeholderText}
        value={likedGames}
        onChange={(e) => {
          setLikedGames(e.target.value);
        }}
      />
      <div className="absolute left-full w-96 pl-4">
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

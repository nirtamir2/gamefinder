"use client";

import { useState } from "react";
import { generateRandomPrompt } from "@/components/generateRandomPrompt";
import { PlatformsDrawer } from "@/components/platform/PlatformsDrawer";
import { useGameProvider } from "@/components/providers/GameContext";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";

export function MainPageForm() {
  const {
    platforms: searchParamsPlatforms,
    updateSearchParameters,
    genres,
  } = useGameProvider();
  const [currentPlatforms, setCurrentPlatforms] = useState<Array<string>>(
    searchParamsPlatforms,
  );

  const [placeholderText] = useState<string>(
    `example: ${generateRandomPrompt()}`,
  );
  const [likedGames, setLikedGames] = useState("");

  return (
    <form
      className="flex flex-col items-center justify-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        updateSearchParameters({
          likedGames: [likedGames],
          platforms: currentPlatforms,
          genres,
        });
      }}
    >
      <SearchInput
        required
        id="likedGames"
        name="likedGames"
        value={likedGames}
        placeholder={placeholderText}
        onChange={(e) => {
          setLikedGames(e.target.value);
        }}
      />

      <div className="flex w-full justify-center pt-4">
        <PlatformsDrawer
          initialPlatforms={currentPlatforms}
          onFinishSelectPlatforms={(platforms) => {
            setCurrentPlatforms(platforms);
          }}
        />
      </div>
      <div className="hidden w-full pt-4 xl:max-w-56">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

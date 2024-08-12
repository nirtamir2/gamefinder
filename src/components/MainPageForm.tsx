"use client";

import { useState } from "react";
import { generateRandomPrompt } from "@/components/generateRandomPrompt";
import { useMediaQuery } from "@/components/hooks/useMediaQuery";
import { PlatformsDrawer } from "@/components/platform/PlatformsDrawer";
import { useGameProvider } from "@/components/providers/GameContext";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { TextArea } from "@/components/ui/TextArea";

export function MainPageForm() {
  const {
    platforms: searchParamsPlatforms,
    updateSearchParameters,
    genres,
  } = useGameProvider();
  const [currentPlatforms, setCurrentPlatforms] = useState<Array<string>>(
    searchParamsPlatforms,
  );

  const isDesktop = useMediaQuery("(min-width: 1280px)");

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
      {isDesktop ? (
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
      ) : (
        <TextArea
          required
          id="likedGames"
          name="likedGames"
          value={likedGames}
          rows={6}
          placeholder={placeholderText}
          onChange={(e) => {
            setLikedGames(e.target.value);
          }}
        />
      )}

      <div className="flex w-full justify-center pt-4">
        <PlatformsDrawer
          initialPlatforms={currentPlatforms}
          onFinishSelectPlatforms={(platforms) => {
            setCurrentPlatforms(platforms);
          }}
        />
      </div>
      <div className="w-full pt-4 xl:hidden xl:max-w-56">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

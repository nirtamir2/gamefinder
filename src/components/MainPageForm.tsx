"use client";

import { useState } from "react";
import { generateRandomPrompt } from "@/components/generateRandomPrompt";
import { PlatformsDrawer } from "@/components/platform/PlatformsDrawer";
import { useGameProvider } from "@/components/providers/GameContext";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";

export function MainPageForm() {
  const { platforms, updateSearchParameters, genres } = useGameProvider();
  const [currentPlatforms, setCurrentPlatforms] =
    useState<Array<string>>(platforms);

  const [placeholderText] = useState<string>(
    `example: ${generateRandomPrompt()}`,
  );
  const [likedGames, setLikedGames] = useState("");

  return (
    <form
      className="flex flex-col items-center justify-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        updateSearchParameters({ likedGames: [likedGames], platforms, genres });
      }}
    >
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

      <div className="flex w-full justify-between pt-4">
        <button
          type="button"
          className="text-white"
          onClick={() => setLikedGames(generateRandomPrompt())}
        >
          🔀 Random
        </button>
        <PlatformsDrawer
          initialPlatforms={currentPlatforms}
          onFinishSelectPlatforms={(platforms) => {
            setCurrentPlatforms(platforms);
          }}
        />
      </div>
      <div className="w-full pt-4 lg:max-w-56">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useSearchParametersProvider } from "@/app/GamesProvider";
import { PlatformsDrawer } from "@/app/PlatformsDrawer";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";

export function MainPageForm() {
  const { platforms, updateSearchParameters, genres } =
    useSearchParametersProvider();
  const [currentPlatforms, setCurrentPlatforms] =
    useState<Array<string>>(platforms);

  return (
    <form
      className="flex flex-col items-center justify-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const likedGames = e.currentTarget["likedGames"].value as string;
        updateSearchParameters({ likedGames: [likedGames], platforms, genres });
      }}
    >
      <TextArea
        required
        id="likedGames"
        name="likedGames"
        rows={6}
        placeholder="Example: I like challenging puzzle games with adventures like legend of zelda or Tunic"
      />
      <PlatformsDrawer
        initialPlatforms={currentPlatforms}
        onFinishSelectPlatforms={(platforms) => {
          setCurrentPlatforms(platforms);
        }}
      />
      <div className="w-full sm:max-w-56">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

"use client";

import { useEffect, useState } from "react";
import { PlatformsDrawer } from "@/components/platform/PlatformsDrawer";
import { useGameProvider } from "@/components/providers/GameContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { exampleSentences } from "./examplesSentences";

export function MainPageForm() {
  const { platforms, updateSearchParameters, genres } = useGameProvider();
  const [currentPlatforms, setCurrentPlatforms] =
    useState<Array<string>>(platforms);
  const [placeholderText, setPlaceholderText] = useState<string>("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * exampleSentences.length);
    const selectedText = exampleSentences[randomIndex] || "";
    setPlaceholderText(selectedText);
  }, []);

  return (
    <form
      className="flex flex-col items-center justify-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const likedGames = e.currentTarget["likedGames"].value as string;
        updateSearchParameters({ likedGames: [likedGames], platforms, genres });
      }}
    >
      <div className="flex justify-center md:hidden">
        <TextArea
          required
          id="likedGames"
          name="likedGames"
          rows={6}
          placeholder={`"${placeholderText}"`}
        />
      </div>

      <div className="hidden w-full justify-center md:flex">
        <Input
          required
          id="likedGames"
          name="likedGames"
          type="text"
          placeholder={`"${placeholderText}"`}
        />
      </div>

      <div className="mt-[-15] flex w-full justify-center">
        <PlatformsDrawer
          initialPlatforms={currentPlatforms}
          onFinishSelectPlatforms={(platforms) => {
            setCurrentPlatforms(platforms);
          }}
        />
      </div>

      <div className="mt-4 w-full sm:max-w-56">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

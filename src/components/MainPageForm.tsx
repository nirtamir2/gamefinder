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

  const [likedGames, setLikedGames] = useState("");

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
        updateSearchParameters({ likedGames: [likedGames], platforms, genres });
      }}
    >
      <div className="flex w-full justify-center md:hidden">
        <TextArea
          required
          id="likedGames"
          name="likedGames"
          rows={6}
          placeholder={`"${placeholderText}"`}
          onChange={(e) => {
            setLikedGames(e.target.value);
          }}
        />
      </div>

      <div className="hidden w-full justify-center md:flex">
        <Input
          required
          id="likedGamesInput"
          name="likedGamesInput"
          placeholder={`"${placeholderText}"`}
          onChange={(e) => {
            setLikedGames(e.target.value);
          }}
        />
      </div>

      <div className="mt-[10] flex w-full justify-center">
        <PlatformsDrawer
          initialPlatforms={currentPlatforms}
          onFinishSelectPlatforms={(platforms) => {
            setCurrentPlatforms(platforms);
          }}
        />
      </div>

      <div className="mt-4 w-full sm:max-w-56 md:hidden">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

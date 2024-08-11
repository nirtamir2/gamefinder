"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { PlatformsDrawer } from "@/components/platform/PlatformsDrawer";
import { useGameProvider } from "@/components/providers/GameContext";
import { Button } from "@/components/ui/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import { TextArea } from "@/components/ui/TextArea";
import { Icon } from "@/components/ui/icons/Icon";
import { exampleSentences } from "./examplesSentences";

export function DiscoverGamesDrawer(props: {
  trigger: ReactNode;
  triggerAsChild: boolean;
}) {
  const { trigger, triggerAsChild } = props;
  const {
    updateSearchParameters,
    isDrawerOpen,
    setIsDrawerOpen,
    platforms,
    genres,
  } = useGameProvider();

  const [likedGames, setLikedGames] = useState<string>("");
  const [placeholderText, setPlaceholderText] = useState<string>("");
  const [currentPlatforms, setCurrentPlatforms] =
    useState<Array<string>>(platforms);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * exampleSentences.length);
    setPlaceholderText(exampleSentences[randomIndex] || "");
  }, []);

  const handleRandomText = () => {
    const randomIndex = Math.floor(Math.random() * exampleSentences.length);
    setLikedGames(exampleSentences[randomIndex] || "");
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateSearchParameters({
      likedGames: [likedGames],
      platforms: currentPlatforms,
      genres,
    });
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild={triggerAsChild}>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="absolute right-4 top-4">
          <DrawerClose>
            <Icon name="x" height={24} width={24} className="text-white" />
            <div className="sr-only">Close</div>
          </DrawerClose>
        </div>
        <DrawerHeader>
          <DrawerTitle>Find Gameplays</DrawerTitle>
          <DrawerDescription>
            <div className="sr-only">Find Gameplays</div>
          </DrawerDescription>
        </DrawerHeader>
        <div className="container flex flex-col gap-6 px-8 pb-8">
          <form
            className="flex flex-col items-center justify-center gap-4"
            onSubmit={handleSubmit}
          >
            <TextArea
              required
              id="likedGames"
              name="likedGames"
              rows={6}
              placeholder={`example: ${placeholderText}`}
              value={likedGames}
              onChange={(e) => setLikedGames(e.target.value)}
            />
            <div className="mt-[-15] flex w-full justify-between">
              <button
                type="button"
                className="text-white"
                onClick={handleRandomText}
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
            <div className="w-full sm:max-w-56">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

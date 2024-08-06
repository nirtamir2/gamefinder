"use client";

import { useState } from "react";
import { UpdateSearchParamsForm } from "@/components/UpdateSearchParamsForm";
import { PlatformsSelectList } from "@/components/platform/PlatformsSelectList";
import { useGameProvider } from "@/components/providers/GameContext";
import { Button } from "@/components/ui/Button";

export function DiscoverGameDrawerContent(props: {
  onSubmit: (_: {
    likedGames: Array<string>;
    genres: Array<string>;
    platforms: Array<string>;
  }) => void;
}) {
  const { onSubmit } = props;

  const [formType, setFormType] = useState<"mainForm" | "choosePlatformForm">(
    "mainForm",
  );

  const { platforms } = useGameProvider();
  const [currentPlatforms, setCurrentPlatforms] =
    useState<Array<string>>(platforms);

  function handleSelectPlatform(platform: string) {
    setCurrentPlatforms((currentPlatforms) => {
      const filteredPlatforms = currentPlatforms.filter(
        (currentPlatform) => currentPlatform !== platform,
      );
      return currentPlatforms.includes(platform)
        ? filteredPlatforms
        : [...filteredPlatforms, platform];
    });
  }

  if (formType === "choosePlatformForm") {
    return (
      <div className="container flex flex-col gap-8 p-8">
        <PlatformsSelectList
          currentPlatforms={currentPlatforms}
          onSelectPlatform={handleSelectPlatform}
        />
        <Button
          onClick={() => {
            setCurrentPlatforms(platforms);
            setFormType("mainForm");
          }}
        >
          Approve
        </Button>
      </div>
    );
  }
  if (formType === "mainForm") {
    return (
      <UpdateSearchParamsForm
        platforms={currentPlatforms}
        onClickPlatforms={() => setFormType("choosePlatformForm")}
        onSubmit={onSubmit}
      />
    );
  }

  throw new Error("Cannot be");
}

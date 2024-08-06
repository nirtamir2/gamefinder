"use client";

import { useState } from "react";
import { PlatformsSelectList } from "@/app/PlatformsSelectList";
import { Button } from "@/components/ui/Button";

export function SelectPlatform(props: {
  currentPlatforms: Array<string>;
  onFinishSelectPlatforms: (platform: Array<string>) => void;
}) {
  const { onFinishSelectPlatforms, currentPlatforms: propsCurrentPlatform } =
    props;
  const [currentPlatforms, setCurrentPlatforms] =
    useState(propsCurrentPlatform);

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

  return (
    <div className="container flex flex-col gap-8 p-8">
      <PlatformsSelectList
        currentPlatforms={currentPlatforms}
        onSelectPlatform={handleSelectPlatform}
      />
      <Button
        onClick={() => {
          onFinishSelectPlatforms(currentPlatforms);
        }}
      >
        Approve
      </Button>
    </div>
  );
}

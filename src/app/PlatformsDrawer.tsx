"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { selectPlatformPlatforms } from "@/components/SelectPlatformPlatforms";
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
import { Icon } from "@/components/ui/icons/Icon";
import { formatList } from "@/utils/formatList";

export function PlatformsDrawer(props: {
  initialPlatforms: Array<string>;
  onFinishSelectPlatforms: (platform: Array<string>) => void;
}) {
  const { onFinishSelectPlatforms, initialPlatforms } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentPlatforms, setCurrentPlatforms] = useState(initialPlatforms);

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
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <div className="space-x-4 p-4">
          <Icon
            name="platform"
            height={24}
            width={24}
            className="inline align-text-top text-white"
          />
          <div className="inline text-white underline">
            {currentPlatforms.length === 0
              ? "All platforms"
              : formatList(currentPlatforms)}
          </div>
        </div>
      </DrawerTrigger>
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
        <div className="container flex flex-col gap-8 p-8">
          <PlatformsSelectList
            currentPlatforms={currentPlatforms}
            onSelectPlatform={handleSelectPlatform}
          />
          <Button
            onClick={() => {
              setIsOpen(false);
              onFinishSelectPlatforms(currentPlatforms);
            }}
          >
            Approve
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function PlatformsSelectList(props: {
  currentPlatforms: Array<string>;
  onSelectPlatform: (platform: string) => void;
}) {
  const { currentPlatforms, onSelectPlatform } = props;

  return (
    <ul className="flex w-full flex-col gap-4">
      {selectPlatformPlatforms.map((platform) => {
        const isSelected = currentPlatforms.includes(platform);
        return (
          <li key={platform} className="w-full">
            <button
              className={clsx(
                "relative h-10 w-full p-2 px-8 text-sm font-bold transition-colors",
                isSelected
                  ? "bg-button-selected-background text-white hover:bg-secondary-button-text"
                  : "bg-button-background text-secondary-button-text hover:bg-button-selected-background",
              )}
              type="button"
              onClick={() => {
                onSelectPlatform(platform);
              }}
            >
              {isSelected ? (
                <div className="absolute -right-2 -top-2 flex size-6 items-center justify-center border-2 border-black bg-white">
                  <Icon
                    name="v"
                    height={12}
                    width={12}
                    className="text-black"
                  />
                </div>
              ) : null}
              {platform}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

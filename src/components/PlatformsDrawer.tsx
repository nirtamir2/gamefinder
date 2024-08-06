"use client";

import { useState } from "react";
import { PlatformsSelectList } from "@/components/PlatformsSelectList";
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
import { IconButton } from "@/components/ui/IconButton";
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

  const formattedPlatformsText =
    currentPlatforms.length === 0
      ? "All platforms"
      : formatList(currentPlatforms);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <IconButton iconName="settings">{formattedPlatformsText}</IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <div className="absolute right-4 top-4">
          <DrawerClose>
            <Icon name="x" height={24} width={24} className="text-white" />
            <div className="sr-only">Close</div>
          </DrawerClose>
        </div>
        <DrawerHeader>
          <DrawerTitle>Platforms</DrawerTitle>
          <DrawerDescription>
            <div className="sr-only">Choose platforms</div>
          </DrawerDescription>
        </DrawerHeader>
        <div className="container flex flex-col gap-16 px-8 pb-16">
          <div className="flex flex-col gap-8 px-8">
            <PlatformsSelectList
              currentPlatforms={currentPlatforms}
              onSelectPlatform={handleSelectPlatform}
            />
          </div>
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

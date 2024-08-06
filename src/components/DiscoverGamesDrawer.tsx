"use client";

import type { ReactNode } from "react";
import { DiscoverGameDrawerContent } from "@/components/DiscoverGameDrawerContent";
import { useGameProvider } from "@/components/providers/GameContext";
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

export function DiscoverGamesDrawer(props: {
  trigger: ReactNode;
  triggerAsChild: boolean;
}) {
  const { trigger, triggerAsChild } = props;
  const { updateSearchParameters, isDrawerOpen, setIsDrawerOpen } =
    useGameProvider();

  function handleSubmit({
    likedGames,
    platforms,
    genres,
  }: {
    likedGames: Array<string>;
    genres: Array<string>;
    platforms: Array<string>;
  }) {
    updateSearchParameters({ likedGames, platforms, genres });
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
        <DiscoverGameDrawerContent onSubmit={handleSubmit} />
      </DrawerContent>
    </Drawer>
  );
}

"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useSearchParametersProvider } from "@/app/GamesProvider";
import { DiscoverGameDrawerContent } from "@/components/DiscoverGameDrawerContent";
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
  const [isOpen, setIsOpen] = useState(false);
  const { updateSearchParameters } = useSearchParametersProvider();

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
    setIsOpen(false);
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
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

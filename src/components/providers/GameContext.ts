"use client";

import { createContext, useContext } from "react";

type ContextType = {
  likedGames: Array<string>;
  genres: Array<string>;
  platforms: Array<string>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  updateSearchParameters: (searchParameters: {
    likedGames: Array<string>;
    genres: Array<string>;
    platforms: Array<string>;
  }) => void;
};

const noop = () => {
  // do nothing
};

export const GameContext = createContext<ContextType>({
  likedGames: [],
  genres: [],
  platforms: [],
  isDrawerOpen: false,
  setIsDrawerOpen: noop,
  updateSearchParameters: noop,
});

export const useGameProvider = () => {
  const context = useContext(GameContext);
  if (context == null) {
    throw new Error("useGameProvider called without Provider");
  }
  return context;
};

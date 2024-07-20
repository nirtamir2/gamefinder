"use client";

import { navigateToSearchResult } from "@/app/game/[gameId]/actions/navigateToSearchResult.action";

export function UpdateSearchParamsForm() {
  return (
    <form
      action={navigateToSearchResult}
      className="container grid grid-cols-2 gap-8 p-8"
    >
      <label htmlFor="generes">Generes</label>
      <input id="generes" type="text" name="genres" />
      <label htmlFor="platforms">Platforms</label>
      <input id="platforms" type="text" name="platforms" />
      <label htmlFor="likedGames">Liked games</label>
      <input id="likedGames" type="text" name="likedGames" />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

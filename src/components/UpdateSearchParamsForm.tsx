"use client";

import { navigateToSearchResult } from "@/app/game/[gameId]/actions/navigateToSearchResult.action";
import { Button } from "@/components/ui/Button";

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
      <input required id="likedGames" type="text" name="likedGames" />
      <div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

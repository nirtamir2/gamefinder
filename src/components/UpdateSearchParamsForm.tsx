"use client";

import { navigateToSearchResult } from "@/app/game/[gameId]/actions/navigateToSearchResult.action";
import { Button } from "@/components/ui/Button";

export function UpdateSearchParamsForm(props: {
  platforms: Array<string>;
  onClickPlatforms: () => void;
}) {
  const { platforms, onClickPlatforms } = props;

  const platformsString = platforms.join(", ");
  return (
    <form
      action={navigateToSearchResult}
      className="container flex flex-col gap-8 p-8"
    >
      <input id="generes" type="text" name="genres" className="sr-only" />
      <button type="button" onClick={() => onClickPlatforms()}>
        <div className="flex flex-wrap justify-between gap-8">
          <div>Platforms</div>
          <div>{platformsString}</div>
        </div>
      </button>
      <input name="platforms" value={platformsString} className="hidden" />
      <div className="flex flex-col gap-2">
        <label className="text-white" htmlFor="likedGames">
          What kind of games do you like?
        </label>
        <textarea
          required
          id="likedGames"
          name="likedGames"
          rows={6}
          className="w-full resize-none border border-white bg-transparent p-4 text-sm text-secondary-button-text"
          placeholder="Example: I like challenging puzzle games with adventures like legend of zelda or Tunic"
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

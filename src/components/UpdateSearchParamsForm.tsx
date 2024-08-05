"use client";

import { Button } from "@/components/ui/Button";
import { formatList } from "@/utils/formatList";

export function UpdateSearchParamsForm(props: {
  platforms: Array<string>;
  onClickPlatforms: () => void;
  onSubmit: (_: {
    likedGames: Array<string>;
    genres: Array<string>;
    platforms: Array<string>;
  }) => void;
}) {
  const { platforms, onClickPlatforms, onSubmit } = props;

  return (
    <form
      className="container flex flex-col gap-8 p-8"
      onSubmit={(e) => {
        e.preventDefault();
        const likedGames = e.currentTarget["likedGames"].value as string;
        onSubmit({
          likedGames: [likedGames],
          genres: [],
          platforms,
        });
      }}
    >
      <input id="generes" type="text" name="genres" className="hidden" />
      <button type="button" onClick={() => onClickPlatforms()}>
        <div className="flex flex-wrap justify-between gap-8">
          <div>Platforms</div>
          <div>{formatList(platforms)}</div>
        </div>
      </button>
      <input name="platforms" defaultValue={platforms} className="hidden" />
      <div className="flex flex-col gap-2">
        <label className="text-white" htmlFor="likedGames">
          What kind of games do you like?
        </label>
        <textarea
          required
          id="likedGames"
          name="likedGames"
          rows={6}
          className="w-full resize-none border border-white bg-transparent p-4 text-secondary-button-text"
          placeholder="Example: I like challenging puzzle games with adventures like legend of zelda or Tunic"
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

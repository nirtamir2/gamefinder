"use client";

import { pathFor } from "@nirtamir2/next-static-paths";
import { useRouter } from "next/navigation";
import { searchParamsSchemaSerializer } from "@/app/discover/actions/searchParamsSchemaSerializer";
import { Button } from "@/components/ui/Button";
import { formatList } from "@/utils/formatList";
import { stringArraySchema } from "@/utils/stringArraySchema";

export function UpdateSearchParamsForm(props: {
  likedGames: string;
  platforms: Array<string>;
  onClickPlatforms: () => void;
  onChangeLikedGames: (likedGames: string) => void;
}) {
  const { likedGames, platforms, onClickPlatforms, onChangeLikedGames } = props;
  const router = useRouter();

  return (
    <form
      action={(formData) => {
        const likedGames = String(formData.get("likedGames"));
        const genres = String(formData.get("genres"));
        const platforms = String(formData.get("platforms"));

        const searchParams = searchParamsSchemaSerializer({
          likedGames: stringArraySchema.parseServerSide(likedGames),
          genres: stringArraySchema.parseServerSide(genres),
          platforms: stringArraySchema.parseServerSide(platforms),
        });

        const url = `${pathFor("/discover")}${searchParams}`;
        router.push(url);
      }}
      className="container flex flex-col gap-8 p-8"
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
          value={likedGames}
          rows={6}
          className="w-full resize-none border border-white bg-transparent p-4 text-secondary-button-text"
          placeholder="Example: I like challenging puzzle games with adventures like legend of zelda or Tunic"
          onChange={(e) => onChangeLikedGames(e.target.value)}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

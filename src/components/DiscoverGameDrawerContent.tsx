import { useState } from "react";
import { generateRandomPrompt } from "@/components/generateRandomPrompt";
import { PlatformsDrawer } from "@/components/platform/PlatformsDrawer";
import { useGameProvider } from "@/components/providers/GameContext";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";

export function DiscoverGameDrawerContent(props: {
  onSubmit: (params: {
    likedGames: string;
    currentPlatforms: Array<string>;
  }) => void;
}) {
  const { onSubmit } = props;

  const [likedGames, setLikedGames] = useState<string>("");
  const { platforms } = useGameProvider();

  const [currentPlatforms, setCurrentPlatforms] =
    useState<Array<string>>(platforms);

  const [placeholderText] = useState<string>(
    `example: ${generateRandomPrompt()}`,
  );

  return (
    <div className="container flex flex-col gap-6 px-8 pb-8">
      <form
        className="flex flex-col items-center justify-center gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ likedGames, currentPlatforms });
        }}
      >
        <TextArea
          required
          id="likedGames"
          name="likedGames"
          rows={6}
          placeholder={placeholderText}
          value={likedGames}
          onChange={(e) => {
            setLikedGames(e.target.value);
          }}
        />
        <div className="flex w-full justify-between pt-4">
          <button
            type="button"
            className="text-white"
            onClick={() => {
              setLikedGames(generateRandomPrompt());
            }}
          >
            🔀 Random
          </button>
          <PlatformsDrawer
            initialPlatforms={platforms}
            onFinishSelectPlatforms={(platforms) => {
              setCurrentPlatforms(platforms);
            }}
          />
        </div>
        <div className="w-full lg:max-w-56">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}

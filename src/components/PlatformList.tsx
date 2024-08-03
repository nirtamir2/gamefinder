import type { FetchGameDataResult } from "@/app/game/fetchGamesData";
import { PlatformIcon } from "@/components/PlatformIcon";
import { getUnifiedPlatformName } from "@/components/getUnifiedPlatformName";

function getUniqPlatformNames(game: FetchGameDataResult[number]["gameData"]) {
  return [
    ...new Set(
      game.platforms.map((platform) =>
        getUnifiedPlatformName(platform.platform.slug),
      ),
    ),
  ].filter((platformName) => platformName != null);
}

export function PlatformList(props: {
  gameData: FetchGameDataResult[number]["gameData"];
}) {
  const { gameData } = props;
  const platformNames: Array<string> = getUniqPlatformNames(gameData);

  return (
    <ul className="flex flex-wrap items-center gap-4">
      {platformNames.map((platformName) => {
        return (
          <li key={platformName}>
            <PlatformIcon platform={platformName} />
          </li>
        );
      })}
    </ul>
  );
}

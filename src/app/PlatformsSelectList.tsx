import { clsx } from "clsx";
import { selectPlatformPlatforms } from "@/components/SelectPlatformPlatforms";
import { Icon } from "@/components/ui/icons/Icon";

type Props = {
  currentPlatforms: Array<string>;
  onSelectPlatform: (platform: string) => void;
};

export function PlatformsSelectList(props: Props) {
  const { currentPlatforms, onSelectPlatform } = props;

  return (
    <ul className="flex w-full flex-col gap-4">
      {selectPlatformPlatforms.map((platform) => {
        const isSelected = currentPlatforms.includes(platform);
        return (
          <li key={platform} className="w-full">
            <button
              className={clsx(
                "relative h-10 w-full rounded-lg p-2 px-8 text-sm font-bold transition-colors",
                isSelected
                  ? "bg-button-selected-background text-white hover:bg-secondary-button-text"
                  : "bg-button-background text-secondary-button-text hover:bg-button-selected-background",
              )}
              type="button"
              onClick={() => {
                onSelectPlatform(platform);
              }}
            >
              {isSelected ? (
                <div className="absolute -right-2 -top-2 flex size-6 items-center justify-center border-4 border-black bg-white">
                  <Icon
                    name="v"
                    height={12}
                    width={12}
                    className="text-black"
                  />
                </div>
              ) : null}
              {platform}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

import { useState } from "react";
import { clsx } from "clsx";
import { selectPlatformPlatforms } from "@/components/SelectPlatformPlatforms";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons/Icon";

export function SelectPlatform(props: {
  currentPlatforms: Array<string>;
  onFinishSelectPlatforms: (platform: Array<string>) => void;
}) {
  const { onFinishSelectPlatforms, currentPlatforms: propsCurrentPlatform } =
    props;
  const [currentPlatforms, setCurrentPlatforms] =
    useState(propsCurrentPlatform);

  function handleSelectPlatform(platform: string) {
    setCurrentPlatforms((currentPlatforms) => {
      const filteredPlatforms = currentPlatforms.filter(
        (currentPlatform) => currentPlatform !== platform,
      );
      return currentPlatforms.includes(platform)
        ? filteredPlatforms
        : [...filteredPlatforms, platform];
    });
  }

  return (
    <div className="container flex flex-col gap-8 p-8">
      <ul className="flex w-full flex-col gap-4">
        {selectPlatformPlatforms.map((platform) => {
          const isSelected = currentPlatforms.includes(platform);
          return (
            <li key={platform} className="w-full">
              <button
                className={clsx(
                  "relative h-10 w-full p-2 px-8 text-sm font-bold transition-colors",
                  isSelected
                    ? "bg-button-selected-background text-white hover:bg-secondary-button-text"
                    : "bg-button-background text-secondary-button-text hover:bg-button-selected-background",
                )}
                type="button"
                onClick={() => {
                  handleSelectPlatform(platform);
                }}
              >
                {isSelected ? (
                  <div className="absolute -right-2 -top-2 flex size-6 items-center justify-center border-2 border-black bg-white">
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
      <Button
        onClick={() => {
          onFinishSelectPlatforms(currentPlatforms);
        }}
      >
        Approve
      </Button>
    </div>
  );
}

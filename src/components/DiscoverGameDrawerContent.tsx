"use client";

import { useState } from "react";
import { useSearchParametersProvider } from "@/app/GamesProvider";
import { SelectPlatform } from "@/components/SelectPlatform";
import { UpdateSearchParamsForm } from "@/components/UpdateSearchParamsForm";


export function DiscoverGameDrawerContent(props: {
  onSubmit: (_: {
    likedGames: Array<string>;
    genres: Array<string>;
    platforms: Array<string>;
  }) => void;
}) {
  const { onSubmit } = props;

  const [formType, setFormType] = useState<"mainForm" | "choosePlatformForm">(
    "mainForm",
  );

  const { platforms } = useSearchParametersProvider();
  const [currentPlatforms, setCurrentPlatforms] =
    useState<Array<string>>(platforms);

  if (formType === "choosePlatformForm") {
    return (
      <SelectPlatform
        currentPlatforms={currentPlatforms}
        onFinishSelectPlatforms={(platforms) => {
          setCurrentPlatforms(platforms);
          setFormType("mainForm");
        }}
      />
    );
  }
  if (formType === "mainForm") {
    return (
      <UpdateSearchParamsForm
        platforms={currentPlatforms}
        onClickPlatforms={() => setFormType("choosePlatformForm")}
        onSubmit={onSubmit}
      />
    );
  }

  throw new Error("Cannot be");
}

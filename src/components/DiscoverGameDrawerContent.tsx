"use client";

import { useState } from "react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { SelectPlatform } from "@/components/SelectPlatform";
import { UpdateSearchParamsForm } from "@/components/UpdateSearchParamsForm";

export function DiscoverGameDrawerContent() {
  const [platformFromQueryState] = useQueryState(
    "platforms",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [formType, setFormType] = useState<"mainForm" | "choosePlatformForm">(
    "mainForm",
  );

  const [currentPlatforms, setCurrentPlatforms] = useState<Array<string>>(
    platformFromQueryState,
  );

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
      />
    );
  }

  throw new Error("Cannot be");
}

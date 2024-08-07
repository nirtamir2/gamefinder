import Image from "next/image";
import type { FetchGameDataResult } from "@/lib/fetchGamesData";

type Props = {
  asset: { type: "image" | "video"; src: string };
  gameData: FetchGameDataResult[number]["gameData"];
};

export function GameplayAsset(props: Props) {
  const { asset, gameData } = props;
  const fullImage =
    gameData.background_image == null ? (
      <div className="size-full bg-background"></div>
    ) : (
      <Image
        fill
        style={{
          objectFit: "cover",
          userSelect: "none",
        }}
        sizes="100vw"
        src={gameData.background_image_additional ?? gameData.background_image}
        alt=""
      />
    );

  return asset.type === "image" ? (
    <Image
      fill
      style={{
        objectFit: "cover",
        userSelect: "none",
      }}
      sizes="100vw"
      src={asset.src}
      alt=""
    />
  ) : (
    <video
      playsInline
      autoPlay
      muted
      loop
      preload="auto"
      className="size-full object-cover"
    >
      <source src={asset.src} type="video/mp4" />
      {fullImage}
    </video>
  );
}

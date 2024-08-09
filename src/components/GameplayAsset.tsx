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
      <div className="size-full bg-background" />
    ) : (
      <Image
        fill
        style={{
          objectFit: "cover",
          userSelect: "none",
        }}
        className="lg:rounded-xl"
        sizes="100vw"
        src={gameData.background_image_additional ?? gameData.background_image}
        alt=""
      />
    );

  return (
    <div className="size-full lg:py-40">
      <div className="relative size-full">
        {asset.type === "image" ? (
          <Image
            fill
            style={{
              objectFit: "cover",
              userSelect: "none",
            }}
            sizes="100vw"
            className="lg:rounded-xl"
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
            className="absolute left-0 top-0 size-full object-cover py-px lg:rounded-xl"
          >
            <source src={asset.src} type="video/mp4" />
            {fullImage}
          </video>
        )}
      </div>
    </div>
  );
}

import Image from "next/image";
import { Result } from "@/lib/fetchGames";

export function GamesCarousel(props: { games: Result[] }) {
  const { games } = props;

  return (
    <div className="relative h-screen w-full">
      {games.map((game) => {
        return (
          <div key={game.name} className="w-full">
            {game.background_image == null ? (
              <div className="size-full bg-black"></div>
            ) : (
              <Image
                layout="fill"
                style={{
                  objectFit: "cover",
                }}
                src={game.background_image}
                alt=""
              />
            )}
            <div className="absolute bottom-0 z-10 w-full bg-gradient-to-b from-transparent to-black p-4">
              <div className="text-lg text-white">{game.name}</div>
              <div className="text-lg text-white">{game.released}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

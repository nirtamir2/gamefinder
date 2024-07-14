import Image from "next/image";
import { recommendGamesWithAI } from "@/app/game/[gameId]/action";
import { fetchGames } from "@/lib/fetchGames";

export default async function GamePage(props: { params: { gameId: string } }) {
  const { params } = props;
  const { gameId } = params;
  const games = await recommendGamesWithAI({ likedGames: [gameId] });
  const populatedGames = await Promise.all(
    games.recommendedGames.map((game) => {
      return fetchGames(game);
    }),
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="container">
        {populatedGames.map((games, index) => {
          return (
            <div key={index} className="relative h-screen w-full">
              {games.results.map((game, index) => {
                if (index !== 0) {
                  return null;
                }
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
        })}
      </div>
    </main>
  );
}

import { GamesCarousel } from "@/app/game/[gameId]/GamesCarousel";
import { recommendGamesWithAI } from "@/app/game/[gameId]/action";
import { fetchGames } from "@/lib/fetchGames";

export default async function GamePage(props: { params: { gameId: string } }) {
  const { params } = props;
  const { gameId } = params;
  const aiRecommendationResult = await recommendGamesWithAI({
    likedGames: [gameId],
  });
  const populatedGames = await Promise.all(
    aiRecommendationResult.recommendedGames.map((game) => {
      return fetchGames(game);
    }),
  );

  const games = populatedGames
    .map((games) => games.results[0])
    .filter((game) => game != null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="container">
        <GamesCarousel games={games} />
      </div>
    </main>
  );
}

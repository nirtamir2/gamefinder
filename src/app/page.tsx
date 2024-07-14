import { pathFor } from "@nirtamir2/next-static-paths";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect(pathFor("/game/[gameId]", { gameId: "gta" }));
}

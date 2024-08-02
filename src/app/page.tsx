import Image from "next/image";
import { DiscoverGamesDrawer } from "@/components/DiscoverGamesDrawer";
import cubeImageSrc from "../components/assets/cube.png";
import gemeniIconSrc from "../components/assets/gemimi.svg";

export default async function Home() {
  return (
    <div className="flex h-screen w-full">
      <div className="flex w-full flex-col items-center justify-center">
        <Image src={cubeImageSrc} height={278} width={278} alt="" />
        <div className="relative -top-8 flex flex-col">
          <h1 className="pt-2 text-center text-lg font-bold">gameplays.io</h1>
          <h2 className="text-balance px-8 pt-2 text-center text-sm font-bold">
            Use AI to find your next favorite videogame
          </h2>
          <div className="flex justify-center pt-8">
            <DiscoverGamesDrawer />
          </div>
        </div>
      </div>
      <footer className="fixed bottom-16 flex w-full items-center justify-center gap-2">
        <div className="pt-1 text-white opacity-30">Powered by</div>
        <Image alt="Gemini" className="opacity-30" src={gemeniIconSrc} />
      </footer>
    </div>
  );
}

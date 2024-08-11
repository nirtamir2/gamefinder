import Image from "next/image";
import cubeImageSrc from "@/assets/cube.png";
import { MainPageForm } from "@/components/MainPageForm";
import { PoweredByGeminiFooter } from "@/components/PoweredByGeminiFooter";
import { GameProvider } from "@/components/providers/GameProvider";

export default async function Home() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      <div className="absolute left-0 top-0 hidden md:block">
        <a href="/">
          <Image
            src={cubeImageSrc}
            height={133}
            width={133}
            alt="gameplays.io logo"
          />
        </a>
      </div>
      <div className="flex justify-center md:hidden">
        <Image src={cubeImageSrc} height={200} width={200} alt="" />
      </div>
      <div className="container relative w-full px-8">
        <div className="relative -top-12 md:-top-8">
          <h1 className="pt-2 text-center text-lg font-bold text-white">
            gameplays.io
          </h1>
        </div>
        <GameProvider>
          <MainPageForm />
        </GameProvider>
      </div>
      <PoweredByGeminiFooter />
    </div>
  );
}

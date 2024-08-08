import Image from "next/image";
import cubeImageSrc from "@/assets/cube.png";
import { MainPageForm } from "@/components/MainPageForm";
import { PoweredByGeminiFooter } from "@/components/PoweredByGeminiFooter";
import { GameProvider } from "@/components/providers/GameProvider";

export default async function Home() {
  return (
    <div className="flex h-dvh w-full">
      <div className="flex w-full items-center">
        <div className="container relative -top-16 w-full px-8 pb-32">
          <div className="flex justify-center">
            <Image src={cubeImageSrc} height={278} width={278} alt="" />
          </div>
          <div className="relative -top-12">
            <h1 className="pt-2 text-center text-lg font-bold text-white">
              gameplays.io
            </h1>
          </div>
          <GameProvider>
            <MainPageForm />
          </GameProvider>
        </div>
      </div>
      <PoweredByGeminiFooter />
    </div>
  );
}

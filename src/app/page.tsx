import Image from "next/image";
import { PlatformsDrawer } from "@/app/PlatformsDrawer";
import cubeImageSrc from "@/assets/cube.png";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { Icon } from "@/components/ui/icons/Icon";

export default async function Home() {
  return (
    <div className="flex h-dvh w-full">
      <div className="flex w-full items-center">
        <div className="container w-full px-8 pb-32">
          <div className="flex justify-center">
            <Image src={cubeImageSrc} height={278} width={278} alt="" />
          </div>
          <div className="relative -top-12">
            <h1 className="pt-2 text-center text-lg font-bold text-white">
              gameplays.io
            </h1>
          </div>
          <form className="flex flex-col items-center justify-center gap-8">
            <TextArea
              required
              id="likedGames"
              name="likedGames"
              rows={6}
              placeholder="Example: I like challenging puzzle games with adventures like legend of zelda or Tunic"
            />
            <PlatformsDrawer />
            <div className="w-full sm:max-w-56">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
      <footer className="fixed bottom-16 flex w-full items-center justify-center gap-2">
        <div className="pt-1 text-white opacity-30">Powered by</div>
        <div className="sr-only">Gemini</div>
        <Icon
          className="text-white opacity-30"
          name="gemini"
          width={56}
          height={21}
        />
      </footer>
    </div>
  );
}

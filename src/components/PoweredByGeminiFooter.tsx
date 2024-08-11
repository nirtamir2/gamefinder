import { Icon } from "@/components/ui/icons/Icon";

export function PoweredByGeminiFooter() {
  return (
    <footer className="absolute bottom-32 flex w-full items-center justify-center gap-2">
      <div className="pt-1 text-white opacity-30">Powered by</div>
      <div className="sr-only">Gemini</div>
      <Icon
        className="text-white opacity-30"
        name="gemini"
        width={56}
        height={21}
      />
    </footer>
  );
}

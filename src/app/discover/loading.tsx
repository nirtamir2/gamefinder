import { Loader } from "@/components/ui/Loader/Loader";

export default function LoadingPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center">
      <Loader />
      <div className="relative -top-8 animate-pulse text-balance px-16 text-white opacity-30">
        Building your feed...
      </div>
    </div>
  );
}

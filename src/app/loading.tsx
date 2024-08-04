import { Loader } from "@/components/ui/Loader/Loader";

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Loader />
      <div className="relative -top-8 animate-pulse text-balance px-16 text-white opacity-30">
        Loading...
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import Image from "next/image";
import cubeImageSrc from "@/assets/cube.png";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center">
      <Image src={cubeImageSrc} height={278} width={278} alt="" />
      <h2 className="relative -top-8">Something went wrong!</h2>
      <div className="w-full max-w-56">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset?.()
          }
        >
          Try again
        </Button>
      </div>
    </div>
  );
}

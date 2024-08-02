"use client";

import { Suspense } from "react";
import Lottie from "lottie-react";
import loader from "./loader.json";

export function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="size-56">
        <Suspense fallback={null}>
          <Lottie animationData={loader} />
        </Suspense>
      </div>
    </div>
  );
}

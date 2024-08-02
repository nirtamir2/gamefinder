"use client";

import Lottie from "lottie-react";
import loader from "./loader.json";

export function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="size-56 rounded-full bg-primary">
        <Lottie animationData={loader} />
      </div>
    </div>
  );
}

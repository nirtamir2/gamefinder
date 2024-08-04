import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gameplays.io",
    short_name: "gameplays.io",
    description:
      "Find great games with AI and watch gameplay videos on Gameplays.io",
    start_url: "/",
    display: "standalone",
    background_color: "#010204",
    theme_color: "#010204",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

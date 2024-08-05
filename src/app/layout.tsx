import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { Providers } from "@/app/Providers";
import "./globals.css";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Gameplays.io - Discover Great Games to Play",
  description:
    "Find great games with AI and watch gameplay videos on Gameplays.io.",
  keywords: ["gaming", "AI recommendations", "gameplay videos"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceMono.className}>
        <Providers>{children}</Providers>
      </body>
      <Analytics />
    </html>
  );
}

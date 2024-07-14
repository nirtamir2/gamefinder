import createJiti from "jiti";
			import nextBundleAnalyzer from "@next/bundle-analyzer";
import process from "node:process";

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env["BUNDLE_ANALYZE"] === "true",
});

const jiti = createJiti(new URL(import.meta.url).pathname);
 
// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.rawg.io/**",
            },
        ],
    },
};

export default withBundleAnalyzer(nextConfig);

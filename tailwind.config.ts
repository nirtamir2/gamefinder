import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "800px",
      },
    },
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        faded: "hsl(var(--primary-faded))",
      },
      transparent: "transparent",
      background: "hsl(var(--background))",
      "text-on-primary": "hsl(var(--text-on-primary))",
      "secondary-button-text": "hsl(var(--secondary-button-text))",
      "button-background": "hsl(var(--button-background))",
      "input-background": "hsl(var(--input-background))",
      white: "hsl(var(--white))",
    },
  },
  plugins: [],
};
export default config;

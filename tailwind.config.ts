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
    extend: {
      maxWidth: {
        "desktop-carousel": "28rem",
      },
      width: {
        "desktop-header": "32rem",
        "desktop-carousel": "28rem",
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          faded: "hsl(var(--primary-faded))",
          focus: "hsl(var(--primary-focus))",
          hover: "hsl(var(--primary-hover))",
        },
        transparent: "transparent",
        background: "hsl(var(--background))",
        overlay: "hsl(var(--overlay))",
        rating: "hsl(var(--rating))",
        "text-on-primary": "hsl(var(--text-on-primary))",
        "secondary-button-text": "hsl(var(--secondary-button-text))",
        "button-background": "hsl(var(--button-background))",
        "button-selected-background": "hsl(var(--button-selected-background))",
        "input-background": "hsl(var(--input-background))",
        "button-background-brighter": "hsl(var(--button-background-brighter))",
        white: "hsl(var(--white))",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111111",
        accent: "#DC2626",
        background: "#FFFFFF",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Oswald", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

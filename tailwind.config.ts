import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        northland: {
          blue: "#161D7A",
          teal: "#47C4DC",
          tealDark: "#20B6D2",
          ink: "#141B4D",
          slate: "#EDEDED",
          mist: "#F6F7F8"
        }
      },
      fontFamily: {
        display: ["Oswald", "Arial Narrow", "sans-serif"],
        sans: ["Montserrat", "Helvetica Neue", "sans-serif"]
      },
      boxShadow: {
        card: "0 18px 50px rgba(18, 26, 84, 0.12)"
      },
      backgroundImage: {
        "hero-pattern":
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.14), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.16), transparent 28%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 44%)",
        "statement-pattern":
          "radial-gradient(circle at 75% 50%, rgba(22,29,122,0.08), transparent 25%), radial-gradient(circle at 80% 65%, rgba(22,29,122,0.06), transparent 22%)"
      }
    }
  },
  plugins: []
};

export default config;

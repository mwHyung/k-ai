import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "15": "0.9375rem",
        "24": "1.5rem",
        "26": "1.625rem",
        "30": "1.875rem",
        "40": "2.5rem",
        "42": "2.625rem",
        "52": "3.25rem",
        "58": "3.625rem",
        "64": "4rem",
        "80": "5rem",
        "82": "5.125rem",
        "90": "5.625rem",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        plus: ["Plus Jakarta Sans", "Plus Jakarta Sans Fallback"],
        suit: ["suitVariable", "suitVariable Fallback"],
      },
      borderColor: {
        "gradient-primary":
          "linear-gradient(90deg, #FF0347 0%, #F9F9F9 11.51%, #493AED 25.7%, #F108C6 33.52%, #CEC9FF 41.17%, #FF0347 60.35%, #0854FF 68.98%, #F05DAE 86.06%, #FF0347 100%)",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(90deg, #FF0347 0%, #F9F9F9 11.51%, #493AED 25.7%, #F108C6 33.52%, #CEC9FF 41.17%, #FF0347 60.35%, #0854FF 68.98%, #F05DAE 86.06%, #FF0347 100%)",
      },
      animation: {
        loopScroll: "loopScroll 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

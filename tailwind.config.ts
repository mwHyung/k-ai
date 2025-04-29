import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "15": "0.9375rem",
        "26": "1.625rem",
        "52": "3.25rem",
        "64": "4rem",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        plus: ["Plus Jakarta Sans", "Plus Jakarta Sans Fallback"],
      },
    },
  },
  plugins: [],
};

export default config;

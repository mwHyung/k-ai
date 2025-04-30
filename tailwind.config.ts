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
        "26": "1.625rem",
        "52": "3.25rem",
        "64": "4rem",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        plus: ["Plus Jakarta Sans", "Plus Jakarta Sans Fallback"],
      },
      borderColor: {
        "gradient-primary":
          "linear-gradient(90deg, #FF0347 0%, #F9F9F9 11.51%, #493AED 25.7%, #F108C6 33.52%, #CEC9FF 41.17%, #FF0347 60.35%, #0854FF 68.98%, #F05DAE 86.06%, #FF0347 100%)",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(90deg, #FF0347 0%, #F9F9F9 11.51%, #493AED 25.7%, #F108C6 33.52%, #CEC9FF 41.17%, #FF0347 60.35%, #0854FF 68.98%, #F05DAE 86.06%, #FF0347 100%)",
      },
    },
  },
  plugins: [],
};

export default config;

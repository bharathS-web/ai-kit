import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", ":is(.dark:not(.preview-light, .preview-light *), .preview-dark, .preview-dark *)"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/react/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/react/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          25: "#FCFAFF",
          50: "#F9F5FF",
          100: "#F4EBFF",
          200: "#E9D7FE",
          300: "#D6BBFB",
          400: "#B692F6",
          500: "#9E77ED",
          600: "#7F56D9",
          700: "#6941C6",
          800: "#53389E",
          900: "#42307D",
          950: "#2C1C5F",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        xs: "0px 1px 2px rgba(16, 24, 40, 0.05)",
        skeuomorphic: "0px 1px 2px rgba(16, 24, 40, 0.05), inset 0px -2px 0px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;

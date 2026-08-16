import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

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
        // Base — monochrome foundation
        ink: {
          DEFAULT: "#0A0A0A",
          light: "#FFFFFF",
        },
        // Neutrals — zinc, not gray
        neutral: colors.zinc,

        // Accent — used on interactive elements, buttons, links, focus rings
        accent: {
          50:  "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",  // primary accent — buttons, links, focus rings
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },

        // Brand alias mapping to accent for backwards compatibility
        brand: {
          25:  "#EEF2FF",
          50:  "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
          950: "#1E1B4B",
        },

        // Semantic
        warning: colors.amber,
        danger: colors.red,
        success: colors.emerald,
      },
      fontFamily: {
        sans: ["Geist", "Inter", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(0,0,0,0.04)",
        sm: "0 1px 3px rgba(0,0,0,0.08)",
        skeuomorphic: "0px 1px 2px rgba(16, 24, 40, 0.05), inset 0px -2px 0px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      eUkraine: ["e-Ukraine", ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      sm: ["0.875rem", "1.25rem"], // 14px/20px
      base: ["1rem", "1.25rem"], // 16px/20px
      lg: ["1.25rem", "1.5rem"], // 20px/24px
      xl: ["1.5rem", "2rem"], // 24px/32px
      "2xl": ["2.5rem", "2.5rem"], // 24px/32px
    },
    colors: {
      background: "#F7F3F5",
      text: {
        base: "#0A100D",
        white: "#FFFFFF",
      },
      main: {
        black: "#0A100D",
        white: "#FFFFFF",
        blue: "#A3ACE1",
        rose: "#D6C3C9",
        pink: "#B6465F",
        yellow: "#FCFC62",
      },
      neutral: {
        100: "#C0C3C3",
        200: "#ACB0B0",
        300: "#979B9B",
        400: "#838787",
        500: "#6F7373",
        600: "#5A5E5E",
        700: "#464B4B",
        800: "#313635",
        900: "#1D2220",
        1000: "#0A100D",
      },
    },
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

import { heroui } from "@heroui/react";

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      smOnly: { max: "767px" },
      md: "768px",
      mdOnly: { max: "1279px" },
      xl: "1280px",
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "12px",
          sm: "12px",
          md: "34px",
          xl: "2rem",
        },
      },
      fontFamily: {
        'montserrat': ['var(--font-montserrat)', 'serif'],
      },
      colors: {
        bgWhite: "#fff",
        black: "#333333",
        grey: "#666666",
        lightGrey: "#7E7E7E",
        white: "#EFEDE8",
        darkAccent: "#teal-800",
        accent: "#658C4A",
        lightAccent: "#80cbc4",
        extraLightAccent: "#e0f2f1",
        sectionBg: "#FFEFE5",
      },
    },
  },
  plugins: [heroui()],
};

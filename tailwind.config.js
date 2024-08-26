import { nextui } from '@nextui-org/react';

const { teal } = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            ...teal,
            DEFAULT: teal["500"],  // Tailwind amber[500]
            foreground: "white",  // Cambia el color del texto si lo deseas
          },
        },
      },
    },
  })]
}
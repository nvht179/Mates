/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    sans: ["Inter", "sans-serif"],
    extend: {
      colors: {
        // Base colors
        fg: {
          default: "#242424",
          soft: "#424242",
          softer: "#616161",
          disabled: "#C7C7C7",
          border: "#D1D1D1",
          alt: "#F5F5F5",
        },
        bg: {
          default: "#FFFFFF",
          soft: "#FAFAFA",
          dark: "#F5F5F5",
          darker: "#EBEBEB",
        },

        // Primary colors
        primary: {
          default: "#5B5FC7",
          dark: "#444791",
          darker: "#3D3E78",
          border: "#9299F7",
          bg: "#E8EBFA",
        },

        // Status colors
        red: {
          default: "#C4314B",
          bg: "#FCF4F6",
        },
        yellow: {
          default: "#835C00",
          bg: "#FBF6D9",
        },
        green: {
          default: "#237B4B",
          bg: "#E7F2DA",
        },
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};

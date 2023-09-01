/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E25E3E",
          50: "#FAE3DE",
          100: "#F7D4CC",
          200: "#F2B7A8",
          300: "#ED9985",
          400: "#E77C61",
          500: "#E25E3E",
          600: "#CA401E",
          700: "#993017",
          800: "#682110",
          900: "#371108",
          950: "#1F0A05",
        },
      },
    },
  },
  plugins: [],
};

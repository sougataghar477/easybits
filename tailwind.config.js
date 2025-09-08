/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 👈 important for theme wrapper
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

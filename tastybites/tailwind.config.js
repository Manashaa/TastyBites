/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.{js,jsx,ts,tsx}",      // 👈 Add this line
    "./app/**/*.{js,jsx,ts,tsx}",   // For all pages/screens
    "./components/**/*.{js,jsx,ts,tsx}", // Optional: for custom components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

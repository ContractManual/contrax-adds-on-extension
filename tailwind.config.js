/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#0a9396',
          200: '#005f73',
          300: '#001219',
        },
        secondary: {
          100: '#ee9b00',
          200: '#ca6702',
          300: '#bb3e03',
        },
        disabled: "#f4f4f4",
        error: '#ae2012',
      }
    },
  },
  plugins: [require('tailwindcss-animated')],
};

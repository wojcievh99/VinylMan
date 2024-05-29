/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-500': '#3c3c3c',
        'black-600': '#282828',
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "mobile": "375px",
        //=> @media (min-width: 375px)
        "desktop" : "1440px"
        //=> @media (min-width: 1440px)
      }
    },
  },
  plugins: [],
}


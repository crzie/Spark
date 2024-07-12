/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
      },
      backgroundImage: {
        'green-white': 'linear-gradient(90deg, rgba(27,138,82,1) 25%, rgba(35,155,93,1) 50%, rgba(255,255,255,1) 100%)',
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg1: "rgb(188, 0, 162)",
        bg2: "rgb(0, 17, 82)",
        color1: "rgb(18, 113, 255)",
        color2: "rgb(221, 74, 255)",
        color3: "rgb(180, 220, 255)",
        color4: "rgb(200, 50, 50)",
        color5: "rgb(180, 180, 50)",
        interactive: "rgb(140, 100, 255)",
      },
      backgroundImage: {
        "green-white":
          "linear-gradient(90deg, rgba(27,138,82,1) 25%, rgba(35,155,93,1) 50%, rgba(255,255,255,1) 100%)",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};

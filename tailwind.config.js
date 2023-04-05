/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "rgb(59 130 246)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

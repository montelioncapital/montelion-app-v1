/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#0B0E13",
        panel: "#11151C",
        text: "#E6EAF2",
        subtle: "#A0A8B8",
        primary: {
          50:"#E8F1FF",100:"#D6E6FF",200:"#AFC9FF",300:"#7FA9FF",
          400:"#4C88FF",500:"#1D6CFD",600:"#1456D6",700:"#0E43AA",800:"#0A317E",900:"#072456"
        },
        success: "#1DB954", warning: "#F5A524", danger: "#F04444"
      },
      borderRadius: { xl2: "1.25rem" }
    },
  },
  plugins: [],
};

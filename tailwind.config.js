/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Deep royal blue (référence des captures Pinterest)
        accent: {
          DEFAULT: "#3B5BFE",
          600: "#2F49CC",
          700: "#273DAF",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(59,91,254,.5), 0 8px 30px rgba(59,91,254,.25)",
      },
      backdropBlur: {
        20: "20px",
      },
      maxWidth: {
        card: "44rem",
        hero: "72rem",
      },
    },
  },
  plugins: [],
};

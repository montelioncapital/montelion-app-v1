/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deeper, richer blue like your ref
        accent: {
          DEFAULT: "#2F53FF", // primary
          100: "#EDF1FF",
          200: "#C7D1FF",
          300: "#9FAFFF",
          400: "#5878FF",
          500: "#2F53FF", // used for buttons
          600: "#2342D1",
          700: "#1C36AA",
          800: "#162A85",
          900: "#0E1B54",
        },
      },
      boxShadow: {
        'card': '0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)',
      },
      borderRadius: {
        'xl2': '1rem',
      },
    },
  },
  plugins: [],
};

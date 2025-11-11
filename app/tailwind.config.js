/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0D12",
        surface: "#12151C",
        subtle: "#9AA3B2",
        primary: {
          300: "#6BA7FF",
          400: "#4D8DFF",
          500: "#2F74FF",
          600: "#255BCA"
        }
      },
      borderRadius: {
        xl2: "14px",
        xl3: "22px"
      },
      boxShadow: {
        "soft": "0 10px 30px rgba(0,0,0,.35)",
        "glow": "0 0 0 3px rgba(47,116,255,.12), 0 10px 40px rgba(47,116,255,.18)"
      },
      backdropBlur: {
        sm: "6px"
      }
    }
  },
  plugins: []
};

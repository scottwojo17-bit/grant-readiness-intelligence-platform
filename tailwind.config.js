/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17212b",
        slateLine: "#d8dee7",
        platformBlue: "#1d4f91",
        platformTeal: "#0e9384",
        platformGreen: "#16833a",
        platformGold: "#b7791f",
        platformRed: "#c4352b",
      },
      boxShadow: {
        panel: "0 1px 2px rgba(16, 24, 40, 0.06), 0 10px 24px rgba(16, 24, 40, 0.08)",
      },
    },
  },
  plugins: [],
};

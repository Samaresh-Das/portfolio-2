/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        "16px": "16px",
        "8px": "8px",
        "128px": "128px",
        "68px": "68px",
      },
      colors: {
        portfolio: "#1B1A17",
      },
    },
  },
  plugins: [],
};

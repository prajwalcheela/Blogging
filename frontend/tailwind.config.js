/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minWidth: {
        "3xl": "48rem", // Adjust the value as needed
        "5xl": "64rem",
      },
    },
  },
  plugins: [],
};

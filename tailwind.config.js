/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors : {
        "primary": "#ffbe98",
        "secondary": "#f05a7e",
        "third": "#125b9a",
        "fourth": "#0b8494",
      }
    },
  },
  plugins: [],
}


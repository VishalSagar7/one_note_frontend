/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins : ['Roboto', 'sans-serif'],
        roboto : ["Roboto", 'sans-serif'],
        cursive : ["Edu AU VIC WA NT Hand", "cursive"]
      },
    },
  },
  plugins: [],
}


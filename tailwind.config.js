/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#f4f7fd',
          primary: '#d8d7f1',
          secondary: '#635fc7'
        },
        dark: {
          background: '#20212c'
        }
      }
    },
  },
  plugins: [],
}


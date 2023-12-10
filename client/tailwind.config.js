/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}",],
  theme: {
    extend: {
      colors:{
        'primary' : '#e8cd9e',
        'lightBlack': '#161b22',
        'secondary' : '#f05179' 
      }
    },
  },
  plugins: [],
}
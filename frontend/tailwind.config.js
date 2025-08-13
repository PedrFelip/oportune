/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0c1a2c',
        'dark-bg-end': '#15223c',
        'card': '#0c3c6c',
        'muted': '#c4d3e6',
        'accent': '#2474e4',
        'accent-2': '#639bec',
        'accent-3': '#40638c',
        'glass': 'rgba(196,211,230,0.04)',
        'glass-2': 'rgba(196,211,230,0.02)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

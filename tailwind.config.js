/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        favicon: '#A5F',
        faviconDarker: '#8829e7'
      }
    }
  },
  plugins: []
}

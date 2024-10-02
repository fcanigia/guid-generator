/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        favicon: '#8829e7',
        faviconDarker: '#5d03b7'
      }
    }
  },
  plugins: []
}

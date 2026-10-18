/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Plus Jakarta Sans', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ideo: {
          dark: '#151F27',
          darkest: '#0E151A',
          lime: '#D9FF00',
          yellow: '#FFDE00',
          alchemy: '#E9C46A',
          paper: '#FBFBFA',
          stone: '#EFEFED',
          vermilion: '#FF3B1D',
          muted: '#7B92A5'
        },
        vermilion: '#FF3B1D',
        concrete: '#EAEAE7',
      },
    },
  },
  plugins: [],
}
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
          orange: '#FF5500',
          accent: '#FF5500',
          paper: '#FBFBFA',
          stone: '#EFEFED',
          vermilion: '#FF5500',
          muted: '#7B92A5'
        },
        accent: {
          DEFAULT: '#FF5500',
          hover: '#E04B00',
        },
        vermilion: '#FF5500',
        concrete: '#EAEAE7',
      },
    },
  },
  plugins: [],
}
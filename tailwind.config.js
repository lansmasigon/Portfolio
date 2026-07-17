/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA',
        surface: '#FFFFFF',
        'surface-secondary': '#F2F5F8',
        'text-primary': '#111111',
        'text-secondary': '#707070',
        border: '#ECECEC',
        accent: {
          blue: '#1944F1',
          purple: '#9333EA',
        },
        blue: {
          DEFAULT: '#1944F1',
          deep: '#1944F1',
          accent: '#1944F1',
        }
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
      }
    },
  },
  plugins: [],
}

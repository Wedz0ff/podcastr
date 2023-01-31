/** @type {import('tailwindcss').Config} */

colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        rocketPurple: {
          300: '#9f75ff',
          400: '#9164fa',
          500: '#8256e5',
          800: '#6f48c9',
        },

        rocketGreen: {
          500: '#04d361',
        },

        rocketGray: {
          50: '#f7f9fa',
          100: '#e6e8eb',
          200: '#afb2b1',
          500: '#808080',
          800: '#494d4b',
        },
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      heading: ['Lexend', 'sans-serif'],
    },
  },
  plugins: [],
};

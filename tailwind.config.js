/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const svgToDataUri = require('mini-svg-data-uri')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

module.exports = {
  content: [
    './index.html',
  ],
  darkMode: 'class', // or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Readex Pro', ...defaultTheme.fontFamily.sans],
        display: ['Gilroy-Bold', ...defaultTheme.fontFamily.sans],
        body: ['Gilroy-Medium', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#efe7fc',
          100: '#d5c4f8',
          200: '#b89cf4',
          300: '#9b71f1',
          400: '#8250ed',
          500: '#672ce8',
          600: '#5a28e2',
          700: '#471fd9',
          800: '#3217d4',
          900: '#0008c5',
        },
        secondary: {
          50: '#fbf7ff',
          100: '#f4f1ff',
          200: '#ece8f9',
          300: '#dcd9ea',
          400: '#b9b5c6',
          500: '#9996a6',
          600: '#706d7c',
          700: '#5d5a68',
          800: '#3e3b49',
          900: '#1d1b27',
        },
        blue: '#0C6CF2',
        sky: '#0590DE',
        light: '#D4DFE9',
        night: '#0A0515',
        lightblue: '#6482BC',
        nightblue: '#242D38',
        darkblue: '#121D33',
        green: '#6DA62C',
        orange: '#F59C1C',
        lightorange: '#EDC298',
        red: '#dc3545',
        yellow: '#FDAF17',
      }
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-grid': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      )

      matchUtilities(
        {
          highlight: (value) => ({ boxShadow: `inset 0 1px 0 0 ${value}` }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      )
    },
    require('tailwind-scrollbar')({ nocompatible: true }),
    function({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === 'string'
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    },
  ],
}

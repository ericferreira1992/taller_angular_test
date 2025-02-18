/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,scss,ts}'],
  theme: {
    colors: {
      'white': colors.white,
      'black': colors.black,
      'red': colors.red,
      'blue': colors.blue,
      'green': colors.green,
      'amber': colors.amber,
      'yellow': colors.yellow,
      'gray': colors.gray,
    }
  },
}

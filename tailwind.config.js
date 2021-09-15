// const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    // './src/**/*.{html,vue,js,scss}',
    // https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    './src/assets/**/*.{css,scss}',
    './src/components/**/*.vue',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    // './src/mixins/**/*.js',
    './src/use/**/*.js',
    './src/App.vue',
    './src/main.js',
  ],
  // presets: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Avenir', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}

module.exports = {
  purge: [
    './src/ui/**/*.tsx',
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/pages/**/*.js',
    './src/components/**/*.js',
  ], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: '#1C133A',
        minsk: '#46367C',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

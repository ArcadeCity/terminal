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
        amber: '#ffa76c',
        arwes: '#7efcf6',
        arwes2: '#acf9fb',
        bluebell: '#9D98CB',
        electricindigo: '#5B20F2',
        electricviolet: '#AE30FF',
        haiti: '#120B29',
        minsk: '#46367C',
        moonraker: '#EEECFB',
        pinkflamingo: '#F459F4',
        dpink: '#8d85a1',
        dlpink: '#f9f8f9',
        softpink: '#ebe8ef',
        dpurp: '#2f1d58',
        purple: '#1C133A',
        radicalred: '#FC3A57',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

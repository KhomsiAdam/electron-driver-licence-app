module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#fcf5f7',
          '100': '#f9ebee',
          '200': '#efccd6',
          '300': '#e5aebd',
          '400': '#d2718b',
          '500': '#be3459',
          '600': '#ab2f50',
          '700': '#8f2743',
          '800': '#721f35',
          '900': '#5d192c'
        },
        'secondary': {
          '50': '#fefbfb',
          '100': '#fdf6f6',
          '200': '#fbeaea',
          '300': '#f8dddd',
          '400': '#f2c3c3',
          '500': '#eda9a9',
          '600': '#d59898',
          '700': '#b27f7f',
          '800': '#8e6565',
          '900': '#745353'
        }
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
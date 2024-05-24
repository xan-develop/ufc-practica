/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tw-elements/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'rojo-fresa': '#DC2A20',
        'gris-menu': '#323232'
      },
      spacing:{
        '50': '50%',
      }
    },
    screens:{
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1200px',
      'xg': '900px'

    }
  },
  plugins: [require("tw-elements/plugin.cjs"),
  require('tailwindcss-animated')
  ]
}


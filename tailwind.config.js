module.exports = {
  mode: 'jit',

  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],

  theme: {
    extend: {
      lineClamp: {
        3: '3',
        5: '5'
      },
      colors: {
        activeBorderColor: '#1677ff'
      }
    }
  },

  plugins: [require('@tailwindcss/line-clamp')]
}

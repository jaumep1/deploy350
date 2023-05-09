/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    theme: {
      extend: {
        gridTemplateColumns: {
          sidebar: '300px auto',
          16: 'repeat(16, minmax(0, 1fr))',
        },
        gridTemplateRows: {
          header: '64px auto',
        },
      },
    },
  },
  plugins: [],
};

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'jargon-purple': '#701EF5',
        'jargon-blue': '#7E8EF8',
        'light-grey': '#DDDDDD',
        'light-green': '#AEFADA',
        'background-purple': '#EAE5FD',
        'background-blue': '#a0baff',
        'text-black': '#363636',
        'correct': '#AEFADA',
        'wrong': '#FFCAD7',
      },
      fontFamily: {
        'quicksand': ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
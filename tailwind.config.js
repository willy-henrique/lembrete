/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './index.tsx', './App.tsx', './components/**/*.tsx', './services/**/*.ts', './utils/**/*.ts', './constants.ts', './types.ts'],
  theme: {
    extend: {
      fontFamily: {
        'agro-title': ['"Playfair Display"', 'serif'],
        cursive: ['"Great Vibes"', 'cursive'],
      },
    },
  },
  plugins: [],
};

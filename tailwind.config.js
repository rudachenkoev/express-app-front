/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      white: 'rgb(var(--color-white) / <alpha-value>)',
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      accent: 'rgb(var(--color-accent) / <alpha-value>)',
      secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      surface: 'rgb(var(--color-surface) / <alpha-value>)',
      info: 'rgb(var(--color-info) / <alpha-value>)'
    }
  },
  plugins: [],
}


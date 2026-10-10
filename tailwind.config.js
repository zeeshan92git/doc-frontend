/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 'primary' kept so any class referencing it keeps working; now maps to moss
        primary: '#2F4A3A',
        bone: '#F0E9DB',
        ink: '#15170F',
        moss: { DEFAULT: '#2F4A3A', deep: '#1C2E24' },
        brick: '#9F3A2A',
        sage: '#A9B79A',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill , minmax(200px , 1fr))'
      }
    },
  },
  plugins: [],
}

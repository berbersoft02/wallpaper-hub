/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#ff2a6d',
        'neon-cyan': '#05d9e8',
        'neon-purple': '#d300c5',
        'dark-bg': '#01012b',
        'card-bg': '#1a1a2e',
      },
      fontFamily: {
        pixel: ['var(--font-pixel)'],
        body: ['var(--font-body)'],
      },
    },
  },
  plugins: [],
}

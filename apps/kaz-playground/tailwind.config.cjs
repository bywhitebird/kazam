const { fontFamily, colors } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
      colors: {
        gray: Object.fromEntries(
          [...Array(11).keys()].map((i) => {
            const formattedI = Number.parseInt(`${i}00`).toString()
            return [
              formattedI,
              `var(--color-gray-${formattedI})`,
            ]
          }),
        ),
        blue: {
          ...colors.blue,
          'code-selection': '#21303a',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
}

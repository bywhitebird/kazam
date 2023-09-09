import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx,vue}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},

    // 👇🏻 Define your tokens here
    tokens: {
      colors: {
        primary: { value: '#0FEE0F' },
        secondary: { value: '#EE0F0F' },
      },
      fonts: {
        body: { value: 'system-ui, sans-serif' },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',

  // Generate JSX components
  jsxFramework: 'vue',
})

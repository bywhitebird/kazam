import { defineConfig } from '@pandacss/dev'
import { whitebirdPreset } from '@whitebird/ui/panda-preset'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx,vue}'],

  // Files to exclude
  exclude: [],

  presets: [whitebirdPreset],

  // The output directory for your css system
  outdir: './src/styled-system',

  // Generate JSX components
  jsxFramework: 'vue',
})

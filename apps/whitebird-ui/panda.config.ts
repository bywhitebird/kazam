import { defineConfig } from '@pandacss/dev'

import { whitebirdPreset } from './src/panda/whitebird-preset'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  include: [
    './src/components/**/*.{js,jsx,ts,tsx,kaz}',
    './src/stories/**/*.{js,jsx,ts,tsx,kaz}',
    // NOTE: PandaCSS statically analyzes TSX files. However, it does not analyze
    // Kaz files. Therefore, we need to include the compiled TSX files.
    './dist/react/**/*.{js,jsx,ts,tsx}',
  ],

  // Files to exclude
  exclude: [],

  presets: [whitebirdPreset],

  // The output directory for your css system
  outdir: 'styled-system',

  prefix: 'wb',
})

import { createResolver } from '@nuxt/kit'
import * as glob from 'glob'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    'nuxt-typed-router',
    './modules/panda',
    ...glob.sync('./src/*').map(path => `~/${path}`),
  ],

  alias: {
    'styled-system': resolve('./styled-system'),
  },

  css: [
    '@/assets/css/global.css',
  ],

  postcss: {
    plugins: {
      '@pandacss/dev/postcss': {},
    },
  },

  imports: {
    presets: [
      {
        from: '~/styled-system/css',
        imports: ['css'],
      },
    ],
  },
})

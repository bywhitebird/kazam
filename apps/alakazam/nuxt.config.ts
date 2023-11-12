import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  srcDir: 'src',

  modules: [
    'nuxt-typed-router',
    'nuxt-auth-utils',
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

  build: {
    transpile: ['fsevents'],
  },

  runtimeConfig: {
    oauth: {
      github: {
        clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET,
      }
    }
  }
})
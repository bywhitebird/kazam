import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  srcDir: 'src',

  modules: [
    'nuxt-typed-router',
    'nuxt-auth-utils',
    'nuxt-security',
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
      {
        from: '~/shared/utils/database',
        imports: ['database', { name: 'database', as: 'db' }],
      },
    ],
  },

  nitro: {
    imports: {
      presets: [
        {
          from: '~/shared/utils/database',
          imports: ['database', { name: 'database', as: 'db' }],
        },
      ]
    },
  },

  build: {
    transpile: ['fsevents'],
  },

  runtimeConfig: {
    oauth: {
      github: {
        clientId: process.env.GITHUB_APP_CLIENT_ID,
        clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
      },
    },
  },

  routeRules: {
    ...process.env.ALAKAZAM_GET_LIVE_COMPONENT_PATH !== undefined && {
      [process.env.ALAKAZAM_GET_LIVE_COMPONENT_PATH]: {
        security: {
          corsHandler: {
            origin: '*',
            methods: ['POST'],
          },
        },
      },
    },
  }
})

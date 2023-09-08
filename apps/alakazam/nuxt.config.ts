import * as glob from 'glob'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-typed-router',
    ...glob.sync('./src/*').map(path => `~/${path}`),
  ],
})

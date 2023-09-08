import * as path from 'node:path'

import { defineNuxtFeature } from '../../utils/define-nuxt-feature'

export default defineNuxtFeature(__dirname,
  [
    {
      name: 'welcome-page',
      path: '/',
      file: './pages/welcome.vue',
    },
  ]
    .map(route => ({
      ...route,
      file: path.resolve(__dirname, route.file),
    })),
)

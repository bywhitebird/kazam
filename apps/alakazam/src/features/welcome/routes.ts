import * as path from 'node:path'

import type { NuxtPage } from 'nuxt/schema'

export default [
  {
    name: 'welcome-page',
    path: '/',
    file: './pages/welcome.vue',
  },
]
  .map(route => ({
    ...route,
    file: path.resolve(__dirname, route.file),
  })) satisfies NuxtPage[]

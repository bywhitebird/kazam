import { createResolver } from '@nuxt/kit'

import type { NuxtPage } from 'nuxt/schema'

export const defineNuxtRoutes = (dirname: string, routes: {
  name: string,
  path: `/${string}`,
  file: `./pages/${string}.vue`,
}[]): NuxtPage[] => {
  const { resolve } = createResolver(dirname)

  return routes.map(route => ({
    ...route,
    file: resolve(dirname, route.file),
  }))
}

import {
  addComponentsDir, addImportsDir, defineNuxtModule, extendPages,
  createResolver, loadNuxtConfig, resolveFiles, addRouteMiddleware,
} from '@nuxt/kit'
import type { NuxtPage } from '@nuxt/schema'
import jiti from 'jiti'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtModule({
  async setup() {
    const getRoutes = jiti(__filename, {
      alias: await loadNuxtConfig({}).then(c => c.alias),
    })

    const featurePaths = await resolveFiles(__dirname, '../features/**/routes.ts')

    for (const file of featurePaths) {
      const routes = getRoutes(file).default
      defineNuxtFeature(resolve(file, '..'), routes)
    }

    const sharedMiddlewarePaths = await resolveFiles(__dirname, '../shared/middlewares/**/*.ts')

    for (const middlewarePath of sharedMiddlewarePaths) {
      const middlewareName = middlewarePath.match(/\/middlewares\/([^\/]+)\.ts$/)![1]

      addRouteMiddleware({
        name: middlewareName,
        path: middlewarePath,
      })
    }

    addComponentsDir({
      path: resolve('../shared/components'),
    })

    addImportsDir(resolve('../shared/composables'))
  },
})

function defineNuxtFeature(dirname: string, routes: NuxtPage[]) {
  const { resolve } = createResolver(dirname)

  addComponentsDir({
    path: resolve('components'),
  })

  addImportsDir(resolve('./composables'))

  extendPages((pages) => {
    pages.push(...routes)
  })
}

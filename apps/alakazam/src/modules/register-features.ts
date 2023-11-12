import {
  addComponentsDir, addImportsDir, defineNuxtModule, extendPages,
  createResolver, loadNuxtConfig, resolveFiles,
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
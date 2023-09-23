import * as path from 'node:path'

import { addComponentsDir, addImportsDir, defineNuxtModule, extendPages } from '@nuxt/kit'
import type { NuxtPage } from '@nuxt/schema'
import { glob } from 'glob'

export default defineNuxtModule({
  async setup() {
    const featurePaths = await glob(path.resolve(__dirname, '../features/**/routes.ts'))

    for (const file of featurePaths) {
      const routes = await import(/* @vite-ignore */ file).then(m => m.default)

      defineNuxtFeature(path.dirname(file), routes)
    }
  },
})

function defineNuxtFeature(dirname: string, routes: NuxtPage[]) {
  addComponentsDir({
    path: path.join(dirname, 'components'),
  })

  addImportsDir(path.resolve(dirname, './composables'))

  extendPages((pages) => {
    pages.push(...routes)
  })
}

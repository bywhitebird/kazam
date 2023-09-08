import * as path from 'node:path'

import { addComponentsDir, addImportsDir, defineNuxtModule, extendPages } from '@nuxt/kit'
import type { NuxtPage } from '@nuxt/schema'

export const defineNuxtFeature = (dirname: string, routes: NuxtPage[]) => {
  return defineNuxtModule({
    setup() {
      addComponentsDir({
        path: path.join(dirname, 'components'),
      })

      addImportsDir(path.resolve(dirname, './composables'))

      extendPages((pages) => {
        pages.push(...routes)
      })
    },
  })
}

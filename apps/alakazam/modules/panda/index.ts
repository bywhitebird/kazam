import * as path from 'node:path'

import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit'
import { glob } from 'glob'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtModule({
  async setup() {
    const componentsPath = path.resolve(__dirname, '../../styled-system/jsx')

    const componentFiles = glob.sync(`${componentsPath}/*.mjs`)

    for (const file of componentFiles) {
      const componentName = path.basename(file, '.mjs')
      const exportedComponentName = await import(file).then(m => Object.keys(m)[0])

      addComponent({
        name: exportedComponentName,
        export: exportedComponentName,
        filePath: resolve(`${componentsPath}/${componentName}.mjs`),
      })
    }
  },
})

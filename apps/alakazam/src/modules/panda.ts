import {
  addComponent, createResolver,
  defineNuxtModule, resolveFiles,
} from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtModule({
  async setup() {
    const componentsPath = resolve(__dirname, '../styled-system/jsx')

    const componentFiles = await resolveFiles(__dirname, `${componentsPath}/*.mjs`)

    for (const file of componentFiles) {
      const componentName = file.split('/').pop()?.replace(/\.mjs$/, '')
      const exportedComponentName = await import(/* @vite-ignore */ file).then(m => Object.keys(m)[0])

      addComponent({
        name: exportedComponentName,
        export: exportedComponentName,
        filePath: resolve(`${componentsPath}/${componentName}.mjs`),
      })
    }
  },
})

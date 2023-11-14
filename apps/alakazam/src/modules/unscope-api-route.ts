import {
  defineNuxtModule, addServerHandler, resolveFiles,
} from '@nuxt/kit'

const EXCEPTED_PATHS = [
  '/api/auth',
]

export default defineNuxtModule({
  async setup(_options, nuxt) {
    const routePaths = await resolveFiles(__dirname, '../server/api/**/*.ts')

    for (const routePath of routePaths) {
      if (EXCEPTED_PATHS.some(path => routePath.includes(path))) {
        continue
      }

      nuxt._ignore?.add(routePath)
      nuxt._ignorePatterns?.push(routePath)

      const unscopedPath = routePath.replace(/\/api\/(?:[^\/]+\/)+/, '/api/')
      
      const route = unscopedPath.match(/(\/api\/[^\/\.]+)/)?.[1] ?? ''
      const method = routePath.match(/\.([^.]+)\.ts$/)?.[1] ?? 'get'

      console.log(`Registering ${method.toUpperCase()} ${route}`)

      addServerHandler({
        route,
        method,
        handler: routePath,
      })
    }
  },
})

import { defineNuxtModule } from '@nuxt/kit'
import { colors } from 'consola/utils'
import ngrok from 'ngrok'

const CONFIG_KEY = 'ngrok'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-ngrok',
    configKey: CONFIG_KEY,
  },
  async setup(resolvedOptions: Partial<ngrok.Ngrok.Options>, nuxt) {
    if (nuxt.options.dev === false) {
      return
    }

    const ngrokOptions: ngrok.Ngrok.Options = {
      addr: nuxt.options.devServer.port,
      ...resolvedOptions,
    }
    const url = await ngrok.connect(ngrokOptions)

    nuxt.options.runtimeConfig[CONFIG_KEY] = {
      url,
    }

    nuxt.addHooks({
      'devtools:initialized'() {
        console.log(String.prototype.concat(
          colors.blue(`  ➜ Tunnel:   `),
          colors.underline(colors.cyan(url)),
        ))
      },
      'app:resolve'() {
        if (!ngrokOptions.auth) {
          console.warn(
            `ngrok tunnel is exposed to the public without password protection! Consider setting the ${colors.bold(`${CONFIG_KEY}.auth`)} option.`,
          )
        }
      },
      'close'() {
        ngrok.disconnect()
        ngrok.kill()
      }
    })
  },
})

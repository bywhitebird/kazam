import { type LanguageServerPlugin, createConnection, startLanguageServer } from '@volar/language-server/node'
import createTypescriptService from 'volar-service-typescript'

import { language } from './language'
import { createKazService } from './service'

const plugin: LanguageServerPlugin = () => ({
  extraFileExtensions: [{ extension: 'kaz', isMixedContent: true, scriptKind: 7 }],
  resolveConfig(config) {
    // languages
    config.languages ??= {}
    config.languages.kaz ??= language

    // services
    config.services ??= {}
    config.services.ts ??= createTypescriptService()
    config.services.kaz ??= createKazService()

    return config
  },
})

startLanguageServer(createConnection(), plugin)

import chokidar from 'chokidar'

import { generate } from './generate'

const getFilesToWatch = ([config]: Parameters<typeof generate>): string[] => {
  if (!Array.isArray(config))
    config = [config]

  return config.flatMap(config => config.input)
}

export const generateWatch = (...argsGenerate: Parameters<typeof generate>) => {
  return new Promise<void>((_resolve, reject) => {
    // Generate once before watching
    generate(...argsGenerate)

    const watcher = chokidar.watch(getFilesToWatch(argsGenerate), {
      persistent: true,
    })

    watcher.on('change', async () => {
      await generate(...argsGenerate)
    })

    watcher.on('error', (error) => {
      reject(error)
    })
  })
}

import * as fs from 'node:fs'

import { loadConfig } from 'c12'
import { Command } from 'commander'
import { type AppProps, render } from 'ink'
import React from 'react'

import { generate } from '../../../application/usecases/generate'
import type { KazamConfig } from '../../../types/kazam-config'
import { GenerateView } from '../views/generate'

export const generateCommand = new Command()
  .command('generate')
  .description('Generate code from your Kazam files')
  .option('-c, --config <path>', 'Path to the config file', (path) => {
    if (!fs.existsSync(path))
      throw new Error(`Could not find config file at ${path}`)

    return path
  })
  .action(async (options) => {
    let exit: AppProps['exit'] | undefined
    const setExit = (_exit: AppProps['exit']) => exit = _exit

    const { config, configFile } = await loadConfig<KazamConfig>({
      name: 'kazam',
      ...(options.config && { configFile: options.config }),
    })

    if (config === null || configFile === undefined)
      throw new Error('Could not load config')

    const generatePromise = generate(config, configFile, fs)

    render(
      <GenerateView
        generatePromise={generatePromise}
        setExit={setExit}
      />,
    )

    generatePromise.finally(exit)
  })

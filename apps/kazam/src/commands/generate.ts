import * as fs from 'node:fs'

import chalk from 'chalk'
import { Command } from 'commander'

import { generate } from '../handlers/generate.js'
import { findConfigPath } from '../utils/find-config-path.js'
import { loadConfig } from '../utils/load-config.js'

export const generateCommand = new Command()
  .command('generate')
  .description('Generate code from your Kazam files')
  .option('-c, --config <path>', 'Path to the config file', (path) => {
    if (!fs.existsSync(path))
      throw new Error(`Could not find config file at ${path}`)

    return path
  })
  .action(async (options) => {
    const configPath = options.config ?? await findConfigPath()
    const config = await loadConfig(configPath)

    await generate(config)
      .then(() => {
        process.stdout.write(`\r\n${chalk.green('✔')} Generated code successfully\n`)
        process.exit(0)
      })
      .catch((error) => {
        process.stdout.write(`\r\n${chalk.red('✖')} ${error.message}\n`)
        process.exit(1)
      })
  })

import * as fs from 'node:fs'
import * as path from 'node:path'
import process from 'node:process'

const configFiles = [
  'kazam.config.js',
  'kazam.config.ts',
]

export const findConfigPath = async (dirPath: string = process.cwd()) => {
  for (const configFile of configFiles) {
    if (fs.existsSync(path.join(dirPath, configFile)))
      return path.join(dirPath, configFile)
  }

  throw new Error('Could not find a config file')
}

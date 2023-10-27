import process from 'node:process'

import { program } from 'commander'

import { generateCommand } from './commands/generate'

program
  .addCommand(generateCommand)

export const runCli = () => program.parse(process.argv)

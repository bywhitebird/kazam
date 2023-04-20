#!/usr/bin/env node

import { program } from 'commander'

import { generateCommand } from './commands/generate'

program
  .addCommand(generateCommand)

program.parse(process.argv)

#!/usr/bin/env node

import process from 'node:process'

import { program } from 'commander'

import { generateCommand } from './commands/generate'

program
  .addCommand(generateCommand)

program.parse(process.argv)

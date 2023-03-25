// @ts-expect-error - TS doesn't know about the `fs` module
import fs from 'node:fs'
// @ts-expect-error - TS doesn't know about the `path` module
import path from 'node:path'

import zodToJsonSchema from 'zod-to-json-schema'

import { Component } from '../src'

const getPackagePath = () => {
  // @ts-expect-error - TS doesn't know about the `process` module
  let currentPath = process.cwd()
  while (fs.existsSync(currentPath) && !fs.existsSync(path.join(currentPath, 'package.json')))
    currentPath = path.join(currentPath, '..')

  return currentPath
}

const packagePath = getPackagePath()
const schemaPath = path.join(packagePath, 'schema.json')

fs.writeFileSync(schemaPath, JSON.stringify(zodToJsonSchema(Component.array()), null, 2))

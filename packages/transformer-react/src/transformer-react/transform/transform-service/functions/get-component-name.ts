import * as path from 'node:path'

import { Effect, pipe } from 'effect'
import camelCase from 'just-camel-case'

import { upperFirst } from '../../../utils/upperFirst'

export const getComponentName = (filePath: string) =>
  pipe(
    path.basename(filePath, path.extname(filePath)),
    camelCase,
    upperFirst,
    Effect.succeed,
  )

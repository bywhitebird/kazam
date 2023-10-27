import * as path from 'node:path'

import { Effect, pipe } from 'effect'
import { camelCase, upperFirst } from 'lodash'

export const getComponentName = (filePath: string) =>
  pipe(
    path.basename(filePath, path.extname(filePath)),
    camelCase,
    upperFirst,
    Effect.succeed,
  )

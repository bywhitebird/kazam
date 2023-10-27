import type * as fs from 'node:fs'

import { generate as generate_ } from '../../application/usecases/generate'
import type { KazamConfig } from '../../types/kazam-config'

export const generate = (
  { rootDir, ...config }: KazamConfig & { rootDir: string },
  fileSystem?: typeof fs | undefined,
) => generate_(config, rootDir, fileSystem)

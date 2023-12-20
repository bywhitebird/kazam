import { type KazamFS, generate as generate_ } from '../../application/usecases/generate'
import type { KazamConfig } from '../../types/kazam-config'

export const generate = (
  { rootDir, ...config }: KazamConfig & { rootDir: string },
  fileSystem: KazamFS,
) => generate_(config, rootDir, fileSystem)

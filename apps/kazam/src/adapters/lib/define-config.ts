import { defineConfig as defineConfig_ } from '../../application/usecases/define-config'
import type { UserConfig } from '../../types/kazam-config'

export const defineConfig = (config: UserConfig) => defineConfig_(config)

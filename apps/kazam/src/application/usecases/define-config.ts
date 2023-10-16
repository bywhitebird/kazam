import { kazamConfigSchema } from '../../core/schemas/kazam-config'
import type { UserConfig } from '../../types/kazam-config'

export const defineConfig = (config: UserConfig) => kazamConfigSchema.parse(config)

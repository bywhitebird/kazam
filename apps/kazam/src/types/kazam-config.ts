import type { z } from 'zod'

import type { kazamConfigSchema } from '../core/schemas/kazam-config'

export type KazamConfig = z.infer<typeof kazamConfigSchema>
export type UserConfig = z.input<typeof kazamConfigSchema>

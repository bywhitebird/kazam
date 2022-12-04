import { z } from 'zod'

import { Computed } from './computed'
import { State } from './state'
import { Watcher } from './watcher'

export const Statement = z.union([Computed, State, Watcher])

export type IStatement = z.infer<typeof Statement>

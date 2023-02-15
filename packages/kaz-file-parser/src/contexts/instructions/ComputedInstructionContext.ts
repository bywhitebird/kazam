import { createContext } from '../../lib/voltair'
import { TextToken } from '../../tokens'
import { InstructionContext } from './InstructionContext'

export const ComputedInstructionContext = createContext({
  $name: 'ComputedInstructionContext',
  breakingPatterns: [...(InstructionContext.breakingPatterns ?? []), /^,$/, /^:$/, /^=$/],
  forbiddenTokens: [TextToken],
})

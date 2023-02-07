import { createContext } from '../../classes/Context'
import { TextToken } from '../../tokens'
import { InstructionContext } from './InstructionContext'

export const ComputedInstructionContext = createContext({
  $name: 'ComputedInstructionContext',
  breakingPatterns: [...(InstructionContext.breakingPatterns ?? []), /^,$/, /^:$/, /^=$/],
  forbiddenTokens: [TextToken],
})

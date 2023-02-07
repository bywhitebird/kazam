import { createContext } from '../../classes/Context'
import { TextToken } from '../../tokens'
import { InstructionContext } from './InstructionContext'

export const StateInstructionContext = createContext({
  $name: 'StateInstructionContext',
  breakingPatterns: [...(InstructionContext.breakingPatterns ?? []), /^,$/, /^:$/, /^=$/],
  forbiddenTokens: [TextToken],
})

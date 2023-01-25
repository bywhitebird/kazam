import { createContext } from '../../../classes/Context'
import { TextToken } from '../../../tokens'
import { InstructionContext } from '../InstructionContext'

export const ImportInstructionContext = createContext({
  $name: 'ImportInstructionContext',
  breakingPatterns: [...(InstructionContext.breakingPatterns ?? []), /^,$/],
  forbiddenTokens: [TextToken],
})

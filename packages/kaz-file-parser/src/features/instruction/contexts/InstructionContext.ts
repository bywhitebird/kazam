import { Context } from '../../../lib/voltair'
import { TagNameOrTextToken } from '../../tag'

export const InstructionContext = new Context({
  $name: 'InstructionContext',
  breakingPatterns: [/\s+/],
  forbiddenTokens: [() => TagNameOrTextToken],
})

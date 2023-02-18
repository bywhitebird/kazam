import { Context } from '../../../lib/voltair'

export const InstructionContext = new Context({
  $name: 'InstructionContext',
  breakingPatterns: [/\s+/],
})

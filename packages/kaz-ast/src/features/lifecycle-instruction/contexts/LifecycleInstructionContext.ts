import { Context } from '../../../lib/voltair'

export const LifecycleInstructionContext = new Context({
  $name: 'LifecycleInstructionContext',
  breakingPatterns: [/\s+/, /^\($/, /^\)$/, /^=>$/, /^,$/],
  availableTokens: [],
})

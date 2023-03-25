import { Context } from '../../../lib/voltair'
import { TextToken } from '../../../shared'

export const ConditionLogicalContext = new Context({
  $name: 'ConditionLogicalContext',
  breakingPatterns: [/\s+/, /^\($/, /^\)$/, /^\{$/, /^\}$/],
  forbiddenTokens: [() => TextToken],
})

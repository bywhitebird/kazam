import { Context } from '../../../lib/voltair'
import { TextToken } from '../../../shared'
import { TagNameOrTextToken } from '../../tag'
import { TemplateExpressionStartToken } from '../../template'

export const ComputedInstructionContext = new Context({
  $name: 'ComputedInstructionContext',
  breakingPatterns: [/\s+/, /^,$/, /^:$/, /^=$/],
  forbiddenTokens: [() => TextToken, () => TagNameOrTextToken, () => TemplateExpressionStartToken],
})

import { Context } from '../../../lib/voltair'
import { TextToken } from '../../../shared'
import { TagNameOrTextToken } from '../../tag'
import { TemplateExpressionStartToken } from '../../template'

export const StateInstructionContext = new Context({
  $name: 'StateInstructionContext',
  breakingPatterns: [/\s+/, /^,$/, /^:$/, /^=$/],
  forbiddenTokens: [() => TextToken, () => TagNameOrTextToken, () => TemplateExpressionStartToken],
})

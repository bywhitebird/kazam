import { Context } from '../../../lib/voltair'
import { TextToken } from '../../../shared'
import { TagNameOrTextToken } from '../../tag'
import { TemplateExpressionStartToken } from '../../template'

export const PropInstructionContext = new Context({
  $name: 'PropInstructionContext',
  breakingPatterns: [/\s+/, /^,$/, /^:$/, /^=$/],
  forbiddenTokens: [() => TextToken, () => TagNameOrTextToken, () => TemplateExpressionStartToken],
})

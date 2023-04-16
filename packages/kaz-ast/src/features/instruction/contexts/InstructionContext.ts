import { Context } from '../../../lib/voltair'
import { TagNameOrTextToken } from '../../tag'
import { TemplateExpressionStartToken } from '../../template'

export const InstructionContext = new Context({
  $name: 'InstructionContext',
  breakingPatterns: [/\s+/],
  forbiddenTokens: [() => TagNameOrTextToken, () => TemplateExpressionStartToken],
})

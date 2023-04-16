import { Context } from '../../../lib/voltair'
import { TextToken } from '../../../shared'
import { TagNameOrTextToken } from '../../tag'
import { TemplateExpressionStartToken } from '../../template'

export const ImportInstructionContext = new Context({
  $name: 'ImportInstructionContext',
  breakingPatterns: [/\s+/, /^,$/],
  forbiddenTokens: [() => TextToken, () => TagNameOrTextToken, () => TemplateExpressionStartToken],
})

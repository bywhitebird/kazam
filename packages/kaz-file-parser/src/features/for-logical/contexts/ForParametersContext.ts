import { Context } from '../../../lib/voltair'
import { ForParametersToken } from '../tokens/ForParametersToken'
import { ForRightParenthesisToken } from '../tokens/ForRightParenthesisToken'

export const ForParametersContext: Context<'ForParametersContext'> = new Context({
  $name: 'ForParametersContext',
  breakingPatterns: [/^\(/, /\)$/],
  availableTokens: [() => ForParametersToken, () => ForRightParenthesisToken],
})

import { Context } from '../../../lib/voltair'
import { ArrowFunctionBodyToken, ArrowToken, LeftParenthesisToken, RightParenthesisToken, WhitespaceToken } from '../../../shared'
import { EndInstructionToken } from '../../instruction'

export const LifecycleInstructionContext: Context<'LifecycleInstructionContext'> = new Context({
  $name: 'LifecycleInstructionContext',
  breakingPatterns: [/\s+/, /^\($/, /^\)$/, /^=>$/, /^,$/],
  availableTokens: [
    () => LeftParenthesisToken,
    () => RightParenthesisToken,
    () => ArrowToken,
    () => ArrowFunctionBodyToken,
    () => EndInstructionToken,
    () => WhitespaceToken,
  ],
})

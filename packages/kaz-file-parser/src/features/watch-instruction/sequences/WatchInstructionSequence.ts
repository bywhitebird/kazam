import { ArrowFunctionBodyToken, WatchInstructionToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { ArrowToken, IdentifierToken, LeftParenthesisToken, RightParenthesisToken } from '../../../shared'

export const WatchInstructionSequence = gp(
  'WatchInstruction',
  s(
    WatchInstructionToken,
    LeftParenthesisToken,
    g('watchedVariable', IdentifierToken),
    RightParenthesisToken,
    ArrowToken,
    g('callbackExpression', ArrowFunctionBodyToken),
  ),
)

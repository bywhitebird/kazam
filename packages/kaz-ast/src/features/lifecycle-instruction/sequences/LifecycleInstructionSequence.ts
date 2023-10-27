import { LifecycleInstructionContext, LifecycleInstructionToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { ArrowFunctionBodyToken, ArrowToken, LeftParenthesisToken, RightParenthesisToken } from '../../../shared'

export const LifecycleInstructionSequence = gp(
  'LifecycleEventInstruction',
  s(
    g('event', () => LifecycleInstructionToken),
    LeftParenthesisToken,
    RightParenthesisToken,
    ArrowToken,
    () => g('callbackExpression', ArrowFunctionBodyToken.extends({
      endContexts: [LifecycleInstructionContext],
    })),
  ),
)

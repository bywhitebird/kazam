import { EventInstructionToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { ArrowFunctionBodyToken, ArrowToken, FunctionParametersSequence, LeftParenthesisToken, RightParenthesisToken } from '../../../shared'

export const EventInstructionSequence = gp(
  'EventInstruction',
  s(
    g('eventName', EventInstructionToken),
    LeftParenthesisToken,
    g(
      'parameters',
      FunctionParametersSequence,
      { forceMultiple: true },
    ),
    RightParenthesisToken,
    ArrowToken,
    g('callbackExpression', ArrowFunctionBodyToken),
  ),
)

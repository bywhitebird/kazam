import { WatchInstructionToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { ArrowFunctionBodyToken, ArrowToken, FunctionParametersSequence, LeftParenthesisToken, RightParenthesisToken } from '../../../shared'

export const WatchInstructionSequence = gp(
  'WatchInstruction',
  s(
    WatchInstructionToken,
    LeftParenthesisToken,
    g(
      'watchedVariables',
      FunctionParametersSequence,
      { forceMultiple: true },
    ),
    RightParenthesisToken,
    ArrowToken,
    g('callbackExpression', ArrowFunctionBodyToken),
    {
      tmScope: 'meta.watch',
      tmName: 'WatchInstruction',
    },
  ),
)

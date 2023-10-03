import { LifecycleInstructionToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { VariableDeclarationSequence } from '../../../shared'

export const LifecycleInstructionSequence = gp(
  'LifecycleEventInstruction',
  s(
    g('event', () => LifecycleInstructionToken),
    g('callbackExpression', () => VariableDeclarationSequence),
  ),
)

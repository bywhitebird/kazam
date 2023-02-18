import { StateInstructionToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { IdentifierToken, TypeAnnotationSequence, VariableDeclarationSequence } from '../../../shared'

export const StateInstructionSequence = gp(
  'StateInstruction',
  s(
    StateInstructionToken,
    g('name', IdentifierToken),
    g('type', s(TypeAnnotationSequence, { optional: true })),
    g(
      'defaultValue',
      s(
        g('expression', VariableDeclarationSequence),
        { optional: true },
      ),
    ),
  ),
)

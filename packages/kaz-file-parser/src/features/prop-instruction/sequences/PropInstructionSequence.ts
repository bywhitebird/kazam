import { PropInstructionToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { IdentifierToken, TypeAnnotationSequence, VariableDeclarationSequence } from '../../../shared'

export const PropInstructionSequence = gp(
  'PropInstruction',
  s(
    PropInstructionToken,
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

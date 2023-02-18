import { ComputedInstructionToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { IdentifierToken, TypeAnnotationSequence, VariableDeclarationSequence } from '../../../shared'

export const ComputedInstructionSequence = gp(
  'ComputedInstruction',
  s(
    () => ComputedInstructionToken,
    g('name', IdentifierToken),
    g('type', s(TypeAnnotationSequence, { optional: true })),
    g(
      'computeValue',
      s(
        g('expression', VariableDeclarationSequence),
        { optional: true },
      ),
    ),
  ),
)

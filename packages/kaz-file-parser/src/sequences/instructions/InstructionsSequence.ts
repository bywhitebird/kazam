import { ImportInstructionSequence, PropInstructionSequence } from '..'
import { s } from '../../classes/Sequence'

export const InstructionsSequence = s(
  s.union([
    ImportInstructionSequence,
    PropInstructionSequence,
  ]),
  { min: 0 },
)

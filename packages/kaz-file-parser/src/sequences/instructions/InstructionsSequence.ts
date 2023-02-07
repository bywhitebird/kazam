import { ImportInstructionSequence, PropInstructionSequence, StateInstructionSequence } from '..'
import { s } from '../../classes/Sequence'

export const InstructionsSequence = s(
  s.union([
    ImportInstructionSequence,
    PropInstructionSequence,
    StateInstructionSequence,
  ]),
  { min: 0 },
)

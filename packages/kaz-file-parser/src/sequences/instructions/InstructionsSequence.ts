import { ImportInstructionSequence, PropInstructionSequence, StateInstructionSequence } from '..'
import { s } from '../../classes/Sequence'
import { ComputedInstructionSequence } from './computed/ComputedInstructionSequence'

export const InstructionsSequence = s(
  s.union([
    ImportInstructionSequence,
    PropInstructionSequence,
    StateInstructionSequence,
    ComputedInstructionSequence,
  ]),
  { min: 0 },
)

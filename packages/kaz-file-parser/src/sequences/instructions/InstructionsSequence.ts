import { s } from '../../classes/Sequence'
import { ImportInstructionSequence } from './imports/ImportInstructionSequence'

export const InstructionsSequence = s(
  s.union([ImportInstructionSequence]),
  { min: 0 },
)

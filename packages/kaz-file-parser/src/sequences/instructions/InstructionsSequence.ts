import { s } from '../../classes/Sequence'
import { ImportInstructionSequence } from './imports/ImportInstructionSequence'
import { PropInstructionSequence } from './prop/PropInstructionSequence'

export const InstructionsSequence = s(
  s.union([
    ImportInstructionSequence,
    PropInstructionSequence,
  ]),
  { min: 0 },
)

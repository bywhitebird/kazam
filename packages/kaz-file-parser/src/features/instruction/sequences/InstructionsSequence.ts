import { EndInstructionToken, StartInstructionToken } from '..'
import { s } from '../../../lib/voltair'
import { ComputedInstructionSequence } from '../../computed-instruction'
import { ImportInstructionSequence } from '../../import-instruction'
import { PropInstructionSequence } from '../../prop-instruction'
import { StateInstructionSequence } from '../../state-instruction'

export const InstructionsSequence = s(
  () => StartInstructionToken,
  s.union([
    ImportInstructionSequence,
    PropInstructionSequence,
    StateInstructionSequence,
    ComputedInstructionSequence,
  ]),
  () => EndInstructionToken,
  { min: 0 },
)

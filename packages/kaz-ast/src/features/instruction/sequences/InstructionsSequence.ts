import { EndInstructionToken, StartInstructionToken } from '..'
import { s } from '../../../lib/voltair'
import { ComputedInstructionSequence } from '../../computed-instruction'
import { ImportInstructionSequence } from '../../import-instruction'
import { LifecycleInstructionSequence } from '../../lifecycle-instruction'
import { PropInstructionSequence } from '../../prop-instruction'
import { StateInstructionSequence } from '../../state-instruction'
import { WatchInstructionSequence } from '../../watch-instruction'

export const InstructionsSequence = s(
  () => StartInstructionToken,
  s.union([
    ImportInstructionSequence,
    PropInstructionSequence,
    StateInstructionSequence,
    ComputedInstructionSequence,
    WatchInstructionSequence,
    LifecycleInstructionSequence,
  ]),
  () => EndInstructionToken,
  { min: 0 },
)

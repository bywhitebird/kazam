import { s } from '../../classes/Sequence'
import { DoubleQuotedStringSequence } from './DoubleQuotedStringSequence'
import { SingleQuotedStringSequence } from './SingleQuotedStringSequence'

export const StringSequence = s.union([DoubleQuotedStringSequence, SingleQuotedStringSequence])

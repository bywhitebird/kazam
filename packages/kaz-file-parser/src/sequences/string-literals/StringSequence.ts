import { DoubleQuotedStringSequence, SingleQuotedStringSequence } from '..'
import { s } from '../../classes/Sequence'

export const StringSequence = s.union([DoubleQuotedStringSequence, SingleQuotedStringSequence])

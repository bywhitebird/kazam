import { createSequence as s } from '../utils/create-sequence'
import { DoubleQuotedStringSequence } from './DoubleQuotedStringSequence'
import { SingleQuotedStringSequence } from './SingleQuotedStringSequence'

export const StringSequence = s.union([DoubleQuotedStringSequence, SingleQuotedStringSequence])

import { DoubleQuotedStringSequence, SingleQuotedStringSequence } from '..'
import { s } from '../../../lib/voltair'

export const StringSequence = s.union([DoubleQuotedStringSequence, SingleQuotedStringSequence])

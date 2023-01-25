import { type Sequence, s } from '../../../classes/Sequence'
import * as Tokens from '../../../tokens'
import { generatePermutations } from '../../../utils/generate-permutations'
import { StringSequence } from '../../string-literals/StringSequence'
import { DefaultImportSpecifierSequence } from './specifiers/DefaultImportSpecifierSequence'
import { NamedImportSpecifierSequence } from './specifiers/NamedImportSpecifierSequence'
import { NamespaceImportSpecifierSequence } from './specifiers/NamespaceImportSpecifierSequence'

const generateImportSpecifierSequence = (sequence: [Sequence, ...Sequence[]]): Sequence => {
  const [first, ...rest] = sequence

  if (rest.length <= 1)
    return s(first)

  return s(
    first,
    s(
      Tokens.CommaToken,
      s.union(
        rest.map((_, i) => generateImportSpecifierSequence(rest.filter((_, j) => j !== i) as [Sequence, ...Sequence[]])) as [Sequence, ...Sequence[]],
      ),
      { optional: true },
    ),
  )
}

const ImportSpecifierSequence = generatePermutations([DefaultImportSpecifierSequence, NamedImportSpecifierSequence, NamespaceImportSpecifierSequence])
  .map(permutation => generateImportSpecifierSequence(permutation as [Sequence, ...Sequence[]]))

export const ImportInstructionSequence = s(
  Tokens.StartInstructionToken,
  Tokens.ImportInstructionToken,
  s.union(
    [
      StringSequence,
      s(
        s.union(ImportSpecifierSequence as [Sequence, ...Sequence[]]),
        Tokens.FromKeywordImportToken,
        StringSequence,
      ),
    ],
  ),
  Tokens.EndInstructionToken,
)

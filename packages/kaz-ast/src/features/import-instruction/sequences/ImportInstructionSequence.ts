import { DefaultImportSpecifierSequence, FromKeywordToken, ImportInstructionToken, NamedImportSpecifierSequence, NamespaceImportSpecifierSequence } from '..'
import { type Sequence, g, gp, s } from '../../../lib/voltair'
import { CommaToken, StringSequence } from '../../../shared'
import { generatePermutations } from '../../../utils/generate-permutations'

const generateImportSpecifierSequence = (sequence: [Sequence['sequence'][number], ...Sequence['sequence']]): Sequence => {
  const [first, ...rest] = sequence

  if (rest.length <= 1)
    return s(first)

  return s(
    first,
    s(
      CommaToken,
      s.union(
        rest.map((_, i) => generateImportSpecifierSequence(rest.filter((_, j) => j !== i) as [Sequence, ...Sequence[]])) as [Sequence, ...Sequence[]],
      ),
      { optional: true },
    ),
  )
}

const ImportSpecifierSequence = generatePermutations([() => DefaultImportSpecifierSequence, () => NamedImportSpecifierSequence, () => NamespaceImportSpecifierSequence])
  .map(permutation => generateImportSpecifierSequence(permutation as [Sequence['sequence'][number], ...Sequence['sequence']]))

export const ImportInstructionSequence = gp(
  'ImportInstruction',
  s(
    ImportInstructionToken,
    s.union(
      [
        g('from', StringSequence),
        s(
          g(
            'imports',
            s.union(ImportSpecifierSequence as [Sequence, ...Sequence[]]),
            { forceMultiple: true },
          ),
          FromKeywordToken,
          g('from', StringSequence),
        ),
      ],
    ),
    {
      tmScope: 'meta.import',
      tmName: 'ImportInstruction',
    },
  ),
)

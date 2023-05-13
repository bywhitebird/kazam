import { CommaToken, IdentifierToken, TypeAnnotationSequence } from '../..'
import { g, gv, s } from '../../../lib/voltair'

const ParameterSequence = s(
  g('name', IdentifierToken),
  s(
    g('type', TypeAnnotationSequence),
    { optional: true },
  ),
)

export const FunctionParametersSequence = s(
  gv(ParameterSequence),
  s(
    CommaToken,
    gv(ParameterSequence),
    { min: 0 },
  ),
  s(CommaToken, { optional: true }),
  {
    tmScope: 'meta.function.parameters',
    tmName: 'FunctionParameters',
  },
)

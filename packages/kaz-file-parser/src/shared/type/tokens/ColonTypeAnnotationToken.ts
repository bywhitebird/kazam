import { TypeContext } from '..'
import { ColonToken } from '../..'

export const ColonTypeAnnotationToken = ColonToken.extends({
  $name: 'ColonTypeAnnotationToken',
  startContexts: [() => TypeContext],
})

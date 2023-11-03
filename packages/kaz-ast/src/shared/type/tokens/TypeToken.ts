import { parse } from '@babel/parser'

import { TypeContext } from '..'
import { Token } from '../../../lib/voltair'

const getTypeAnnotation = (rawValue: string) => {
  const parsed = parse(`type T = ${rawValue}`, {
    plugins: ['typescript'],
  })
  const type = parsed.program.body[0]

  if (type?.type !== 'TSTypeAliasDeclaration')
    throw new Error(`Invalid type: ${rawValue}`)

  return type.typeAnnotation
}

export const TypeToken = new Token({
  $name: 'TypeToken',
  validator: (rawValue: string) => {
    try {
      getTypeAnnotation(rawValue)
      return true
    }
    catch {
      return false
    }
  },
  getValue: rawValue => rawValue.trim(),
  inContexts: [() => TypeContext],
  endContexts: [() => TypeContext],
})

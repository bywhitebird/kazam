import { parse } from '@typescript-eslint/parser'

import { TypeContext } from '../../contexts/TypeContext'
import { type Token, createToken } from '../../lib/voltair'

const getTypeAnnotation = (rawValue: string) => {
  const parsed = parse(`type T = ${rawValue}`)
  const type = parsed.body[0]

  if (type?.type !== 'TSTypeAliasDeclaration')
    throw new Error(`Invalid type: ${rawValue}`)

  return type.typeAnnotation
}

export const TypeToken = createToken({
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
  inContexts: [TypeContext],
  endContexts: [TypeContext],
})

export const isTypeToken = (token: Token): token is typeof TypeToken => token.$name === TypeToken.$name

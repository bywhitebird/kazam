import { parse } from '@typescript-eslint/parser'

import { TypeContext } from '..'
import { Token } from '../../../lib/voltair'

const getTypeAnnotation = (rawValue: string) => {
  const parsed = parse(`type T = ${rawValue}`, { warnOnUnsupportedTypeScriptVersion: false })
  const type = parsed.body[0]

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
  getValue: rawValue => rawValue,
  inContexts: [() => TypeContext],
  endContexts: [() => TypeContext],
})

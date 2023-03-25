import { parse } from '@typescript-eslint/parser'

import { ForParametersContext } from '..'
import { Token } from '../../../lib/voltair'

const getExpression = (rawValue: string) => {
  const parsed = parse(`for (${rawValue}) {}`)
  const forExpression = parsed.body[0]

  if (
    forExpression?.type !== 'ForStatement'
    && forExpression?.type !== 'ForInStatement'
    && forExpression?.type !== 'ForOfStatement'
  )
    throw new Error(`Invalid expression: ${rawValue}`)

  return rawValue
}

export const ForParametersToken = new Token({
  $name: 'ForParameters',
  validator: (rawValue: string) => {
    try {
      getExpression(rawValue)
      return true
    }
    catch {
      return false
    }
  },
  getValue(rawValue) {
    const trimmedRawValue = rawValue.trim()

    if (trimmedRawValue.startsWith('{') && trimmedRawValue.endsWith('}'))
      return trimmedRawValue.slice(1, -1).trim()

    return trimmedRawValue
  },
  inContexts: [() => ForParametersContext],
  endContexts: [() => ForParametersContext],
})

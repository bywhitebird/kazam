import { parse } from '@typescript-eslint/parser'

import { ExpressionToken } from '../'

const getExpression = (rawValue: string) => {
  const parsed = parse(`() => ${rawValue}`)
  const arrowFunctionExpression = parsed.body[0]

  if (
    arrowFunctionExpression?.type !== 'ExpressionStatement'
    || arrowFunctionExpression.expression.type !== 'ArrowFunctionExpression'
  )
    throw new Error(`Invalid expression: ${rawValue}`)

  return arrowFunctionExpression.expression.body
}

export const ArrowFunctionBodyToken = ExpressionToken.extends({
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
})

import { parse } from '@typescript-eslint/parser'

import { ConditionContext } from '..'
import { Token } from '../../../lib/voltair'

const getExpression = (rawValue: string) => {
  const parsed = parse(`if (${rawValue}) {}`, { warnOnUnsupportedTypeScriptVersion: false })
  const ifExpression = parsed.body[0]

  if (
    ifExpression?.type !== 'IfStatement'
  )
    throw new Error(`Invalid expression: ${rawValue}`)

  return rawValue
}

export const IfConditionToken = new Token({
  $name: 'IfCondition',
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
    if (rawValue.startsWith('{') && rawValue.endsWith('}'))
      return rawValue.slice(1, -1)

    return rawValue
  },
  inContexts: [() => ConditionContext],
  endContexts: [() => ConditionContext],
})

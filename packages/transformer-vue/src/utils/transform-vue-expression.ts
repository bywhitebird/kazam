import { parse } from '@typescript-eslint/typescript-estree'
import { traverse } from 'estraverse'
import type { Node } from 'estree'
import isReference from 'is-reference'

export const transformVueExpression = (expression: string) => {
  const receivedExpression = expression
  const expressionAst = parse(expression, { range: true })
  let indexShift = 0

  const replace = (start: number, end: number, replacement: string | ((substring: string) => string)) => {
    const fixedExpression = `${expression.slice(0, start + indexShift)
    }${
      typeof replacement === 'string'
        ? replacement
        : replacement(expression.slice(start + indexShift, end + indexShift))
    }${expression.slice(end + indexShift)}`
    const lengthDifference = fixedExpression.length - expression.length
    expression = fixedExpression
    indexShift += lengthDifference
  }

  traverse(expressionAst as Node, {
    enter(node, parent) {
      if (node.range === undefined)
        return

      const [start, end] = node.range

      if (parent === null)
        return

      if (isReference(node, parent)) {
        if (parent.type === 'AssignmentExpression' && node === parent.left) {
          replace(start, end, substring => `${substring}.value`)
          return
        }

        replace(start, end, substring => `ref(${substring}).value`)
      }
    },
  })

  return expression
}

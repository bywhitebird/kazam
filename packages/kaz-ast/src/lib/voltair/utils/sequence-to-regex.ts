import { dig } from './dig'
import { resolveValue } from './resolve-value'
import { Sequence } from '../Sequence'
import { Token } from '../Token'

export const sequenceToRegex = (sequence: Sequence, alreadyVisited: Set<Sequence | (() => Sequence)> = new Set()): string => {
  const newAlreadyVisited = new Set(alreadyVisited)

  // TODO: Handle `union` modifier
  return `${sequence.sequence.reduce<string>((regex, child) => {
    const resolvedChild = resolveValue(child)
    const diggedChild = (!(resolvedChild instanceof Sequence) && !(resolvedChild instanceof Token))
      ? dig(resolvedChild)
      : resolvedChild

    if (diggedChild instanceof Sequence) {
      if (alreadyVisited.has(diggedChild))
        return `${regex}\\g<${diggedChild.tmName}>`

      newAlreadyVisited.add(diggedChild)

      if (diggedChild.tmName === undefined)
        return `${regex}${sequenceToRegex(diggedChild, newAlreadyVisited)}`

      return `(?<${diggedChild.tmName}>${sequenceToRegex(diggedChild, newAlreadyVisited)})${regex}\\g<${diggedChild.tmName}>`
    }
    // if (diggedChild instanceof Sequence)
    //   return `${regex}${sequenceToRegex(diggedChild)}`

    if (diggedChild instanceof Token) {
      const tokenRegex = diggedChild.tmMatch

      // TODO: Add whitespace handling
      if (tokenRegex !== undefined)
        return `${regex}${tokenRegex}`

      return regex
    }

    return regex
  }, '')}`
}

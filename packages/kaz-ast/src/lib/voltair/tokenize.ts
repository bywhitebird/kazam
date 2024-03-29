import type { Context } from './Context'
import type { Token } from './Token'
import { resolveValue } from './utils/resolve-value'

export const tokenize = (input: string, tokens: Token[], defaultBreakingPatterns: RegExp[]): Token[] => {
  const tokensFound = <Token[]>[]

  const current = {
    word: '',
    openedContexts: <Context[][]>[],
    get token() {
      const tokenMatched = tokens
        .find(token => token.test(this.word, this.openedContexts.at(-1)))

      const tokenCreated = tokenMatched?.create({
        $rawValue: this.word,
        $index: this.index - (tokenMatched.singleCharacter ? 0 : this.word.length),
      })

      return tokenCreated
    },
    index: -1,
  }

  let contextsEnded: Context[] = []

  const addCurrentToken = () => {
    const token = current.token

    if (!token)
      return

    if (!token.ignore)
      tokensFound.push(token)

    current.word = ''

    if (token.endContexts) {
      let endContexts = token.endContexts.map(context => resolveValue(context).$name)
      let lastContext = current.openedContexts.at(-1)

      while (lastContext && lastContext.some(context => endContexts.includes(context.$name)) && endContexts.length > 0) {
        const indexToRemove = lastContext.findIndex(context => endContexts.includes(context.$name))
        const contextToRemove = lastContext[indexToRemove]
        endContexts = endContexts.filter(contextName => contextName !== contextToRemove?.$name)
        lastContext.splice(indexToRemove, 1)

        if (contextToRemove)
          contextsEnded.push(contextToRemove)

        if (lastContext.length === 0)
          current.openedContexts.pop()

        lastContext = current.openedContexts.at(-1)
      }
    }

    if (token.startContexts) {
      const contextsToAdd = token.startContexts.flatMap((context) => {
        const resolvedContext = resolveValue(context)
        return contextsEnded.find(c => c.$name === resolvedContext.$name) ? [] : [resolvedContext]
      })
      if (contextsToAdd.length > 0)
        current.openedContexts.push(contextsToAdd.map(context => resolveValue(context)))
    }
  }

  const getBreakingPatterns = () => {
    const lastContext = current.openedContexts.at(-1)
    const breakingPatterns = lastContext?.reduce((patterns, context) => {
      if (context.breakingPatterns)
        patterns.push(...context.breakingPatterns)

      return patterns
    }, <RegExp[]>[])

    return breakingPatterns || defaultBreakingPatterns
  }

  const checkIsBreak = (char: string) => {
    if (current.token?.singleCharacter)
      return true

    const breakingPatterns = getBreakingPatterns()
    return breakingPatterns.some(pattern => pattern.test(char))
  }

  const dataHandler = (char = '') => {
    contextsEnded = []
    current.index++

    if (checkIsBreak(char)) {
      addCurrentToken()

      current.word += char
      addCurrentToken()

      return
    }

    current.word += char

    if (checkIsBreak(char))
      addCurrentToken()
  }

  const inputCharacters = input.split('')
  while (inputCharacters.length > 0)
    dataHandler(inputCharacters.shift())

  addCurrentToken()
  return tokensFound
}

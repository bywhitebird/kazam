import type { Context } from './Context'
import type { Token } from './Token'
import { InputStream } from './utils/input-stream'

export const tokenize = (input: string, orderedTokens: Token[]): Promise<Token[]> => {
  const inputStream = new InputStream(input)
  const tokensFound = <Token[]>[]

  const current = {
    word: '',
    openedContexts: <Context[][]>[],
    get token() {
      const tokenMatched = orderedTokens
        .find(token => token.test(this.word, this.openedContexts.at(-1)))
        ?.create({ $rawValue: this.word, $index: this.index - this.word.length })

      return tokenMatched
    },
    index: 0,
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
      let endContexts = token.endContexts.map(context => context.$name)
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
      const tokensToAdd = token.startContexts.filter(context => !contextsEnded.find(c => c.$name === context.$name))
      if (tokensToAdd.length > 0)
        current.openedContexts.push(tokensToAdd)
    }
  }

  const getBreakingPatterns = () => {
    const lastContext = current.openedContexts.at(-1)
    const breakingPatterns = lastContext?.reduce((patterns, context) => {
      if (context.breakingPatterns)
        patterns.push(...context.breakingPatterns)

      return patterns
    }, <RegExp[]>[])

    return breakingPatterns || [/\s+/]
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

  inputStream.on('data', dataHandler)

  return new Promise((resolve) => {
    inputStream.on('end', () => {
      inputStream.off('data', dataHandler)
      addCurrentToken()
      resolve(tokensFound)
    })
  })
}

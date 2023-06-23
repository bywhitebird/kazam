import type { Diagnostic, Service, TextDocument } from '@volar/language-server/node'

import { KazFile } from './language'

export const createKazService: () => Service = () => (context) => ({
  provideDiagnostics(document) {
    if (context === undefined)
      return

    const [file] = context.documents.getVirtualFileByUri(document.uri)
    if (!(file instanceof KazFile))
      return

    const ast = file.ast
    const errors: Diagnostic[] = []

    if (ast instanceof Error) {
      // TODO: handle error https://github.com/volarjs/starter/blob/b82132d238e6366846df5577152af5509d295852/packages/language-server/src/index.ts#L31
    }

    return errors
  },
  provideDocumentSemanticTokens(document, _, legend) {
    if (context === undefined)
      return

    const [file] = context.documents.getVirtualFileByUri(document.uri)
    if (!(file instanceof KazFile))
      return

    const tokens = file.tokens

    if (tokens === undefined)
      return

    const tokensResult: [number, number, number, number, number][] = []

    tokens.forEach((token) => {
      const startPosition = document.positionAt(token.$range[0])
      const endPosition = document.positionAt(token.$range[1])

      const serverTokenType = token.semantic?.type !== undefined ? legend.tokenTypes.indexOf(token.semantic.type) : undefined

      if (serverTokenType === undefined)
        return

      let serverTokenModifiersBitFlags = '0'.repeat(legend.tokenModifiers.length + 1)
      token.semantic?.modifiers?.forEach((modifier) => {
        const tokenModifierIndex = legend.tokenModifiers.indexOf(modifier)
        if (tokenModifierIndex !== -1)
          serverTokenModifiersBitFlags = `${serverTokenModifiersBitFlags.slice(0, -tokenModifierIndex - 1)}1${serverTokenModifiersBitFlags.slice(-tokenModifierIndex)}`
      })
      const serverTokenModifiers = parseInt(serverTokenModifiersBitFlags, 2)

      // https://github.com/volarjs/services/blob/f5d49495d6698761f4df8c9ef2747cc01fc777d6/packages/typescript/src/services/semanticTokens.ts#LL66C1-L70C2
      for (let line = startPosition.line; line <= endPosition.line; line++) {
        const startCharacter = line === startPosition.line ? startPosition.character : 0
        const endCharacter = line === endPosition.line ? endPosition.character : docLineLength(document, line)

        tokensResult.push([line, startCharacter, endCharacter - startCharacter, serverTokenType, serverTokenModifiers])
      }
    })

    return tokensResult
  },
})

// https://github.com/volarjs/services/blob/f5d49495d6698761f4df8c9ef2747cc01fc777d6/packages/typescript/src/services/semanticTokens.ts#LL93C1-L97C2
function docLineLength(document: TextDocument, line: number) {
  const currentLineOffset = document.offsetAt({ line, character: 0 })
  const nextLineOffset = document.offsetAt({ line: line + 1, character: 0 })
  return nextLineOffset - currentLineOffset
}

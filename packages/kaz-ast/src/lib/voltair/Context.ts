import type { Token } from './Token'

export class Context<Name extends string = string> {
  public $name: Name
  public breakingPatterns: RegExp[] | undefined
  public forbiddenTokens: (Token | (() => Token))[] | undefined
  public availableTokens: (Token | (() => Token))[] | undefined

  constructor(
    { $name, breakingPatterns, forbiddenTokens, availableTokens }: {
      $name: Name
      breakingPatterns?: RegExp[] | undefined
      forbiddenTokens?: (Token | (() => Token))[]
      availableTokens?: (Token | (() => Token))[]
    },
  ) {
    this.$name = $name
    this.breakingPatterns = breakingPatterns
    this.forbiddenTokens = forbiddenTokens
    this.availableTokens = availableTokens
  }
}

import type { Token } from './Token'

export class Context<Name extends string = string> {
  constructor(
    public $name: Name,
    public breakingPatterns?: RegExp[] | undefined,
    public forbiddenTokens?: (Token | (() => Token))[],
    public availableTokens?: (Token | (() => Token))[],
  ) {}
}

export const createContext = <Name extends string = string>(args: {
  $name: Name
  breakingPatterns?: RegExp[] | undefined
  forbiddenTokens?: (Token | (() => Token))[]
  availableTokens?: (Token | (() => Token))[]
}): Context<Name> => new Context(args.$name, args.breakingPatterns, args.forbiddenTokens, args.availableTokens)

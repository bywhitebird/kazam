import type { Token } from './Token'

export class Context<Name extends string = string> {
  constructor(
    public $name: Name,
    public breakingPatterns?: RegExp[] | undefined,
    public forbiddenTokens?: Token[],
  ) {}
}

export const createContext = <Name extends string = string>(args: {
  $name: Name
  breakingPatterns?: RegExp[] | undefined
  forbiddenTokens?: Token[]
}): Context<Name> => new Context(args.$name, args.breakingPatterns, args.forbiddenTokens)

import type { Context } from './Context'

export class Token<Name extends string = string> {
  protected _$rawValue = ''
  protected _$index = 0

  constructor(
    public $name: Name,
    public pattern: RegExp,
    public singleCharacter?: boolean,
    public ignore?: boolean,
    public startContexts?: Context[],
    public endContexts?: Context[],
    public inContexts?: Context[],
  ) {}

  create({ $rawValue, $index }: { $rawValue: string; $index: number }): Token<Name> {
    const token = new Token(this.$name, this.pattern, this.getValue, this.singleCharacter, this.ignore, this.startContexts, this.endContexts, this.inContexts)
    token._$rawValue = $rawValue
    token._$index = $index
    return token
  }

  get $rawValue() {
    return this._$rawValue
  }

  get $index() {
    return this._$index
  }
}

export const createToken = <Name extends string = string>(args: {
  $name: Name
  pattern: RegExp
  singleCharacter?: boolean
  ignore?: boolean
  startContexts?: Context[]
  endContexts?: Context[]
  inContexts?: Context[]
}): Token<Name> => new Token(args.$name, args.pattern, args.getValue, args.singleCharacter, args.ignore, args.startContexts, args.endContexts, args.inContexts)

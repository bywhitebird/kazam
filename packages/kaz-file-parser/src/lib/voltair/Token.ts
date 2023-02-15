import type { Context } from './Context'
import type { JsonPrimitive } from './types/JsonValue'

export class Token<Name extends string = string, Value extends JsonPrimitive = JsonPrimitive> {
  protected _$rawValue = ''
  protected _$index = 0
  private getValue?: ((rawValue: string) => Value) | undefined

  constructor(
    public $name: Name,
    public validator: RegExp | ((rawValue: string) => boolean),
    getValue?: (rawValue: string) => Value,
    public singleCharacter?: boolean,
    public ignore?: boolean,
    public startContexts?: Context[],
    public endContexts?: Context[],
    public inContexts?: Context[],
  ) {
    this.getValue = getValue
  }

  create({ $rawValue, $index }: { $rawValue: string; $index: number }): Token<Name, Value> {
    const token = new Token(this.$name, this.validator, this.getValue, this.singleCharacter, this.ignore, this.startContexts, this.endContexts, this.inContexts)
    token._$rawValue = $rawValue
    token._$index = $index
    return token
  }

  test(rawValue: string, context: Context[] = []): boolean {
    if (!(typeof this.validator === 'function' ? this.validator(rawValue) : this.validator.test(rawValue)))
      return false

    if (context?.some(context => context.forbiddenTokens?.find(forbiddenToken => (typeof forbiddenToken === 'function' ? forbiddenToken().$name : forbiddenToken.$name) === this.$name)))
      return false

    if (context?.flatMap(context => context.availableTokens).some(availableToken => availableToken !== undefined && (typeof availableToken === 'function' ? availableToken().$name : availableToken.$name) !== this.$name))
      return false

    if (!this.inContexts || this.inContexts.length === 0)
      return true

    return this.inContexts.some(inContext => context.some(openedContext => openedContext.$name === inContext.$name))
  }

  get $rawValue() {
    return this._$rawValue
  }

  get $index() {
    return this._$index
  }

  get $value() {
    return this.getValue ? this.getValue(this.$rawValue) : undefined
  }
}

export const createToken = <Name extends string = string, Value extends JsonPrimitive = never>(args: {
  $name: Name
  validator: RegExp | ((rawValue: string) => boolean)
  getValue?: (rawValue: string) => Value
  singleCharacter?: boolean
  ignore?: boolean
  startContexts?: Context[]
  endContexts?: Context[]
  inContexts?: Context[]
}): Token<Name, Value> => new Token(args.$name, args.validator, args.getValue, args.singleCharacter, args.ignore, args.startContexts, args.endContexts, args.inContexts)

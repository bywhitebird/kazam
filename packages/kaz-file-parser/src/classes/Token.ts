import type { JsonPrimitive } from '../types/JsonValue'
import type { Context } from './Context'

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

  test(rawValue: string): boolean {
    return typeof this.validator === 'function' ? this.validator(rawValue) : this.validator.test(rawValue)
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

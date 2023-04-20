import type { Context } from './Context'
import type { JsonPrimitive } from './types/JsonValue'
import { resolveValue } from './utils/resolve-value'

export class Token<Name extends string = string, Value extends JsonPrimitive = JsonPrimitive> {
  public $name: Name
  public validator: RegExp | ((rawValue: string) => boolean)
  public singleCharacter: boolean | undefined
  public ignore: boolean | undefined
  public startContexts: (Context | (() => Context))[] | undefined
  public endContexts: (Context | (() => Context))[] | undefined
  public inContexts: (Context | (() => Context))[] | undefined

  protected _$rawValue = ''
  protected _$index = 0

  private getValue: ((rawValue: string) => Value) | undefined

  constructor(
    { $name, validator, getValue, singleCharacter, ignore, startContexts, endContexts, inContexts }: {
      $name: Token<Name, Value>['$name']
      validator: Token<Name, Value>['validator']
      getValue?: Token<Name, Value>['getValue']
      singleCharacter?: Token<Name, Value>['singleCharacter']
      ignore?: Token<Name, Value>['ignore']
      startContexts?: Token<Name, Value>['startContexts']
      endContexts?: Token<Name, Value>['endContexts']
      inContexts?: Token<Name, Value>['inContexts']
    },
  ) {
    this.$name = $name
    this.validator = validator
    this.getValue = getValue
    this.singleCharacter = singleCharacter
    this.ignore = ignore
    this.startContexts = startContexts
    this.endContexts = endContexts
    this.inContexts = inContexts
  }

  create({ $rawValue, $index }: { $rawValue: string; $index: number }): Token<Name, Value> {
    const token = this.clone()
    token._$rawValue = $rawValue
    token._$index = $index
    return token
  }

  extends<NewName extends string = Name, NewValue extends JsonPrimitive = Value>(
    newToken: Partial<ConstructorParameters<typeof Token<NewName, NewValue>>[0]>,
  ): Token<NewName, NewValue> {
    return new Token<NewName, NewValue>({
      ...this,
      ...newToken,
      getValue: newToken.getValue ?? this.getValue,
    })
  }

  test(rawValue: string, context: Context[] = []): boolean {
    if (!(typeof this.validator === 'function' ? this.validator(rawValue) : this.validator.test(rawValue)))
      return false

    if (context?.some(context => context.forbiddenTokens?.find(forbiddenToken => resolveValue(forbiddenToken).$name === this.$name)))
      return false

    const availableTokens = context?.flatMap(context => context.availableTokens)
    if (availableTokens.length > 0 && availableTokens.every(availableToken => availableToken !== undefined && resolveValue(availableToken).$name !== this.$name))
      return false

    if (!this.inContexts || this.inContexts.length === 0)
      return true

    return this.inContexts.some(inContext => context.some(openedContext => openedContext.$name === resolveValue(inContext).$name))
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

  public clone() {
    return new Token<Name, Value>({ ...this, getValue: this.getValue })
  }
}

import type { Context } from './Context'
import type { JsonPrimitive } from './types/JsonValue'
import type { TextMateScope } from './types/textmate/TextMateScope'
import { resolveValue } from './utils/resolve-value'

/*
TODO: Add tmMatch property
      It should be a string
      By default, it should be the same as the validator property (if it's a RegExp)
      It should be possible to override it
*/

export class Token<Name extends string = string, Value extends JsonPrimitive = JsonPrimitive> {
  public tmName: Name
  public validator: RegExp | ((rawValue: string) => boolean)
  public singleCharacter: boolean | undefined
  public ignore: boolean | undefined
  public startContexts: (Context | (() => Context))[] | undefined
  public endContexts: (Context | (() => Context))[] | undefined
  public inContexts: (Context | (() => Context))[] | undefined
  public tmScope: TextMateScope | string | undefined

  protected _$rawValue = ''
  protected _$index = 0

  private getValue: ((rawValue: string) => Value) | undefined
  private _tmMatch: string | undefined

  constructor(
    { $name, validator, getValue, singleCharacter, ignore, startContexts, endContexts, inContexts, tmScope, tmMatch }: {
      $name: Token<Name, Value>['tmName']
      validator: Token<Name, Value>['validator']
      getValue?: Token<Name, Value>['getValue']
      singleCharacter?: Token<Name, Value>['singleCharacter']
      ignore?: Token<Name, Value>['ignore']
      startContexts?: Token<Name, Value>['startContexts']
      endContexts?: Token<Name, Value>['endContexts']
      inContexts?: Token<Name, Value>['inContexts']
      tmScope?: Token<Name, Value>['tmScope']
      tmMatch?: Token<Name, Value>['_tmMatch']
    },
  ) {
    this.tmName = $name
    this.validator = validator
    this.getValue = getValue
    this.singleCharacter = singleCharacter
    this.ignore = ignore
    this.startContexts = startContexts
    this.endContexts = endContexts
    this.inContexts = inContexts
    this.tmScope = tmScope
    this._tmMatch = tmMatch
  }

  get tmMatch() {
    if (this._tmMatch !== undefined)
      return this._tmMatch

    if (typeof this.validator === 'function')
      return undefined

    let source = this.validator.source

    if (source.startsWith('^'))
      source = source.slice(1)

    if (source.endsWith('$'))
      source = source.slice(0, -1)

    return source
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

    if (context?.some(context => context.forbiddenTokens?.find(forbiddenToken => resolveValue(forbiddenToken).tmName === this.tmName)))
      return false

    const availableTokens = context?.flatMap(context => context.availableTokens)
    if (availableTokens.length > 0 && availableTokens.every(availableToken => availableToken !== undefined && resolveValue(availableToken).tmName !== this.tmName))
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

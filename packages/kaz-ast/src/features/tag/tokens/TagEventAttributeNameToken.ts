import { TagAttributesContext } from '..'
import { Token } from '../../../lib/voltair'

const onRegex = /^on:([a-zA-Z_$][a-zA-Z_$0-9]+)$/

export const TagEventAttributeNameToken = new Token({
  $name: 'TagEventAttributeNameToken',
  validator: onRegex,
  getValue: (rawValue) => {
    const [, eventName] = rawValue.match(onRegex) || []

    if (!eventName)
      throw new Error('Event name is required')

    return eventName
  },
  inContexts: [() => TagAttributesContext],
  tmScope: 'entity.other.attribute-name.kaz',
})

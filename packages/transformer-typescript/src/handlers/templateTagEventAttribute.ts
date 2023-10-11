import type { IHandler } from '../transformer-typescript'

export const handleTemplateTagEventAttribute: IHandler<'templateTagEventAttribute'> = (templateTagEventAttribute, { handle }) => {
  handle({
    ...templateTagEventAttribute,
    $type: 'TagAttribute',
  })
}

import type { IHandler } from '../transformer-typescript-mapping'

export const handleTemplateTagEventAttribute: IHandler<'templateTagEventAttribute'> = async (templateTagEventAttribute, { handle }) => {
  handle({
    ...templateTagEventAttribute,
    $type: 'TagAttribute',
  })
}

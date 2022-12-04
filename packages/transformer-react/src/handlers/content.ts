import type { Content } from '@whitebird/kazam-transformer-base'

import type { IHandler } from '../transformer-react'

export const handleContent: IHandler<typeof Content> = async (content, { handle, addImport, component }) => {
  return (await Promise.all(content.map(async (item) => {
    if ('text' in item)
      return item.text

    if ('expression' in item)
      return `{${await handle(item.expression, component)}}`

    const openingTag = [
      `<${'component' in item ? item.component : item.tag}`,
      ...(await Promise.all(item.attributes?.map(attribute => handle(attribute, component)) ?? [])),
      ...(await Promise.all(item.events?.map(event => handle(event, component)) ?? [])),
    ].filter(Boolean).join(' ')

    if ('component' in item) {
      addImport(component.name, {
        namedImports: [{ name: item.component }],
        path: `./${item.component}`,
      })
    }

    if (item.content && item.content.length > 0) {
      return `
        ${openingTag}>
          ${await handle(item.content, component)}
        </${'component' in item ? item.component : item.tag}>
      `
    }

    return `${openingTag} />`
  }))).join('\n')
}

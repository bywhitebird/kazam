import type { IHandler } from '../transformer-react'

export const handleTemplateElse: IHandler<'templateElse'> = async (templateElse, { handle }) => {
  return Promise.all(templateElse.children.map(handle)).then(child => child.join('\n'))
}

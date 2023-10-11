import type { IHandler } from '../transformer-react'

export const handleTemplateElse: IHandler<'templateElse'> = (templateElse, { handle }) => {
  return templateElse.children.map(handle).join('\n')
}

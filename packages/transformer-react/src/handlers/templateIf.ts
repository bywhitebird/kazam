import type { IHandler } from '../transformer-react'

export const handleTemplateIf: IHandler<'templateIf'> = (templateIf, { handle }) => {
  return `{
    ${templateIf.condition.$value}
      ? <>${templateIf.children.map(handle).join('\n')}</>
      : ${templateIf.else !== undefined
        ? 'if' in templateIf.else
          ? `${handle(templateIf.else)}`
          : `<>${handle(templateIf.else)}</>`
        : 'null'
      }
  }`
}

import type { IHandler } from '../transformer-react'

export const handleTemplateIf: IHandler<'templateIf'> = async (templateIf, { handle }) => {
  return `{
    ${templateIf.condition.$value}
      ? <>${await Promise.all(templateIf.children.map(handle)).then(instructions => instructions.join('\n'))}</>
      : ${templateIf.else !== undefined
        ? 'if' in templateIf.else
          ? `${await handle(templateIf.else)}`
          : `<>${await handle(templateIf.else)}</>`
        : 'null'
      }
  }`
}

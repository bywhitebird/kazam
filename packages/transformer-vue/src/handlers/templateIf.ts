import type { IHandler } from '../transformer-vue'

export const handleTemplateIf: IHandler<'templateIf'> = async (templateIf, { handle }) => {
  return `${templateIf.condition}
      ? [${await Promise.all(templateIf.children.map(handle)).then(instructions => instructions.join(',\n'))}]
      : ${templateIf.else !== undefined
        ? await handle(templateIf.else)
        : 'null'
      }
  `
}

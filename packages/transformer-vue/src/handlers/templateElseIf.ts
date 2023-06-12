import type { IHandler } from '../transformer-vue'

export const handleTemplateElseIf: IHandler<'templateElseIf'> = async (templateElseIf, { handle }) => {
  return await handle({ ...templateElseIf.if, $type: 'IfLogical' })
}

import type { IHandler } from '../transformer-vue'

export const handleTemplateElseIf: IHandler<'templateElseIf'> = (templateElseIf, { handle }) => {
  return handle({ ...templateElseIf.if, $type: 'IfLogical' })
}

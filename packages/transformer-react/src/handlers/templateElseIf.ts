import type { IHandler } from '../transformer-react'

export const handleTemplateElseIf: IHandler<'templateElseIf'> = async (templateElseIf, { handle }) => {
  return ((await handle({ ...templateElseIf.if, $type: 'IfLogical' })) as string).slice(1, -1)
}

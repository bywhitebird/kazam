import type { IHandler } from '../transformer-react'

export const handleTemplateElseIf: IHandler<'templateElseIf'> = (templateElseIf, { handle }) => {
  return (handle({ ...templateElseIf.if, $type: 'IfLogical' }) as string).slice(1, -1)
}

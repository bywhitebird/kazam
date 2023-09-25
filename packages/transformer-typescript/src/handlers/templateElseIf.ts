import type { IHandler } from '../transformer-typescript'

export const handleTemplateElseIf: IHandler<'templateElseIf'> = (templateElseIf, { handle, addGeneratedContent }) => {
  addGeneratedContent('else ')
  handle({
    ...templateElseIf.if,
    $type: 'IfLogical',
  })
}

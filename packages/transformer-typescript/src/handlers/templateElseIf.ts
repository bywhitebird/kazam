import type { IHandler } from '../transformer-typescript'

export const handleTemplateElseIf: IHandler<'templateElseIf'> = async (templateElseIf, { handle, addGeneratedContent }) => {
  addGeneratedContent('else ')
  handle({
    ...templateElseIf.if,
    $type: 'IfLogical',
  })
}

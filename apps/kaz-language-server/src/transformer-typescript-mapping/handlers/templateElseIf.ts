import type { IHandler } from '../transformer-typescript-mapping'

export const handleTemplateElseIf: IHandler<'templateElseIf'> = async (templateElseIf, { handle, addGeneratedContent }) => {
  addGeneratedContent('else ')
  handle({
    ...templateElseIf,
    $type: 'IfLogical',
  })
}

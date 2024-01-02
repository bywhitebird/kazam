import { Effect, pipe } from 'effect'

import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handleKaz: Handle<'ast', string>
  = kaz => Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    yield * _(transformService.addImport(
      'namespaceImport',
      { path: 'https://esm.sh/preact', alias: 'h' },
    ))

    yield * _(transformService.addImport(
      'namespaceImport',
      { path: 'https://esm.sh/preact', alias: 'render' },
    ))

    yield * _(transformService.addImport(
      'defaultImport',
      { path: 'https://esm.sh/htm/mini', name: 'htm' },
    ))

    const findInstructionOfType = <T extends typeof kaz.instructions[number]['$type']>(type: T) =>
      kaz.instructions.filter(instruction => instruction.$type === type) as Extract<typeof kaz.instructions[number], { $type: T }>[]

    yield * _(Effect.forEach(
      findInstructionOfType('ImportInstruction'),
      transformService.handle,
    ))

    const props = yield * _(Effect.forEach(
      findInstructionOfType('PropInstruction'),
      transformService.handle,
    ))
    const propsDeclaration = props.map(prop => prop.declaration).join(', ')
    const propsType = props.map(prop => prop.type).join(', ')

    const otherInstructions = (
      kaz.instructions.filter(instruction => instruction.$type !== 'ImportInstruction' && instruction.$type !== 'PropInstruction') as
      Exclude<typeof kaz.instructions[number], { $type: 'ImportInstruction' | 'PropInstruction' }>[]
    )

    return yield * _(pipe(
      String.prototype.concat(
        'const html = htm.bind(h);',
        'const Component = (',
        props.length > 0
          ? `{ ${propsDeclaration} }: { ${propsType} }`
          : '',
        ') => {',
        yield * _(
          pipe(
            otherInstructions,
            Effect.forEach(
              transformService.handle,
            ),
            Effect.map(instructions => instructions.join(';\n')),
          ),
        ),
        '\nreturn (html\`<>',
        yield * _(
          pipe(
            kaz.template,
            Effect.forEach(
              transformService.handle,
            ),
            Effect.map(template => template.join('\n')),
          ),
        ),
        '</>\`)',
        '}\n',
        'render(',
        'h(() => Component(PROPS_ACCESSOR)),',
        'document.querySelector(SELECTOR)',
        ')',
      ),
      // TODO: remove 

      code => Effect.all([transformService.getImportString(), Effect.succeed(code)]),
      Effect.map(([imports, code]) => `${imports}\n\n${code}`),
    ))
  })

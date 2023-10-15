import * as path from 'node:path'

import { Effect, pipe } from 'effect'

import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handleKaz: Handle<'ast', string>
  = kaz => Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    yield * _(transformService.addImport(
      'namespaceImport',
      { path: 'react', alias: 'React' },
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

    const metadata = yield * _(transformService.getMetadata())
    const componentName = path.basename(metadata.componentName, path.extname(metadata.componentName))

    return yield * _(pipe(
      String.prototype.concat(
        'export const ',
        componentName,
        ' = (',
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
        '\nreturn (<>',
        yield * _(
          pipe(
            kaz.template,
            Effect.forEach(
              transformService.handle,
            ),
            Effect.map(template => template.join('\n')),
          ),
        ),
        '</>)',
        '}',
      ),
      code => Effect.all([transformService.getImportString(), Effect.succeed(code)]),
      Effect.map(([imports, code]) => `${imports}\n\n${code}`),
    ))
  })

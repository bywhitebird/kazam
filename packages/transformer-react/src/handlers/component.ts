import type { Component, IProps } from '@whitebird/kazam-transformer-base'

import type { IHandler } from '../transformer-react'

export const handleComponent: IHandler<typeof Component> = async (component, { handle, addImport }) => {
  addImport(component.name, {
    defaultImport: { name: 'React' },
    path: 'react',
  })

  if (component.hasChildren) {
    const childrenProp: IProps = { children: { type: 'ReactNode' } }
    addImport(component.name, {
      namedImports: [{ name: 'ReactNode', typeOnly: true }],
      path: 'react',
    })

    if (component.props === undefined)
      component.props = {}

    if ('children' in component.props)
      throw new Error('Cannot define a children prop on this component because it already has a children prop defined in its type definition')

    component.props = { ...component.props, ...childrenProp }
  }

  return `
    export const ${component.name} = (${await handle(component.props, component)}) => {
      ${
        component.statements
          ? await Promise.all(component.statements.map(statement => handle(statement, component))).then(statements => statements.join('\n'))
          : ''
      }

      return (
        <>
          ${await handle(component.template, component)}
        </>
      )
    }
  `
}

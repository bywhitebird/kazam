declare module '*.kaz' {
  import type { ComponentType } from 'react'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: ComponentType<any>
  export default component
}

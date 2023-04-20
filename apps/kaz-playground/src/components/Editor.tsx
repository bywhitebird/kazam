import { useStore } from '@nanostores/react'

import BaseMonaco from './BaseMonaco'
import { $code } from '../store/code'

export default function Editor() {
  const code = useStore($code)

  const handleChange = (value: string | undefined) => {
    value && $code.set(value)
  }

  return <BaseMonaco
    value={code}
    onChange={handleChange}
  />
}

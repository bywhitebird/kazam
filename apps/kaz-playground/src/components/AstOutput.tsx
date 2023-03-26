import { useStore } from '@nanostores/react'
import { useCallback, useEffect, useRef, useState } from 'react'

import BaseMonaco from './BaseMonaco'
import { $code } from '../store/code'
import { $output } from '../store/output'

async function getOutput(code: string) {
  const response = await fetch(`/api/parse?code=${encodeURIComponent(code)}&type=ast`)
  const output = await response.text()

  try {
    return JSON.stringify(JSON.parse(output), null, 2)
  }
  catch {
    return output
  }
}

export default function AstOutput() {
  const code = useStore($code)
  const output = useStore($output)

  const editorContainerRef = useRef<HTMLDivElement>(null)
  const hideEditorCursor = useCallback(() => {
    const cursor = editorContainerRef.current?.querySelector('.monaco-editor .cursors-layer') as HTMLElement
    if (cursor)
      cursor.style.display = 'none'
  }, [editorContainerRef.current])

  const parseTimeout = useRef<NodeJS.Timeout>()
  const [loading, setLoading] = useState(false)

  const handleChange = (value: string | undefined) => {
    value && $code.set(value)

    if (parseTimeout.current)
      clearTimeout(parseTimeout.current)

    parseTimeout.current = setTimeout(async () => {
      setLoading(true)
      const output = await getOutput(value || '')
      $output.set(output)
      parseTimeout.current = undefined
      setLoading(false)
    }, 500)
  }

  useEffect(() => {
    handleChange(code)
  }, [code])

  return <div className='contents' ref={editorContainerRef}>
    <BaseMonaco
      value={loading ? 'Loading...' : output}
      language="json"
      options={{
        readOnly: true,
        renderLineHighlight: 'none',
        minimap: { enabled: false },
      }}
      onMount={hideEditorCursor}
    />
  </div>
}

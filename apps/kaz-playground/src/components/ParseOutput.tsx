import { useStore } from '@nanostores/react'
import { useCallback, useEffect, useRef, useState } from 'react'

import BaseMonaco from './BaseMonaco'
import { $code } from '../store/code'
import { $output, setOutput } from '../store/output'

type ParseType = 'ast' | 'react'

async function getOutput(code: string, type: ParseType) {
  const response = await fetch(`/api/parse?code=${encodeURIComponent(code)}&type=${type}`)
  const output = await response.text()

  try {
    return JSON.stringify(JSON.parse(output), null, 2)
  }
  catch {
    return output
  }
}

export default function ParseOutput({ type, language, extension }: { type: ParseType; language: string; extension: string }) {
  const code = useStore($code)
  const output = useStore($output)
  const [id] = useState(() => Math.random().toString(36).substr(2, 9))

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
      const output = await getOutput(value || '', type)
      setOutput(type, output)
      parseTimeout.current = undefined
      setLoading(false)
    }, 500)
  }

  useEffect(() => {
    handleChange(code)
  }, [code])

  return <div className='contents' ref={editorContainerRef}>
    <BaseMonaco
      value={loading ? 'Loading...' : output[type]}
      language={language}
      path={`file:///${id}.${extension}`}
      options={{
        readOnly: true,
        renderLineHighlight: 'none',
        minimap: { enabled: false },
      }}
      onMount={hideEditorCursor}
    />
  </div>
}

import _MonacoEditor, { type EditorProps, type Monaco } from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'

import whitebirdVsCodeTheme from '../assets/whitebirdVsCodeTheme'
import { transformVsCodeThemeToMonacoTheme } from '../utils/transformVsCodeThemeToMonacoTheme'

const MonacoEditor = ('default' in _MonacoEditor ? _MonacoEditor.default : _MonacoEditor) as typeof _MonacoEditor

export default function BaseMonaco(props: EditorProps) {
  const handleEditorDidMount = (_: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    monaco.editor.defineTheme('Whitebird', transformVsCodeThemeToMonacoTheme(whitebirdVsCodeTheme))
    monaco.editor.setTheme('Whitebird')
  }

  const { options, onMount, ...propsWithoutOptions } = props
  const { scrollbar: scrollbarOptions } = options || {}

  return <div className="contents">
    <MonacoEditor
      height="100%"
      width="100%"
      options={{
        fontFamily: 'var(--font-mono)',
        fontSize: 0.875 * 16,
        lineHeight: 1.25 * 16,
        automaticLayout: true,
        padding: {
          top: 0.5 * 16,
          bottom: 0.5 * 16,
        },
        theme: 'Whitebird',
        scrollbar: {
          vertical: 'visible',
          ...scrollbarOptions,
        },
        ...options,
      }}
      onMount={(editor, monaco) => {
        handleEditorDidMount(editor, monaco)
        onMount?.(editor, monaco)
      }}
      {...propsWithoutOptions}
    />
  </div>
}

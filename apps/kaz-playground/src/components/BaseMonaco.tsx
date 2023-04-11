import _MonacoEditor, { type EditorProps, type Monaco } from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import { MonacoJsxSyntaxHighlight, getWorker } from 'monaco-jsx-syntax-highlight'

import whitebirdVsCodeTheme from '../assets/whitebirdVsCodeTheme'
import { transformVsCodeThemeToMonacoTheme } from '../utils/transformVsCodeThemeToMonacoTheme'

const MonacoEditor = ('default' in _MonacoEditor ? _MonacoEditor.default : _MonacoEditor) as typeof _MonacoEditor

export default function BaseMonaco(props: EditorProps) {
  const handleEditorDidMount = async (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    monaco.editor.defineTheme('Whitebird', transformVsCodeThemeToMonacoTheme(whitebirdVsCodeTheme))
    monaco.editor.setTheme('Whitebird')

    if (props.language === 'typescript' && props.path?.endsWith('.tsx')) {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: monaco.languages.typescript.JsxEmit.Preserve,
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        esModuleInterop: true,
      })
    }

    const monacoJsxSyntaxHighlight = new MonacoJsxSyntaxHighlight(getWorker(), monaco)
    const { highlighter } = monacoJsxSyntaxHighlight.highlighterBuilder({ editor })
    highlighter()
    editor.onDidChangeModelContent(() => {
      highlighter()
    })
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

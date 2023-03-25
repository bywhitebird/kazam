import MonacoEditor, { Monaco } from "@monaco-editor/react"
import { useEffect } from "react"

import { transformVsCodeThemeToMonacoTheme } from '../../lib/utils'
import whitebirdVsCodeTheme from "../../../assets/whitebird-vscode-theme"
import React from "react"

const defaultCode = `
- import _ from "lodash"
- prop buttonText: string = "Button"
- prop callback: () => void = () => console.log('Button clicked')

div() {
    button(
        type="submit",
        onClick={callback}
    ) {
        \${buttonText}
    }
}
`.trimStart()

export const KazEditor = ({ onCodeChange, initialCode }: { onCodeChange?: ((code: string) => void) | undefined, initialCode?: string | undefined }) => {
  // const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>()

  const handleEditorDidMount = (_: any, monaco: Monaco) => {
    monaco.editor.defineTheme("Whitebird", transformVsCodeThemeToMonacoTheme(whitebirdVsCodeTheme))
    monaco.editor.setTheme("Whitebird")
  }

  const handleEditorChange = (code: string | undefined) => {
    onCodeChange?.(code ?? "")
  }

  useEffect(() => {
    onCodeChange?.(defaultCode)
  }, [onCodeChange])

  useEffect(() => {
    if (initialCode) {
      onCodeChange?.(initialCode)
    }
  }, [])

  return <MonacoEditor
    height="100%"
    width="100%"
    defaultLanguage="kaz"
    defaultValue={initialCode ?? defaultCode}
    theme="vs-dark"
    options={{
      fontFamily: "var(--font-mono)",
      fontSize: 0.875 * 16,
      lineHeight: 1.25 * 16,
      automaticLayout: true,
      padding: {
        top: 0.5 * 16,
        bottom: 0.5 * 16,
      },
      theme: "Whitebird",
    }}
    onMount={handleEditorDidMount}
    onChange={handleEditorChange}
  />
}

export const MemoizedKazEditor = React.memo(KazEditor)

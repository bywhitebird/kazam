import type { InitializationOptions } from '@volar/language-server'
import { DiagnosticModel } from '@volar/language-server'
import { activateAutoInsertion, getTsdk } from '@volar/vscode'
import { semanticTokensLegend } from '@whitebird/kaz-ast'
import * as vscode from 'vscode'
import * as lsp from 'vscode-languageclient/node'

let client: lsp.BaseLanguageClient

export async function activate(context: vscode.ExtensionContext) {
  const serverModule = vscode.Uri.joinPath(context.extensionUri, 'dist', 'server.js')
  const runOptions = { execArgv: <string[]>[] }
  const debugOptions = { execArgv: ['--nolazy', `--inspect=${6009}`] }
  const serverOptions: lsp.ServerOptions = {
    run: {
      module: serverModule.fsPath,
      transport: lsp.TransportKind.ipc,
      options: runOptions,
    },
    debug: {
      module: serverModule.fsPath,
      transport: lsp.TransportKind.ipc,
      options: debugOptions,
    },
  }
  const initializationOptions: InitializationOptions = {
    typescript: { tsdk: (await getTsdk(context)).tsdk },
    diagnosticModel: DiagnosticModel.Pull,
    semanticTokensLegend,
  }
  const clientOptions: lsp.LanguageClientOptions = {
    documentSelector: [{ language: 'kaz', scheme: 'file' }],
    initializationOptions,
  }
  client = new lsp.LanguageClient(
    'kaz-language-server',
    'Kaz Language Server',
    serverOptions,
    clientOptions,
  )
  await client.start()

  // support for auto close tag
  activateAutoInsertion([client], document => document.languageId === 'kaz')
}

export function deactivate(): Thenable<any> | undefined {
  return client?.stop()
}

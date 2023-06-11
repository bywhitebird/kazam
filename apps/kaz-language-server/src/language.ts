import type { Language, VirtualFile } from '@volar/language-core'
import { FileCapabilities, FileKind, FileRangeCapabilities } from '@volar/language-core'
import { parse, tokenize } from '@whitebird/kaz-ast'
import type * as ts from 'typescript/lib/tsserverlibrary'
import { TransformerTypescriptMapping } from './transformer-typescript-mapping'

export const language: Language<KazFile> = {
  createVirtualFile(fileName, snapshot) {
    if (fileName.endsWith('.kaz'))
      return new KazFile(fileName, snapshot)

    return undefined
  },
  async updateVirtualFile(kazFile, snapshot) {
    await kazFile.update(snapshot)
  },
}

export class KazFile implements VirtualFile {
  public kind = FileKind.TextFile
  public capabilities = FileCapabilities.full
  public mappings: VirtualFile['mappings'] = []
  public embeddedFiles: VirtualFile['embeddedFiles'] = []

  public fileName: string
  public tokens: Awaited<ReturnType<typeof tokenize>> | undefined = undefined
  public ast: Awaited<ReturnType<typeof parse>> = undefined

  constructor(
    public sourceFileName: string,
    public snapshot: ts.IScriptSnapshot,
  ) {
    this.fileName = sourceFileName
    this.onSnapshotUpdated()
  }

  public async update(newSnapshot: ts.IScriptSnapshot) {
    this.snapshot = newSnapshot
    await this.onSnapshotUpdated()
  }

  public async onSnapshotUpdated() {
    this.mappings = [{
      sourceRange: [0, this.snapshot.getLength()],
      generatedRange: [0, this.snapshot.getLength()],
      data: FileRangeCapabilities.full,
    }]

    const tokens = await tokenize(this.snapshot.getText(0, this.snapshot.getLength()))
    const ast = await parse([...tokens])

    this.tokens = tokens
    this.ast = ast

    await this.createEmbeddedFiles()
  }

  private async createEmbeddedFiles() {
    this.embeddedFiles = []
    await this.createTypeScriptEmbeddedFile()
  }

  private async createTypeScriptEmbeddedFile() {
    const ast = this.ast

    if (ast instanceof Error)
      return

    if (ast === undefined || ast.instructions === undefined)
      return

    const transformerTypescriptMapping = new TransformerTypescriptMapping({
      [this.fileName]: ast,
    }, {})

    const tsFiles = await transformerTypescriptMapping.transformAndGenerateMappings()

    Object.entries(tsFiles).forEach(([fileName, { content, mapping }]) => {
      this.embeddedFiles.push({
        fileName: `${fileName}.ts`,
        kind: FileKind.TypeScriptHostFile,
        snapshot: {
          getText: (start, end) => content.substring(start, end),
          getLength: () => content.length,
          getChangeRange: () => undefined,
        },
        mappings: mapping.map(mapping => ({
          ...mapping,
          data: FileRangeCapabilities.full,
        })),
        capabilities: FileCapabilities.full,
        embeddedFiles: [],
      })
    })

    // TODO: Remove
    ;(global as any).embeddedFiles = this.embeddedFiles
  }
}

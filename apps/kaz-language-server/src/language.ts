import type { Language, VirtualFile } from '@volar/language-core'
import { FileCapabilities, FileKind, FileRangeCapabilities } from '@volar/language-core'
import { parse, tokenize } from '@whitebird/kaz-ast'
import { TransformerTypescript } from '@whitebird/kazam-transformer-typescript'
import type ts from 'typescript/lib/tsserverlibrary'

export const language: Language<KazFile> = {
  createVirtualFile(fileName, snapshot) {
    if (fileName.endsWith('.kaz'))
      return new KazFile(fileName, snapshot)

    return undefined
  },
  updateVirtualFile(kazFile, snapshot) {
    kazFile.update(snapshot)
  },
}

export class KazFile implements VirtualFile {
  public kind = FileKind.TextFile
  public capabilities = FileCapabilities.full
  public mappings: VirtualFile['mappings'] = []
  public embeddedFiles: VirtualFile['embeddedFiles'] = []
  public codegenStacks: VirtualFile['codegenStacks'] = []

  public fileName: string
  public tokens: Awaited<ReturnType<typeof tokenize>> | undefined = undefined
  public ast: Awaited<ReturnType<typeof parse>> = undefined

  constructor(
    public sourceFileName: string,
    public snapshot: ts.IScriptSnapshot,
  ) {
    this.fileName = sourceFileName
    this.update(snapshot)
  }

  public update(newSnapshot: ts.IScriptSnapshot) {
    const { snapshot, embeddedFiles, mappings } = this.onSnapshotUpdated(newSnapshot)

    this.snapshot = snapshot
    this.embeddedFiles = embeddedFiles
    this.mappings = mappings
  }

  public onSnapshotUpdated(snapshot: ts.IScriptSnapshot) {
    const tokens = tokenize(snapshot.getText(0, snapshot.getLength()))
    const ast = parse([...tokens])

    this.tokens = tokens
    this.ast = ast

    return {
      snapshot,
      embeddedFiles: this.createEmbeddedFiles(),
      mappings: [{
        sourceRange: [0, snapshot.getLength()] as [number, number],
        generatedRange: [0, snapshot.getLength()] as [number, number],
        data: FileRangeCapabilities.full,
      }],
    }
  }

  private createEmbeddedFiles() {
    const embeddedFilesCreators = [
      this.createTypeScriptEmbeddedFile,
    ]

    const embeddedFiles = embeddedFilesCreators.map(creator => creator.call(this))

    return embeddedFiles.flat()
  }

  private createTypeScriptEmbeddedFile() {
    const embeddedFiles: VirtualFile[] = []

    const ast = this.ast

    if (ast instanceof Error)
      return []

    if (ast === undefined || ast.instructions === undefined)
      return []

    const transformerTypescript = new TransformerTypescript({
      [this.fileName]: ast,
    }, {})

    const tsFiles = transformerTypescript.transformAndGenerateMappings()

    Object.entries(tsFiles).forEach(([fileName, { content, mapping }]) => {
      embeddedFiles.push({
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
        codegenStacks: [],
      })
    })

    return embeddedFiles
  }
}

import path from 'node:path'

export interface ImportInfo {
  name: string
  alias?: string
  typeOnly?: boolean
}

export type ImportInfos = (
  {
    defaultImport?: Omit<ImportInfo, 'alias'>
    namedImports?: ImportInfo[]
  }
  | { wildcardImport?: Required<Pick<ImportInfo, 'alias'>> }
) & { path: string; relativizePath?: boolean }

function generateImportName(importInfo: ImportInfo) {
  return `${importInfo.typeOnly ? 'type ' : ''}${importInfo.name}${importInfo.alias ? ` as ${importInfo.alias}` : ''}`
}

export function importsToString(
  importInfos: ImportInfos[],
  sourceAbsoluteFilePath: string,
  outputAbsoluteFilePath: string,
) {
  return importInfos.reduce<string>((acc, importInfo) => {
    let importString: string

    // The following block will fix the import path if it is a relative path
    if (
      importInfo.path.startsWith('.')
      && (importInfo.relativizePath === true || importInfo.relativizePath === undefined)
    ) {
      const absoluteImportedFilePath = path.resolve(
        path.dirname(sourceAbsoluteFilePath),
        importInfo.path,
      )

      const relativeImportedFilePath = path.relative(
        path.dirname(outputAbsoluteFilePath),
        absoluteImportedFilePath,
      )

      importInfo.path = `./${relativeImportedFilePath}`
    }

    if ('wildcardImport' in importInfo) {
      importString = `* as ${importInfo.wildcardImport.alias}`
    }
    else {
      importString = [
        ...(['defaultImport' in importInfo ? generateImportName(importInfo.defaultImport) : undefined]),
        ...([('namedImports' in importInfo && importInfo.namedImports.length > 0)
          ? `{ ${importInfo.namedImports.map(namedImport => generateImportName(namedImport)).join(', ')} }`
          : undefined]),
      ].filter(Boolean).join(', ')
    }

    if (importString.trim().length === 0)
      return `${acc}\nimport '${importInfo.path}'`

    return `${acc}\nimport ${importString} from '${importInfo.path}'`
  }, '')
}

export function mergeImports(importInfos: ImportInfos[]) {
  return importInfos.reduce<ImportInfos[]>((acc, importInfo) => {
    if ('wildcardImport' in importInfo) {
      if (acc.some(accImportInfo => 'wildcardImport' in accImportInfo && accImportInfo.wildcardImport.alias === importInfo.wildcardImport?.alias))
        return acc

      return [...acc, importInfo]
    }

    const defaultImport = 'defaultImport' in importInfo && importInfo.defaultImport
    const namedImports = 'namedImports' in importInfo && importInfo.namedImports

    const existingImportInfo = acc.find(accImportInfo => accImportInfo.path === importInfo.path)

    if (existingImportInfo && !('wildcardImport' in existingImportInfo)) {
      if (defaultImport && ('defaultImport' in existingImportInfo))
        throw new Error(`Cannot add default import ${defaultImport.name} to existing import ${existingImportInfo.defaultImport.name}`)

      if (namedImports) {
        const existingNamedImports = 'namedImports' in existingImportInfo ? existingImportInfo.namedImports : []
        const newNamedImports = namedImports.filter(namedImport => !existingNamedImports.some(existingNamedImport => existingNamedImport.name === namedImport.name))

        if (newNamedImports.length === 0)
          return acc

        return [
          ...acc.filter(accImportInfo => accImportInfo.path !== importInfo.path),
          { ...existingImportInfo, namedImports: [...existingNamedImports, ...newNamedImports] },
        ]
      }

      return acc
    }

    return [...acc, importInfo]
  }, [])
}

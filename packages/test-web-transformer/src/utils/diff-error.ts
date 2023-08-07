import * as path from 'node:path'

export class DiffError extends Error {
  constructor(private screenshotPath: string) {
    super()
    this.name = 'DiffError'
  }

  override get message() {
    const screenshotName = path.basename(this.screenshotPath, path.extname(this.screenshotPath))
    const fixtureName = path.basename(path.dirname(path.dirname(this.screenshotPath)))

    return `Failed to match screenshot "${screenshotName}" in fixture "${fixtureName}".`
      + ` See https://github.com/bywhitebird/kazam/blob/main/packages/test-web-transformer/src/fixtures/${fixtureName} for more details.`
  }
}

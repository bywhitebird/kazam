export class DiffError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DiffError'
  }
}

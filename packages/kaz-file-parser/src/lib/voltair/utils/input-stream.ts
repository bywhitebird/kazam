import { Readable } from 'stream'

export class InputStream extends Readable {
  private _input: string
  private _index: number

  constructor(input: string) {
    super()
    this._input = input
    this._index = 0
  }

  override _read() {
    if (this._index < this._input.length)
      this.push(this._input[this._index++])
    else
      this.push(null)
  }

  override on(event: 'close', listener: () => void): this
  override on(event: 'data', listener: (char: string) => void): this
  override on(event: 'end', listener: () => void): this
  override on(event: 'error', listener: (err: Error) => void): this
  override on(event: 'pause', listener: () => void): this
  override on(event: 'readable', listener: () => void): this
  override on(event: 'resume', listener: () => void): this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override on(event: string | symbol, listener: (...args: any[]) => void): this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override on(event: string, listener: (...args: any[]) => void) {
    if (event === 'data') {
      const dataListener = listener as (char: string) => void
      const newListener = (chunk: string | Buffer) => {
        if (typeof chunk === 'string')
          dataListener(chunk)
        else
          dataListener(chunk.toString())
      }
      return super.on(event, newListener)
    }

    return super.on(event, listener)
  }
}

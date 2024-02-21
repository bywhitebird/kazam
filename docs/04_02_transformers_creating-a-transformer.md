---
draft: true
title: Creating a transformer
slug: transformers/creating-a-transformer
---

# Creating a transformer

> [!NOTE]
> If you are planning to release a transformer to npm, we recommend that you name it with the `kazam-transformer-` prefix and add the `kazam-transformer` and `kazam` keywords to the `package.json` file. That will allow other developers to easily discovered it.

Just like parsers, creating a custom transformer is pretty simple. You simply need to create a class that extends the `TransformerBase` class from the `@whitebird/kazam-transformer-base` package and implement the necessary methods (this is the hard job).

> [!NOTE]
> We recommend that you use name your transformer class with the `Transformer` prefix, such as `TransformerCustom`.

```ts
import { TransformerBase } from '@whitebird/kazam-transformer-base'

export class TransformerCustom extends TransformerBase {
  // ...
}
```

The `TransformerBase` class has one abstract method that you need to implement:

- `transform` — This method should transform the input and return the output.

Here is the full definition of the `TransformerBase` class:

```ts
// packages/transfomer-base/src/index.ts
import type { ITransformerInput } from '.'

export type ITransformerOptions = Record<string, never>

export interface ITransformerOutput {
  [key: string]: ITransformerOutput | (Blob & { name: string })
}

export abstract class TransformerBase {
  constructor(
    public readonly input: ITransformerInput,
    public readonly options: ITransformerOptions,
  ) {
  }

  abstract transform(): Promise<ITransformerOutput | void>
}
```

As you can see, the `transform` method returns an object that conforms to the `ITransformerOutput` type. `ITransformerOutput` maps a file structure to a record of strings and blobs. The keys of the record are IDs of the files and directories, and the values are either a recursive `ITransformerOutput` object or a blob with a `name` property that specifies the name of the file (with the extension).

---
draft: true
title: Configuration
slug: configuration
---

# Configuration

Kazam allows you to specify the input sources, determine the location for the output, and select parsers (such as `parser-kaz`) and transformers (such as `transformer-react`).

When you run a command, Kazam will look for a `kazam.config.ts` file or a `kazam.config.js` file in the current working directory.

You can also specify a custom configuration file with the `--config` option (or `-c` for short) followed by the path to the configuration file.

```bash
kazam generate --config ./my-config.js
```

You can define the configuration as an object in JavaScript or TypeScript.

```js
// kazam.config.js
import { ParserKaz } from '@whitebird/kazam-parser-kaz'
import { TransformerReact } from '@whitebird/kazam-transformer-react'

export default {
  input: ['./src'],
  output: './dist',
  parsers: [ParserKaz],
  transformers: [TransformerReact],
}
```

To define your configuration object with IntelliSense support, you can use the `defineConfig` function helper.

```ts
// kazam.config.ts
import { defineConfig } from 'kazam'
// ...

export default defineConfig({
  // ...
})
```

Alternatively, you can use the JSDoc annotation.

```ts
// kazam.config.js
// ...

/** @type {import('kazam').UserConfig} */
export default {
  // ...
}
```

The configuration should be an object with the following properties:

- `input` — An array of strings understood by the parsers. It can be whatever the parsers support, such as a path to a file, to a directory, a glob pattern, or even a URL.
- `output` — A string that determines the location for the output. It should be a path (relative or absolute) to a directory.
- `parsers` — An array of parsers.
- `transformers` — An array of transformers.

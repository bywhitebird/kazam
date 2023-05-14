# simple-kazam-project

This example shows how to use `kazam` as simple as possible.

## How to reproduce

1. Init a new npm project and install `kazam` and its dependencies.
  
    ```bash
    npm init -y
    npm install -D kazam @whitebird/kazam-transformer-react @whitebird/kazam-parser-kaz
    ```

2. Create a `kazam.config.ts` file in the root directory of your project.

    ```ts
    import { ParserKaz } from '@whitebird/kazam-parser-kaz'
    import { TransformerReact } from '@whitebird/kazam-transformer-react'
    import { defineConfig } from 'kazam'

    export default defineConfig({
      input: ['src/components'],
      output: 'dist',
      transformers: [TransformerReact],
      parsers: [ParserKaz],
    })
    ```

3. Create a `src/components` directory and add a `HelloWorld.kaz` file in it.

    ```kaz
    p() {
        Hello, World!
    }
    ```

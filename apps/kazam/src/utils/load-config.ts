import * as fs from 'node:fs'
import * as path from 'node:path'
import vm from 'node:vm'

import typescript from 'typescript'

import { defineConfig } from './define-config.js'

export const loadConfig = async (configPath: string) => {
  if (path.extname(configPath) === '.js') {
    const config = await import(configPath)
    return defineConfig(config)
  }

  if (path.extname(configPath) === '.ts') {
    const transpiledConfigDefinition = typescript.transpileModule(fs.readFileSync(configPath, 'utf-8'), {
      compilerOptions: {
        module: typescript.ModuleKind.CommonJS,
      },
    }).outputText

    process.env.NODE_PATH += path.delimiter + path.join(process.cwd(), 'node_modules')
    const config = vm.runInThisContext(`
      ((require) => {
        require('module').Module._initPaths();
        var exports = {};
        ${transpiledConfigDefinition};
        return exports.default;
      })
    `)(require)

    return defineConfig(config)
  }

  throw new Error(`Could not load config file at ${configPath}`)
}

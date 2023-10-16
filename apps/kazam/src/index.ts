import { runCli } from './adapters/cli/cli'

export * from './adapters/lib'

if (require.main === module)
  runCli()

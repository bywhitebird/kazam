import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: ['prettier'],
  declaration: true,
})

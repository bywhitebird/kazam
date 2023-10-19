import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: ['@whitebird/kazam-transformer-base'],
  declaration: true,
})

require('esbuild').build({
  entryPoints: {
    client: './src/extension.js',
    server: require.resolve('@whitebird/kaz-language-server/bin/kaz-language-server.js'),
  },
  bundle: true,
  metafile: process.argv.includes('--metafile'),
  outdir: './dist',
  external: [
    'vscode',
  ],
  format: 'cjs',
  platform: 'node',
  tsconfig: './tsconfig.json',
  define: { 'process.env.NODE_ENV': '"production"' },
  minify: process.argv.includes('--minify'),
  watch: process.argv.includes('--watch'),
  plugins: [
    {
      name: 'umd2esm',
      setup(build) {
        build.onResolve({ filter: /^(vscode-.*|estree-walker|jsonc-parser)/ }, (args) => {
          const pathUmdMay = require.resolve(args.path, { paths: [args.resolveDir] })
          // Call twice the replace is to solve the problem of the path in Windows
          let pathEsm = pathUmdMay.replace('/umd/', '/esm/').replace('\\umd\\', '\\esm\\')

          // Try to resolve the path
          // If it fails, if the file extension is .js, try to replace it with .mjs
          try {
            require.resolve(pathEsm, { paths: [args.resolveDir] })
          }
          catch {
            if (pathEsm.endsWith('.js'))
              pathEsm = pathEsm.replace(/\.js$/, '.mjs')
          }

          return { path: pathEsm }
        })
      },
    },
  ],
}).catch(() => process.exit(1))

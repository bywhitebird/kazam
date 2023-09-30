#!/usr/bin/env node

// eslint-disable-next-line n/prefer-global/process
if (process.argv.includes('--version')) {
  const pkgJSON = require('../package.json')
  // eslint-disable-next-line no-console
  console.log(`${pkgJSON.version}`)
}
else {
  require('..')
}

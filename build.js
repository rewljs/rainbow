const { build } = require('esbuild')

build({
  bundle: true,
  target: ['node12'],
  format: 'cjs',
  sourcemap: 'external',
  outdir: 'lib',
  entryPoints: [
    'src/index.ts',
  ],
})
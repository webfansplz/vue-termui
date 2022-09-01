import { defineConfig } from 'tsup'
import { peerDependencies } from './package.json'

export default defineConfig({
  clean: true,
  // outDir: resolve(__dirname, './dist'),
  target: 'node14',
  format: ['esm', 'cjs'],
  dts: true,
  // entry: [resolve(__dirname, 'src/index.ts')],
  entry: ['src/index.ts'],
  esbuildOptions(options) {
    if (options.format === 'cjs')
      options.outExtension = { '.js': '.cjs' }
  },
  external: [
    ...Object.keys(peerDependencies),
    'unplugin-auto-import/vite',
    'unplugin-vue-components/vite',
  ],
})

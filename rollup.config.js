import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import eslint from '@rollup/plugin-eslint'
import typescript from '@rollup/plugin-typescript'
import url from '@rollup/plugin-url'
import path from 'path'

const extensions = ['.js', '.jsx', 'ts', 'tsx', '.mjs']

const rootDir = path.resolve(__dirname)

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        dir: 'dist',
        sourcemap: true,
        format: 'cjs',
      },
      {
        file: 'dist/index.mjs',
        sourcemap: true,
        format: 'es',
      },
    ],
    plugins: [
      alias({
        entries: [
          {
            find: 'src',
            replacement: path.resolve(rootDir, 'src'),
          },
        ],
      }),
      eslint(),
      url(),
      babel({
        extensions,
        babelHelpers: 'bundled',
      }),
      typescript({
        declaration: true,
        declarationDir: 'dist',
      }),
    ],
  },
]

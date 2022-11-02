import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.tsx',
    treeshake: false,
    plugins: [
      typescript(),
      terser(),
    ],
    output: { file: 'dist/index.js', format: 'esm' },
    external: ['react', '@wxik/core', '@wxik/observer', 'react/jsx-runtime'],
  },
  {
    input: 'src/index.tsx',
    output: {file: 'dist/index.d.ts', format: 'esm'},
    plugins: [dts()]
  }
]

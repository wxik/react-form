import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.js', format: 'esm' },
    external: ['react', '@wxik/core', '@wxik/observer'],
    plugins: [
      typescript(),
      terser(),
    ],
  }
]

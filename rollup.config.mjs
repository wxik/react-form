import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
import { dts } from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.js', format: 'esm', compact: true },
    external: ['react', '@nx-js/observer-util', 'react/jsx-runtime'],
    plugins: [del({ targets: 'dist/*' }), typescript(), terser()],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];

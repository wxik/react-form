import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/index.ts',
    output: {file: 'dist/index.js', format: 'esm', compact: true},
    external: ['react', '@nx-js/observer-util', 'react/jsx-runtime'],
    plugins: [typescript(), terser()],
  },
];

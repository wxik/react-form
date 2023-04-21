import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import del from 'rollup-plugin-delete';

export default [
  {
    input: 'src/index.ts',
    output: {file: 'dist/index.js', format: 'esm', compact: true},
    external: ['react', '@nx-js/observer-util', 'react/jsx-runtime'],
    plugins: [del({targets: 'dist/*'}), typescript(), terser()],
  },
];

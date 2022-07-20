import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import {nodeResolve} from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  treeshake: false,
  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    terser(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              esmodules: true,
            },
            loose: true,
            ignoreBrowserslistConfig: false,
          },
        ],
        [
          '@babel/preset-react',
          {
            runtime: 'automatic',
          },
        ],
      ],
      plugins: [
        ['@babel/plugin-proposal-function-bind'], // :: bind
      ],
    }),
  ],
  output: [{ file: 'dist/index.js', format: 'esm' }],
  external: ['react', '@wxik/core', '@wxik/observer', 'react/jsx-runtime'],
};

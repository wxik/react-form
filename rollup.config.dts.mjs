import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.tsx',
    output: {file: 'index.d.ts', format: 'esm'},
    plugins: [dts()]
  },
]

import {defineConfig} from 'dumi';

const path = require('path');
const __DEV__ = process.env.NODE_ENV !== 'production';
const repo = 'react-form';
export default defineConfig({
  title: 'Reaction Form',
  logo: `${!__DEV__ ? `/${repo}` : ''}/reaction.svg`,
  favicons: ['/favicon.svg'],
  themeConfig: {
    footer: `Open-source MIT Licensed | Copyright © 2023-present <br/> Powered by self`,
    prefersColor: {default: 'light', switch: false},
  },
  outputPath: path.join(__dirname, '..', 'docs'),
  base: !__DEV__ ? `/${repo}/` : '/',
  publicPath: !__DEV__ ? `/${repo}/` : '/',
  alias: {
    '@wxik/react-form': path.resolve('../src'),
    '@': path.resolve(__dirname, 'src'),
  },
  extraPostCSSPlugins: [require('postcss-import'), require('tailwindcss/nesting'), require('tailwindcss')],
  resolve: {
    docDirs: ['docs'],
    // atomDirs: [{type: 'component', dir: 'docs/components'}],
    atomDirs: [],
  },
});

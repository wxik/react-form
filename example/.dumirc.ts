import {defineConfig} from 'dumi';

const path = require('path');

export default defineConfig({
  title: 'Reaction Form',
  logo: '/reaction.svg',
  favicons: ['/favicon.svg'],
  themeConfig: {
    footer: `Open-source MIT Licensed | Copyright © 2023-present <br/> Powered by self`,
    prefersColor: {default: 'light', switch: false},
  },
  outputPath: path.join(__dirname, '..', 'docs'),
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

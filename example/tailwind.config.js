/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './docs/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false, // 去掉 tailwindcss 的基础样式设置
  },
  theme: {
    extend: {},
  },
  plugins: [],
};

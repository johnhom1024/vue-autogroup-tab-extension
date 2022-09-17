const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const copyFiles = [
  {
    from: path.resolve('src/plugins/manifest.json'),
    to: `${path.resolve('dist')}/manifest.json`,
  },
  {
    from: path.resolve('src/assets'),
    to: path.resolve('dist/assets'),
  },
];

// 复制插件
const plugins = [
  new CopyWebpackPlugin({
    patterns: copyFiles,
  }),
];

const pages = {};
const chromePageName = ['popup'];

chromePageName.forEach((name) => {
  pages[name] = {
    entry: `src/${name}/main.ts`,
    template: `src/${name}/index.html`,
    filename: `${name}.html`,
  };
});

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  pages,
  configureWebpack: {
    entry: {
      background: './src/background/main.ts',
    },
    output: {
      filename: 'js/[name].js',
    },
    plugins,
  },
  // 配置 content.css
  css: {
    extract: {
      filename: 'css/[name].css',
    },
  },
});

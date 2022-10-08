const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

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
    devtool: false,
  },
  chainWebpack: config => {
    // 本地环境
    if (!isProd) {
      // 如果不是打包生产环境，则不压缩代码
      config.optimization.minimize(false);
    }
  },
  // 配置 content.css
  css: {
    extract: {
      filename: 'css/[name].css',
    },
  },
});

/**
 * 用于学习的配置practice
 */
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');

// package.json中定义了启动的环境变量NODE_ENV，使用cross-env防止不同平台的冲突，plugins插件中定义使用
const isDev = process.env.NODE_ENV === 'development';

const devServer =  {
  port: '8088',
  host: '0.0.0.0', // 可以使用127.0.0.1访问，或者本机ip访问
  overlay: {
    errors: true, // 编译错误显示在网页中
  },
  open: true, // 自动打开浏览器
  hot: true, // 无刷新热更新
};

const defaultPlugins = [ // 主要用于前端渲染，服务端渲染使用另外一套配置
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"', // 让js代码中可以使用process.env
    }
  }),
  new HTMLPlugin({ // 使用template.html作为渲染的模板
    template: path.join(__dirname, 'template.html')
  })
];

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      { // css预处理器
        test: /\.styl/,
        use: [
          'vue-style-loader',
          { // 此处的options可以让import css文件时也可以使用cssModules的配置,见footer.jsx
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            } // 让postcss直接使用stylus生成的sourcemap，节省资源
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer,

  resolve: {
    alias: {
      // 指定vue版本
      // 例如 import Vue from 'vue' 时需要使用的库文件位置，
      // runtime.vue是无法使用 template语法的，所以需要指定
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(), // 启动热加载的插件
    // 废弃 new webpack.NoEmitOnErrorsPlugin(),// 减少不需要的信息展示
  ])
});


module.exports = config;

const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin'); // 用于css分离打包
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');

// package.json中定义了启动的环境变量NODE_ENV，使用cross-env防止不同平台的冲突，plugins插件中定义使用
const isDev = process.env.NODE_ENV === 'development';

const devServer =  {
  port: '8888',
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
      NODE_ENV: isDev ? '"development"': '"production"', // 让js代码中可以使用process.env
    }
  }),
  new HTMLPlugin()
];

if (isDev) {
  config = merge(baseConfig, {
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
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(), // 启动热加载的插件
      new webpack.NoEmitOnErrorsPlugin(),// 减少不需要的信息展示
    ])
  });
}else {
  config = merge(baseConfig, {
    entry: { // 把通用类库文件单独打包
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      // hash是整个应用使用同一个hash，打包出的文件的hash是相同的，chunkhash会对打包的不同的模块单独设置hash,
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        { // css预处理器
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                }
              },
              'stylus-loader'
            ]
          })
        },
      ]
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({ // 把通用类库文件单独打包，name指向entry中配置的vendor
        name: 'vendor' // vendor放在runtime之前
      }),
      new webpack.optimize.CommonsChunkPlugin({ // 把webpack生成的代码单独打包
        name: 'runtime'
      })
    ])
  });
}

module.exports = config;

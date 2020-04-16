const path = require('path');
const createVueLoaderOptions = require('./vue-loader.config');

// package.json中定义了启动的环境变量NODE_ENV，使用cross-env防止不同平台的冲突，plugins插件中定义使用
const isDev = process.env.NODE_ENV === 'development';

const config = {
  mode: process.env.NODE_ENV || 'production', // development || production
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist/'),
    publicPath: '/public/' // 开发模式下bundle.js的资源路径，重要！
  },
  module: {
    rules: [
      { // 使用eslint来做代码及时检测, 代码有不规范的时候即时提示
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: "pre"// 让规定的文件在使用真正loader之前预处理,有错误直接返回
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ // 忽略node_modules中的文件
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader', // 可以在vue模板文件修改css的时候热更新
          'css-loader',
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'sass-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(gif|jpg|png|jpeg|svg)$/,
        use: [
          { // loader可以配置选项,使用option把参数传递给url-loader
            loader: 'url-loader', // 会把图片转成base64
            options: {
              limit: 1024, // 文件大小小于1024就会转成base64
              name: 'resources/[path][name]-[hash:8].[ext]', // 输出的文件名字
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;

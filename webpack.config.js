const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin'); // 用于css分离打包

// package.json中定义了启动的环境变量NODE_ENV，使用cross-env防止不同平台的冲突，plugins插件中定义使用
const isDev = process.env.NODE_ENV === 'development';

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist/' + Math.floor((new Date()).getTime() / 1000))
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
              name: '[name].[hash].[ext]', // 输出的文件名字
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"': '"production"', // 让js代码中可以使用process.env
      }
    }),
    new HTMLPlugin()
  ]
};

if (isDev) {
  config.module.rules.push({ // css预处理器
    test: /\.styl/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        } // 让postcss直接使用stylus生成的sourcemap，节省资源
      },
      'stylus-loader'
    ]
  });
  config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    port: '8888',
    host: '0.0.0.0', // 可以使用127.0.0.1访问，或者本机ip访问
    overlay: {
      errors: true, // 编译错误显示在网页中
    },
    open: true, // 自动打开浏览器
    hot: true, // 无刷新热更新
  };

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(), // 启动热加载的插件
    new webpack.NoEmitOnErrorsPlugin(),// 减少不需要的信息展示
  )
}else {
  config.entry = { // 把通用类库文件单独打包
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  };
  // hash是整个应用使用同一个hash，打包出的文件的hash是相同的，chunkhash会对打包的不同的模块单独设置hash,
  config.output.filename = '[name].[chunkhash:8].js';
  config.module.rules.push({ // css预处理器
    test: /\.styl/,
    use: ExtractPlugin.extract({
      fallback:'style-loader',
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
  })
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({ // 把通用类库文件单独打包，name指向entry中配置的vendor
      name: 'vendor' // vendor放在runtime之前
    }),
    new webpack.optimize.CommonsChunkPlugin({ // 把webpack生成的代码单独打包
      name: 'runtime'
    })
  );
}

module.exports = config;

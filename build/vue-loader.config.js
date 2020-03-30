const docsLoader = require.resolve('./doc-loader');
// vue-loader的配置
module.exports = (isDev) => {
  return {
    preserveWhiteSpace: true, // 去掉模板代码中的空格
    extractCSS: !isDev, // 把vue模板中的css提出来到单独的css文件中，默认不提取，速度会更快一些
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]', // 改变class的类名为规定的类名。见header.vue中的$style
      camelCase: true, // 把css中类名的带横杠的方式转换成驼峰变量
    },
    // hotReload: false // 根据环境变量生成
    loaders: {
      'docs': docsLoader // 自定义loader
    },
    preLoader: { // 解析前使用的loader
    },
    postLoader: { // 解析后使用的loader

    }
  }
}

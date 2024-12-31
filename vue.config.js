const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',  // 确保这里与你的生产环境根路径一致

  // 配置输出目录
  outputDir: 'dist',  // 输出的目录

  // 配置静态资源目录
  assetsDir: 'static',  // 静态资源存放目录


  // 如果想要其他的 webpack 配置，也可以在这里进行调整
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.mjs'],  // 加上 .mjs 格式
    },
  },
  // 配置开发服务器
  devServer: {
    historyApiFallback: true,  // 启用历史模式时，避免刷新页面出现 404 错误
  },
})

module.exports = {
  transpileDependencies: ['vuex-persist'],

  //   publicPath: process.env.NODE_ENV === 'production' ? '/my-app/' : '/',
  //   devServer: {
  //     historyApiFallback: true,

  devServer: {
    port: process.env.VUE_APP_PORT || 3000
    // proxy: {
    //   // '^/': {
    //   //   target: 'http://localhost:8080',
    //   //   changeOrigin: true
    //   // },
    //   '/oauth2.0': {
    //     target: 'https://nid.naver.com/',
    //     changeOrigin: true,
    //     logLevel: 'debug'
    //   },
    //   '/v1': {
    //     target: 'https://openapi.naver.com/',
    //     changeOrigin: true,
    //     logLevel: 'debug'
    //   }
    // }
  }
}

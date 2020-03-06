module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //引用时不需要../
        'components': '@/components',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
        'common': '@/common',
      }
    }
  }
}
// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var EVN = require('./evn')

var target = {}

if (EVN === 'test') {
  target.api1 = 'http://10.158.41.45:8090'; // 短信
  target.api2 = 'http://10.158.41.45:8094'; // 业务
  target.api3 = 'http://img01.iambuyer.com'; // 图片
} else if (EVN === 'localTest') {
  target.api1 = 'http://10.158.41.45:8090'; // 短信
  target.api2 = 'http://10.158.41.45:8094'; // 业务
  target.api3 = 'http://img01.iambuyer.com'; // 图片
} else {
  target.api1 = 'http://api.iambuyer.com'; // 短信
  target.api2 = 'http://api.ruhexiu.com'; // 业务
  target.api3 = 'http://img01.iambuyer.com'; // 图片
}
// 引入address
var address = require('address');

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    host: address.ip(), // 获取本地ip，can be overwritten by process.env.HOST
    port: 8085,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api3': {
        target: target.api3,
        changeOrigin: true,
        pathRewrite: {
          '^/api3': ''
        }
      },
      '/api1': {
        target: target.api1,
        changeOrigin: true,
        pathRewrite: {
          '^/api1': ''
        }
      },
      '/api2': {
          target: target.api2,
          changeOrigin: true,
          pathRewrite: {
            '^/api2': ''
          }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import MintUI from 'mint-ui';
import {api1, api2, api3, apiProd1, apiProd2, apiProd3, Rhxherf} from './api';
import store from './store';
import wxApi from '@/mixins/wxapi.js'; // 微信分享sdk
import {wxShareTimeline, wxShareAppMessage} from '@/mixins/WXShare.js'; // 微信分享到朋友圈和好友
import {shareCont} from '@/mixins/WXParams.js'; // 微信分享参数
// import wxConfig from './utils/wxConfig.js';
// import wxShare from './utils/wxShare.js';
import wxInnerShare from './utils/wxInnerShare.js';
import 'mint-ui/lib/style.css';
import './assets/scss/mint_reset.css';
import Cube from 'cube-ui';
const EVN = require('../config/evn');

Vue.use(Cube);
Vue.use(MintUI);
Vue.prototype.EVN = EVN; // 环境变量
Vue.prototype.apiProd1 = apiProd1; // 短信 生产环境使用
Vue.prototype.apiProd2 = apiProd2; // 业务 生产环境使用
Vue.prototype.apiProd3 = apiProd3; // 图片 生产环境使用
Vue.prototype.api1 = api1; // 短信
Vue.prototype.api2 = api2; // 业务
Vue.prototype.api3 = api3; // 图片
Vue.prototype.Rhxherf = Rhxherf; // 跳轉到如何修的地址
Vue.prototype.wxInnerShare = wxInnerShare;

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});
Vue.config.productionTip = false;

router.afterEach((to, from) => {
  // const ua = window.navigator.userAgent.toLowerCase();
  // if (window.__wxjs_is_wkwebview === true && to.path !== location.pathname) { // 解决ios跳转以后自定义分享失效，
  //   location.assign(to.fullPath);
  //   let url = window.location.href; // 此处不可使用location.replace
  //   if (!localStorage.getItem('initLink')) {
  //     localStorage.setItem('initLink', url);
  //   }
  // } else {
  //   let url = window.location.origin + to.fullPath;
  //   // let url = 'http://api.ruhexiu.com/rest-rp/wechat/portal/shareUrl'
  //   localStorage.setItem('initLink', url);
  // }
  let url = window.location.origin + to.fullPath;
  // let url = 'http://so.iambuyer.com/?from=singlemessage#/putInBusiness'
  // if (this.EVN === 'production') {
  //   url = 'http://so.iambuyer.com/#/' + to.fullPath;
  // }
  localStorage.setItem('initLink', url);
  // 全局配置转发分享
  function wxShareConfigure () {
    console.log(shareCont, '---------------------------shareCont---------------------');
    wxShareTimeline(shareCont);
    wxShareAppMessage(shareCont);
  }
  wxApi.wxRegister(wxShareConfigure); // 为你分享配置
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
   // mixins: [wxConfig],
  render: h => h(App)
  // template: '<App/>',
  // components: { App }
});

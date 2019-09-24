import wx from 'weixin-js-sdk';
import axios from 'axios';
import oauth from './oauth.js';
const queryString = require('querystring');

export default {
  data () {
    return {
      Vdata: ''
    };
  },
  created () {
    this.getSign();
    this.Vdata = JSON.parse(sessionStorage.getItem('SeJson'));
  },
  methods: {
    getSign () {
      var param = {
          // fullWXUrl: encodeURIComponent(location.href)
          fullWXUrl: location.href
        };
        // alert(param.fullWXUrl);
      axios.post(this.api2 + '/confirmation/wxsign', queryString.stringify(param)).then(res => {
        if (res && res.data) {
          console.log(res);
          var data = res.data.wxbrgeMap;
          wx.config({
            // debug: true,
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['hideAllNonBaseMenuItem', 'previewImage', 'chooseImage', 'showMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems']
          });
        } else {
          // console.log('微信签名响应数据有误');
        }
      }).catch(res => {
        // console.log('微信签名接口失败');
      });
    },
    shareAction () {
      var origin = location.origin;
      var title = '《泰康人寿保险客户入住养老社区确认函》申请';
      var link = oauth();
      var imgUrl = origin + '/emplanForAll/static/img/wxshare.png';
      var desc = '投保人' + this.Vdata.appName + '女士/先生，诚邀您进入申请页面，与泰康共享幸福生活！';
      wx.ready(function () {
        wx.hideMenuItems({
            menuList: ['menuItem:openWithSafari', 'menuItem:openWithQQBrowser',
                'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:QZone',
                'menuItem:share:email', 'menuItem:copyUrl'] // 要隐藏的菜单项，所有menu项见附录3
        });
        // share to 朋友圈
        wx.onMenuShareTimeline({
          title: title,
          link: link,
          imgUrl: imgUrl,
          success: function () {},
          cancel: function () {}
        });
        // share to 朋友
        wx.onMenuShareAppMessage({
          title: title,
          link: link,
          desc: desc,
          imgUrl: imgUrl,
          success: function () {},
          cancel: function () {}
        });
      });
    }
  }
};

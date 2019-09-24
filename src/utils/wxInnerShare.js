import wx from 'weixin-js-sdk';
import axios from 'axios';

const queryString = require('querystring');

function shareAction (isHide) {
  if (isHide) {
    wx.ready(function () {
      hiddenShare();
    });
    return;
  }
    var origin = location.origin;
    var title = '《泰康人寿保险客户入住养老社区确认函》申请';

    var param = sessionStorage.getItem('SeJson') ? JSON.parse(sessionStorage.getItem('SeJson')) : {openid: '', appName: ''};
    if (param.planType === '01') param.planType = '';
    delete param.openid;
    var desc = '投保人' + param.appName + '女士/先生，诚邀您进入申请页面，与泰康共享幸福生活！';
    param = queryString.stringify(param);
    var imgUrl = origin + '/emplanForAll/static/img/wxshare.png';
    wx.ready(function () {
      wx.hideMenuItems({
          menuList: ['menuItem:openWithSafari', 'menuItem:openWithQQBrowser',
              'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:QZone',
              'menuItem:share:email', 'menuItem:copyUrl'] // 要隐藏的菜单项，所有menu项见附录3
      });
      // share to 朋友圈
      wx.onMenuShareTimeline({
        title: title,
        link: origin + '/emplanForAll/blank?' + param,
        imgUrl: imgUrl,
        success: function () {},
        cancel: function () {}
      });
      // share to 朋友
      wx.onMenuShareAppMessage({
        title: title,
        link: origin + '/emplanForAll/blank?' + param,
        desc: desc,
        imgUrl: imgUrl,
        success: function () {},
        cancel: function () {}
      });
    });
  }
function hiddenShare () {
  wx.hideAllNonBaseMenuItem();
}
export default function getSign (api, flag, isShare) {
    var param = {
        // fullWXUrl: encodeURIComponent(location.origin + to.fullPath)
        fullWXUrl: location.href
      };
      // alert(param.fullWXUrl);
    axios.post(api + '/confirmation/wxsign', queryString.stringify(param)).then(res => {
      if (res && res.data) {
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
        if (isShare !== 'noAction') shareAction(flag);
      } else {
        // console.log('微信签名响应数据有误');
      }
    }).catch(res => {
      // console.log('微信签名接口失败');
    });
  };

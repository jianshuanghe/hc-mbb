import wxApi from './../mixins/wxapi.js'; // 微信分享sdk
import { Toast } from 'mint-ui';
/**
 * [wxShareTimeline 微信自定义分享到朋友圈]
 */
function wxShareTimeline (evn) {
  console.log(evn, '-----------------------evn--------------------------');
  let opstion1 = {
    title: evn.shareTitle, // 分享标题
    link: evn.shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: evn.shareImg, // 分享图标
    success: function () {
      Toast({
        message: '分享成功！',
        duration: 500
      });
      console.log('分享成功');
    },
    error: function () {
      console.log('分享失败');
    }
  };
  console.log(opstion1, '------------------opstion1------------------');
  // 将配置注入通用方法
  wxApi.ShareTimeline(opstion1);
}
function wxShareAppMessage (evn) {
  let opstion2 = {
    title: evn.shareTitle, // 分享标题
    desc: evn.shareIntro, // 分享描述
    link: evn.shareLink, // 分享链接
    imgUrl: evn.shareImg, // 分享图标
    success: function () {
      Toast({
        message: '分享成功！',
        duration: 500
      });
    },
    error: function () {
      console.log('分享失败');
    }
  };
  console.log(opstion2, '------------------opstion2------------------');
  // 将配置注入通用方法
  wxApi.ShareAppMessage(opstion2);
}

export {
  wxShareTimeline,
  wxShareAppMessage
};

import evn from '../../config/evn.js';
import wx from 'weixin-js-sdk';
import axios from 'axios';
const wxApi = {
    /**
     * [isweixin 判断是否微信浏览器]
     */
    isweixin () {
        const ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) === 'micromessenger') {
            return true;
        } else {
            this.$router.push({ path: '/wxkj/isnotWechat' });
            return false;
        }
    },
    /**
     * [wxRegister 微信Api初始化]
     * @param  {Function} callback [ready回调函数]
     */
    wxRegister (callback) {
        let api = 'http://cydweb.natapp1.cc';
        if (evn === 'production') {
          api = 'http://api.ruhexiu.com';
        };
        // 后台获取微信的签名等数据
        axios.get(api + '/rest-rp/wechat/portal/createJsapiSignature?url=' + localStorage.getItem('initLink')).then((response) => {
          console.log(response);
          if (response.data.ret === '200') {
            let res = response.data;
            wx.config({
              debug: false, // 开启调试模式
              appId: res.content.appId, // 必填，公众号的唯一标识
              timestamp: res.content.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.content.nonceStr, // 必填，生成签名的随机串
              signature: res.content.signature, // 必填，签名，见附录1
              jsApiList: [
                'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                'onMenuShareTimeline' // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
              ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
          } else {
            console.log('网络繁忙，请稍后');
          }
        }).catch((error) => {
          console.log(error, '网络繁忙，请稍后');
        });
        wx.ready(function () {
          // wx.hideMenuItems({
          //   menuList: [] // 要隐藏的菜单项，所有menu项见附录3
          // });// 如果需要定制ready回调方法
          if (callback) {
            callback();
          }
        });
    },
    /**
     * [ShareTimeline 微信分享到朋友圈]
     * @param {[type]} opstion [分享信息]
     * @param {[type]} success [成功回调]
     * @param {[type]} error   [失败回调]
     */
    ShareTimeline (opstion) {
        wx.onMenuShareTimeline({
            title: opstion.title, // 分享标题
            link: opstion.link, // 分享链接
            imgUrl: opstion.imgUrl, // 分享图标
            success () {
                // 用户成功分享后执行的回调函数
                opstion.success();
            },
            cancel () {
                // 用户取消分享后执行的回调函数
                opstion.error();
            }
        });
    },
    /**
     * [ShareAppMessage 微信分享给朋友]
     * @param {[type]} opstion [分享信息]
     * @param {[type]} success [成功回调]
     * @param {[type]} error   [失败回调]
     */
    ShareAppMessage (opstion) {
        wx.onMenuShareAppMessage({
            title: opstion.title, // 分享标题
            desc: opstion.desc, // 分享描述
            link: opstion.link, // 分享链接
            imgUrl: opstion.imgUrl, // 分享图标
            success () {
                // 用户成功分享后执行的回调函数
                opstion.success();
            },
            cancel () {
                // 用户取消分享后执行的回调函数
                opstion.error();
            }
        });
    }

};

export default wxApi;

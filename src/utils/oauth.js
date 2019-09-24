import evn from '../../config/evn.js';
import {base64encode} from './base64.js';

const queryString = require('querystring');
var param = JSON.parse(sessionStorage.getItem('SeJson'));
delete param.openid;
param = queryString.stringify(param);

export default function getOAuth () {
      var account;
      var testAccount = {
        appid: 'wxdbbe2c84a6e68304',
        middleWeb: 'wxpt-t.taikang.com',
        domain: 'seedshop-mss.mobile.taikang.com'
      };
      var proAccount = {
        appid: 'wx2f763d09aa9ca523',
        middleWeb: 'wxpt.taikang.com',
        // domain: 'seedshop.mobile.taikang.com'
        domain: 'seedshop.taikanglife.com'
      };

      if (evn === 'production') {
        account = proAccount;
      } else {
        account = testAccount;
      }
      var originUrl = 'http://' + account.domain + '/emplanForAll/?' + param;
      originUrl = base64encode(originUrl);

      var targetUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
      account.appid +
      '&redirect_uri=http://' +
      account.middleWeb +
      '/tkmap/wechat/oauth2/redirect/' +
      account.appid +
      '?other=' +
      originUrl +
      '&response_type=code&scope=snsapi_base&state=redict#wechat_redirect';

      return targetUrl;
    }

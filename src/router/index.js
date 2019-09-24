import Vue from 'vue';
import Router from 'vue-router';
import bindPhone from '@/components/landRegistration/bindPhone';
import landRegistration from '@/components/landRegistration/landRegistration';
import forgetPassWord from '@/components/landRegistration/forgetPassWord';
import agentRegistration from '@/components/landRegistration/agentRegistration';
import searchDetile from '@/components/business/findBusiness/findBusinessList/searchDetile/searchDetile';
import putInBusiness from '@/components/business/extendManage/extendManageList/putInBusiness/putInBusiness';
import bunesinessDetails from '@/components/business/extendManage/extendManageList/putInBusiness/putInBusinessList/bunesinessDetails/bunesinessDetails';
import dataReport from '@/components/business/extendManage/extendManageList/dataReport/dataReport';
import newsItemsList from '@/components/business/newsCenter/newCenterItems/newsItemsList/newsItemsList';
import personMaterial from '@/components/business/personCenter/personAndCompany/personMaterial/personMaterial';
import briefIntro from '@/components/business/personCenter/personAndCompany/personMaterial/materialItems/briefIntro';
import companyInfor from '@/components/business/personCenter/personAndCompany/companyInfor/companyInfor';
import companyInforEdit from '@/components/business/personCenter/personAndCompany/companyInfor/companyInforEdit';
import memberCenter from '@/components/business/personCenter/personAndCompany/memberCenter/memberCenter';
import buyMember from '@/components/business/personCenter/personAndCompany/memberCenter/memberCenterItems/buyMember/buyMember';
import accountCenter from '@/components/business/personCenter/personAndCompany/accountCenter/accountCenter';
import setUp from '@/components/business/personCenter/personAndCompany/setUp/setUp';
import removeBind from '@/components/business/personCenter/personAndCompany/setUp/removeBind';
import phoneBind from '@/components/business/personCenter/personAndCompany/setUp/phoneBind';
import aboutUs from '@/components/business/personCenter/personAndCompany/aboutUs/aboutUs';
import feedBack from '@/components/business/personCenter/personAndCompany/feedBack/feedBack';
import flowInlet from '@/pages/flowInlet';
import flowInletReal from '@/pages/flowInletReal';
import searchDetileFlowInlet from '@/components/flowInlet/searchDetile/searchDetileFlowInlet';
import PayResult from '@/pages/PayResult';
import home from '@/pages/home';
Vue.use(Router);

export default new Router({
  //  mode: 'history',
  // base: bases,
  routes: [
    {
      path: '/flowInlet',
      name: 'flowInlet',
      meta: {
        title: '陌拜商机'
      },
      component: flowInlet
    }, {
      path: '/flowInletReal',
      name: 'flowInletReal',
      meta: {
        title: '陌拜商机'
      },
      component: flowInletReal
    }, {
      path: '/searchDetileFlowInlet',
      name: 'searchDetileFlowInlet',
      meta: {
        title: '陌拜商机'
      },
      component: searchDetileFlowInlet
    }, {
      path: '/PayResult',
      name: 'PayResult',
      meta: {
        title: '支付结果'
      },
      component: PayResult
    }, {
      path: '/',
      name: 'home',
      meta: {
        title: '陌拜商机'
      },
      component: home
    }, {
      path: '/bindPhone',
      name: 'bindPhone',
      meta: {
        title: '立即绑定'
      },
      component: bindPhone
    }, {
      path: '/landRegistration',
      name: 'landRegistration',
      meta: {
        title: '登陆注册'
      },
      component: landRegistration
    }, {
      path: '/agentRegistration',
      name: 'agentRegistration',
      meta: {
        title: '陌拜商机'
      },
      component: agentRegistration
    }, {
      path: '/forgetPassWord',
      name: 'forgetPassWord',
      meta: {
        title: '忘记密码'
      },
      component: forgetPassWord
    }, {
      path: '/putInBusiness',
      name: 'putInBusiness',
      meta: {
        title: '投放商机'
      },
      component: putInBusiness
    }, {
      path: '/searchDetile',
      name: 'searchDetile',
      meta: {
        title: '发现商机'
      },
      component: searchDetile
    }, {
      path: '/bunesinessDetails',
      name: 'bunesinessDetails',
      meta: {
        title: '陌拜商机'
      },
      component: bunesinessDetails
    }, {
      path: '/dataReport',
      name: 'dataReport',
      meta: {
        title: '数据报表'
      },
      component: dataReport
    }, {
      path: '/newsItemsList',
      name: 'newsItemsList',
      meta: {
        title: '消息中心'
      },
      component: newsItemsList
    }, {
      path: '/personMaterial',
      name: 'personMaterial',
      meta: {
        title: '个人中心'
      },
      component: personMaterial
    }, {
      path: '/briefIntro',
      name: 'briefIntro',
      meta: {
        title: '个人中心'
      },
      component: briefIntro
    }, {
      path: '/companyInfor',
      name: 'companyInfor',
      meta: {
        title: '公司信息'
      },
      component: companyInfor
    }, {
      path: '/companyInforEdit',
      name: 'companyInforEdit',
      meta: {
        title: '公司信息'
      },
      component: companyInforEdit
    }, {
      path: '/memberCenter',
      name: 'memberCenter',
      meta: {
        title: '会员中心'
      },
      component: memberCenter
    }, {
      path: '/buyMember',
      name: 'buyMember',
      meta: {
        title: '购买会员'
      },
      component: buyMember
    }, {
      path: '/accountCenter',
      name: 'accountCenter',
      meta: {
        title: '账户中心'
      },
      component: accountCenter
    }, {
      path: '/setUp',
      name: 'setUp',
      meta: {
        title: '设置'
      },
      component: setUp
    }, {
      path: '/removeBind',
      name: 'removeBind',
      meta: {
        title: '设置'
      },
      component: removeBind
    }, {
      path: '/phoneBind',
      name: 'phoneBind',
      meta: {
        title: '手机绑定'
      },
      component: phoneBind
    }, {
      path: '/aboutUs',
      name: 'aboutUs',
      meta: {
        title: '关于我们'
      },
      component: aboutUs
    }, {
      path: '/feedBack',
      name: 'feedBack',
      meta: {
        title: '意见反馈'
      },
      component: feedBack
    }
  ]
});

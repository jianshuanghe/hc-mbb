/**
 * Created by caoziwen on 2017/12/28.
 */
const state = {
  loading: { // loading
    loadingShow: false,
    loadingText: '请稍等...'
  },
  empty: { // 空状态
    emptyShow: false,
    emptyText: '当前没有数据！'
  },
  leaveMessage: {
    show: false, // 是否展示留言
    doc: false, // 留言情况，如果用户留言成功为true
    isPostDoc: false, // 用户是否提交留言成功
    userId: 0, // 留言者的Id // 未登录状态为0
    instrucId: 0, // id
    mobile: '', // 电话
    userName: '', // 姓名
    msgContent: '' // 留言内容
  },
  tabClickItems: { // 切换tab
    clickItems: 1
  },
  uinfo: {}, // 微信签名等数据
  home: { // home 主页数据
    tabItems: 1
  },
  quickNav: { // 快捷导航
    quickNavShow: false // 控制快捷导航显示，默认为flse
  },
  flowInlet: { // 流量承载页列表数据
    pageList: [], // 首页数据
    search: { // 搜索
      searchText: '', // 搜索内容
      isSearch: false, // 判断用户时候处于搜索状态
      searchItemsNum: 0, // 搜索到数据的条数
      pageNum: 0, // 总页数
      searchCondition: {  // 分页属性
      },
      searchData: [], // search数据
      searchHistoryData: [] // 搜索历史数据
    }
  },
  findBusiness: { // 发现商机列表数据
    pageList: [], // 首页数据
    search: { // 搜索
      searchText: '', // 搜索内容
      isSearch: false, // 判断用户时候处于搜索状态
      searchItemsNum: 0, // 搜索到数据的条数
      pageNum: 0, // 总页数
      searchCondition: {  // 分页属性
      },
      searchData: [], // search数据
      searchHistoryData: [] // 搜索历史数据
    }
  },
  trendKanban: { // 数据看板和趋势切换获取的code
    kanBanText: '昨天',
    trendLeftText: '点击数',
    trendRightText: '总消耗',
    kanBanTime: 1, // 数据看板code
    trendLeft: '1', // 数据趋势left
    trendRight: '3' // 数据趋势right
  },
  putInBusiness: { // 投放商机
    pageNum: 0, // 总页数
    searchCondition: {  // 分页属性
    },
    putInBusinessData: [], // 接口返回数据
    putInBusinessShow: false, // 商机投放组件显示，默认为false
    instName: '', // 针对商机详情的title，动态变化
    instIds: '', // 数据报表表中参数，项目id参数，只针对数据表
    kanBanData: [], // 数据报表中看板数据
    dataReportItemsData: [] // 数据报表数据
  },
  newsCenter: { // 消息中西
    newsTitle: 1, // 切换消息类型 1默认系统通知，2业务消息
    system: { // 系统消息
      pageNum: 0, // 总页数系统消息
      searchCondition: {  // 分页属性系统通知
      },
      newsItemsData: [] // 系统消息数据
    },
    business: { // 业务消息
      pageNum1: 0, // 总页数业务消息
      searchCondition1: {  // 分页属性业务消息
      },
      newsItemsData1: [] // 业务消息数据
    }
  },
  personCenter: { // 个人中心
    personMaterial: [], // 个人资料
    personTitle: 1, // 切换基本信息 默认基本信息1 ， 资质认证2
    industry: { // 所属行业
      industryShow: false, // 所属行业组件控制
      industryData: [], // 所属行业数据
      industryCheck: { // 选择的所属行业
        compTypePcodeStr: '',
        compTypePcode: 0
      }
    },
    info: { // 地址信息
      addShow: false, // 显示地址组件
      idStringAddress: '', // 用户地址省市区和详细地址拼接
      idString: '', // 地址显示省市区
      addrPcode: '', // 省
      addrCcode: '', // 市
      addrAcode: '', // 区
      idaddress: '' // 详细地址
    },
    basicInfor: [], // 基本信息
    basicInforEdit: [], // 基本信息编辑
    qualificatCert: {}, // 资质认证
    qualificatCertEdit: {}// 资质认证编辑
  },
  memberCenter: { // 会员中心
    memberCenterData: [] // 会员信息全部首页拉取
  },
  accountCenter: { // 账户中心
    accountCenterTitle: 1, // 切换账户 默认账户概况1 ， 账户流水2
    dataRunWaterParams: {}, // 账户流水参数
    survey: { // 账户概况分页
      pageNum: 1, // 数据总页数
      num: 1 // 当前页数
    },
    runWater: { // 账户流水分页
      pageNum: 1, // 数据总页数
      num: 1 // 当前页数
    },
    runWaterTopData: [], // 账户流水顶部数据
    reportRunWaterData: [] // 流水报表数据
  },
  setUp: { // 设置
    setUpData: {} // 设置获取的数据
  },
  feedBack: { // 意见反馈
    feedBackTitle: 1, // 切换意见反馈 默认意见反馈1 ， 我的反馈2
    feedBackEdit: [], // 意见反馈编辑参数
    myOpinion: { // 我的反馈
      pageNum: 0, // 总页数系统消息
      searchCondition: {  // 分页属性系统通知
      },
      myOpinionData: [] // 我的反馈数据
    },
    findIndex: '', // 查看的Index全部
    isFindAll: false, // 展示全部
    isDelete: false // 是否操作删除按钮
  },
  imgData: { // 附件参数
    headImg: 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png', // 头像
    compLogo: 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png', // 公司logo
    wechatQrImg: 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png', // 二维码
    authQualImg: 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png', // 资质图片
    authLegalNum: 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png', // 法人身份证
    authEnclosureImg01: '', // 附件1
    authEnclosureImg02: '', // 附件2
    authEnclosureImg03: '', // 附件3
    img001: '', // 意见反馈附件1
    img002: '', // 意见反馈附件2
    img003: '', // 意见反馈附件3
    img004: '', // 意见反馈附件4
    img005: '' // 意见反馈附件5
  }
};
export default state;

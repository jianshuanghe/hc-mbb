var screenData = [
  {
    code: 1,
    text: '昨天'
  }, {
    code: 7,
    text: '近七日'
  }, {
    code: 30,
    text: '近30日'
  }, {
    code: '001',
    text: '自定义时间'
  }
];
var leftScreenData = [
  {
    code: '2',
    text: '点击数'
  }, {
    code: '0',
    text: '总消耗'
  }, {
    code: '1',
    text: '展示数'
  }, {
    code: '3',
    text: '点击率'
  }, {
    code: '4',
    text: '转化数'
  }, {
    code: '5',
    text: '转化率'
  }, {
    code: '6',
    text: '提交表单数'
  }, {
    code: '7',
    text: '拨打电话数'
  }, {
    code: '8',
    text: '进入关注我们页面'
  }, {
    code: '9',
    text: '点击自定义按钮数'
  }
];
var rightScreenData = [
  {
    code: '0',
    text: '总消耗'
  }, {
    code: '1',
    text: '展示数'
  }, {
    code: '2',
    text: '点击数'
  }, {
    code: '3',
    text: '点击率'
  }, {
    code: '4',
    text: '转化数'
  }, {
    code: '5',
    text: '转化率'
  }, {
    code: '6',
    text: '提交表单数'
  }, {
    code: '7',
    text: '拨打电话数'
  }, {
    code: '8',
    text: '进入关注我们页面'
  }, {
    code: '9',
    text: '点击自定义按钮数'
  }
];
// 投放商机筛选条件
var screenTermData1 = [
  {
    'code': 'consMoney',
    'vulue': '按照已消耗排序'
  },
  {
    'code': 'converCount',
    'vulue': '按照转化数排序'
  },
  {
    'code': 'clikeCount',
    'vulue': '按照点击数排序'
  },
  {
    'code': 'infoCount',
    'vulue': '按照展示数排序'
  },
  {
    'code': 'createTime',
    'vulue': '按照申请时间排序'
  }
];
var screenTermData2 = [
  {
    'code': '',
    'vulue': '全部'
  },
  {
    'code': '1',
    'vulue': 'banner'
  },
  {
    'code': '0',
    'vulue': '其它位置'
  }
];
var screenTermData3 = [
  {
    'code': '',
    'vulue': '全部'
  },
  {
    'code': '0',
    'vulue': '待审核'
  },
  {
    'code': '1',
    'vulue': '投放中'
  },
  {
    'code': '2',
    'vulue': '审核未通过'
  },
  {
    'code': '3',
    'vulue': '已暂停'
  }
];

var authType = [
  {
    code: '0',
    text: '企业'
  }, {
    code: '1',
    text: '个体工商户'
  }
];
var qualificationType = [
  {
    code: '0',
    text: '企业营业执照'
  }, {
    code: '1',
    text: '个体工商户营业执照'
  }
];
var runWaterData = [
  {
    code: 1,
    text: '昨天'
  }, {
    code: 7,
    text: '近七日'
  }, {
    code: 30,
    text: '近30日'
  }, {
    code: '001',
    text: '全部'
  }
];
export {screenData, leftScreenData, rightScreenData, screenTermData1, screenTermData2, screenTermData3, authType, qualificationType, runWaterData};

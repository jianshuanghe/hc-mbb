var header = {
        'id': '',
        'systemName': 'crss',
        'time': ''
        };
var policys = {
        'companyCode': '', // 分公司代码
        'policyCode': '', // 保单号
        'planType': '', // 计划类型
        'policyName': '', // 主险险种名称
        'insuredName': '', // 被保人姓名
        'periodPremium': '', // 期交保费
        'paymentPeriod': '' // 交费年期
};
var owner = {
        'communityId': '', // 入住社区
        'name': '', // 投保人姓名
        'sex': '', // 称谓
        'birthday': '', // 出生日期
        'certType': '', // 投保人证件类型
        'certNum': '', // 投保人证件号
        'mobile': '', // 投保人联系电话
        'nation': '01', // 民族
        'province': '', // 所在省
        'city': '', // 市
        'area': '', // 区
        'liveAddresss': '', // 投保人居住地址
        'identity': '001', // 投保人身份 就是属性
        'tedu': '', // 教育背景
        'wunit': '', // 投保工作单位
        'industry': '', // 投保人所在行业
        'workType': '', // 投保人单位性质
        'post': '', // 投保人职务名称
        'income': '', // 个人年收入
        'familyInCome': '', // 家庭年收入
        'zipCode': '', // 投保人邮编
        'email': '', // 投保人邮箱
        'maritalStatus': '', // 投保人婚姻状况
        'childNum': '', // 投保人子女数量
        'tmatebirth': '' // 投保人配偶生日
};
var father = {
        'name': '', // 父姓名
        'age': '', // 父年龄
        'phone': '', // 父联系电话
        'province': '', // 所在省
        'city': '', // 市
        'area': '', // 区
        'address': '', // 父地址
        'mail': '' // 父邮箱
};
var mother = {
        'name': '', // 母姓名
        'age': '', // 母年龄
        'phone': '', // 母联系电话
        'province': '', // 所在省
        'city': '', // 市
        'area': '', // 区
        'address': '', // 母地址
        'mail': '' // 母邮箱
};
var fatherMate = {
        'name': '', // 配偶父姓名
        'age': '', // 配偶父年龄
        'phone': '', // 配偶父联系电话
        'province': '', // 所在省
        'city': '', // 市
        'area': '', // 区
        'address': '', // 配偶父地址
        'mail': '' // 配偶父邮箱
};
var motherMate = {
        'name': '', // 配偶母姓名
        'age': '', // 配偶母年龄
        'phone': '', // 配偶母联系电话
        'province': '', // 所在省
        'city': '', // 市
        'area': '', // 区
        'address': '', // 配偶母地址
        'mail': '' // 配偶母邮箱
};
var community = {
        'parentCommunity': '', // 父母入住社区
        'parentHold': '', // 父母或配偶父母是否考虑入住
        'parentInTime': '', // 父母入住时间
        'parentInUnit': '', // 父母入住户型
        'parentCommunityMate': '', // 配偶父母入住社区
        'parentInTimeMate': '', // 配偶父母入住时间
        'parentInUnitMate': '', // 配偶父母入住户型
        'planAge': '', // 计划入住年龄
        'planUnit': '', // 计划入住户型
        'planArea': '', // 计划入住面积
        'vocationFlag': '', // 是否有异地度假
        'vofrequency': '', // 异地度假养老频率
        'vopalce': '', // 异地度假养老地点
        'votimespan': '' // 异地度假养老时长
};
var agent = {
        'agentCode': '', // 代理人工号
        'agentName': '' // 代理人姓名
};
var confApplyDate = ''; // 申请书填写日期
var confRightsId = ''; // 确认函权益Id
var insureSignature = ''; // 投保人签名
var insuredSignature = ''; // 被保人签名
var faceImage = ''; // 人脸识别图像
// , confApplyDate, insureSignature, insuredSignature
export {header, policys, owner, father, mother, fatherMate, motherMate, community, agent, confApplyDate, confRightsId, insureSignature, insuredSignature, faceImage};

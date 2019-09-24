var tpolicys = '';
var towner = '';
var tother = '';
var tfather = '';
var tmother = '';
var tfatherMate = '';
var tmotherMate = '';
var tcommunity = '';
var textData = '';
var PlaceVal = '';
var PlaceOtherCity = '';
if (localStorage.getItem('policys')) {
        tpolicys = JSON.parse(localStorage.getItem('policys'));
};
if (localStorage.getItem('owner')) {
        towner = JSON.parse(localStorage.getItem('owner'));
};
if (localStorage.getItem('other')) {
        tother = JSON.parse(localStorage.getItem('other'));
};
if (localStorage.getItem('father')) {
        tfather = JSON.parse(localStorage.getItem('father'));
};
if (localStorage.getItem('mother')) {
        tmother = JSON.parse(localStorage.getItem('mother'));
};
if (localStorage.getItem('fatherMate')) {
        tfatherMate = JSON.parse(localStorage.getItem('fatherMate'));
};
if (localStorage.getItem('motherMate')) {
        tmotherMate = JSON.parse(localStorage.getItem('motherMate'));
};
if (localStorage.getItem('community')) {
        tcommunity = JSON.parse(localStorage.getItem('community'));
};
if (localStorage.getItem('textData')) {
        textData = JSON.parse(localStorage.getItem('textData'));
};
if (localStorage.getItem('PlaceVal')) {
        PlaceVal = localStorage.getItem('PlaceVal');
};
if (localStorage.getItem('PlaceOtherCity')) {
        PlaceOtherCity = JSON.parse(localStorage.getItem('PlaceOtherCity'));
};
var Mpolicys = {
        'companyCode': tpolicys.companyCode, // 分公司代码
        'policyCode': tpolicys.policyCode, // 保单号
        'planType': tpolicys.planType, // 计划类型
        'policyName': tpolicys.policyName, // 主险险种名称
        'insuredName': tpolicys.insuredName, // 被保人姓名
        'periodPremium': tpolicys.periodPremium, // 期交保费
        'paymentPeriod': tpolicys.paymentPeriod // 交费年期
};
var insuredPersonTel = tother.insuredMobile; // 被保人联系电话
var Mowner = {
        'communityId': textData.tcommunityIdText, // 入住社区
        'name': towner.name, // 投保人姓名
        'sex': towner.sex, // 称谓
        'birthday': towner.birthday, // 出生日期
        'certType': textData.tcertTypeText, // 投保人证件类型
        'certNum': towner.certNum, // 投保人证件号
        'mobile': towner.mobile, // 投保人联系电话
        'nation': textData.tNationText, // 民族
        'threeDeepAddress': textData.threeDeepAddress, // 所在省份城市
        'liveAddresss': towner.liveAddresss, // 投保人居住地址
        'identity': textData.tIdentityText, // 投保人身份 就是属性
        'tedu': textData.teduText, // 教育背景
        'wunit': towner.wunit, // 投保工作单位
        'industry': textData.tindustryText, // 投保人所在行业
        'workType': textData.tworkTypeText, // 投保人单位性质
        'post': towner.post, // 投保人职务名称
        'income': textData.tincomeText, // 个人年收入
        'familyInCome': textData.tfamilyInComeText, // 家庭年收入
        'zipCode': towner.zipCode, // 投保人邮编
        'email': towner.email, // 投保人邮箱
        'maritalStatus': textData.tmaritalStatusText, // 投保人婚姻状况
        'childNum': textData.tchildNumText, // 投保人子女数量
        'tmatebirth': towner.tmatebirth // 投保人配偶生日
};
var Mfather = {
        'name': tfather.name, // 父姓名
        'age': tfather.age, // 父年龄
        'phone': tfather.phone, // 父联系电话
        'province': tfather.province, // 所在省
        'city': tfather.city, // 市
        'area': tfather.area, // 区
        'address': tfather.address, // 父地址
        'mail': tfather.mail // 父邮箱
};
var Mmother = {
        'name': tmother.name, // 母姓名
        'age': tmother.age, // 母年龄
        'phone': tmother.phone, // 母联系电话
        'province': tmother.province, // 所在省
        'city': tmother.city, // 市
        'area': tmother.area, // 区
        'address': tmother.address, // 母地址
        'mail': tmother.mail // 母邮箱
};
var MfatherMate = {
        'name': tfatherMate.name, // 配偶父姓名
        'age': tfatherMate.age, // 配偶父年龄
        'phone': tfatherMate.phone, // 配偶父联系电话
        'province': tfatherMate.province, // 所在省
        'city': tfatherMate.city, // 市
        'area': tfatherMate.area, // 区
        'address': tfatherMate.address, // 配偶父地址
        'mail': tfatherMate.mail // 配偶父邮箱
};
var MmotherMate = {
        'name': tmotherMate.name, // 配偶母姓名
        'age': tmotherMate.age, // 配偶母年龄
        'phone': tmotherMate.phone, // 配偶母联系电话
        'province': tmotherMate.province, // 所在省
        'city': tmotherMate.city, // 市
        'area': tmotherMate.area, // 区
        'address': tmotherMate.address, // 配偶母地址
        'mail': tmotherMate.mail // 配偶母邮箱
};
var MPlaceOtherCity = PlaceOtherCity; // 异地度假养老地点(其他城市填写)
var MPlaceVal = PlaceVal; // 异地度假养老地点(城市选择)
var Mcommunity = {
        'parentCommunity': textData.tparentCommunityText, // 父母入住社区
        'parentHold': textData.tparentsInCom, // 父母或配偶父母是否考虑入住
        'parentInTime': textData.tparentInTimeText, // 父母入住时间
        'parentInUnit': textData.tparentCommunityText, // 父母入住户型
        'parentCommunityMate': textData.tparentCommunityMateText, // 配偶父母入住社区
        'parentInTimeMate': textData.tparentInTimeMateText, // 配偶父母入住时间
        'parentInUnitMate': textData.tparentCommunityMateText, // 配偶父母入住户型
        'planAge': textData.tplanAgeText, // 计划入住年龄
        'planUnit': textData.tplanUnitText, // 计划入住户型
        'planArea': textData.tplanAreaText, // 计划入住面积
        'vocationFlag': textData.tchooseCommunity, // 是否有异地度假
        'vofrequency': textData.tvofrequencyText, // 异地度假养老频率
        'vopalce': tcommunity.vopalce, // 异地度假养老地点
        'votimespan': textData.tvotimespanText // 异地度假养老时长
};
export {Mpolicys, insuredPersonTel, Mowner, Mfather, Mmother, MfatherMate, MmotherMate, Mcommunity, MPlaceOtherCity, MPlaceVal};

/**
 * Created by caoziwen on 2018/05/26.
 */

const mutations = {
  setLoadingShow (state, info) {
    console.log(info, 'setLoadingShow');
    state.loading.loadingShow = info;
  },
  setEmptyShow (state, info) {
    console.log(info, 'setEmptyShow');
    state.empty.emptyShow = info;
  },
  setLeaveMessageShow (state, info) {
    console.log(info, 'setLeaveMessageShow');
    state.leaveMessage.show = info;
  },
  setLeaveMessageDoc (state, info) {
    console.log(info, 'setLeaveMessageDoc');
    state.leaveMessage.doc = info;
  },
  setLeaveMessageIsPostDoc (state, info) {
    console.log(info, 'setLeaveMessageIsPostDoc');
    state.leaveMessage.isPostDoc = info;
  },
  setLeaveMessageInstrucId (state, info) {
    console.log(info, 'setLeaveMessageInstrucId');
    state.leaveMessage.instrucId = info;
  },
  setLeaveMessageUserId (state, info) {
    console.log(info, 'setLeaveMessageUserId');
    state.leaveMessage.userId = info;
  },
  setLeaveMessageMobile (state, info) {
    console.log(info, 'setLeaveMessageMobile');
    state.leaveMessage.mobile = info;
  },
  setLeaveMessageUserName (state, info) {
    console.log(info, 'setLeaveMessageUserName');
    state.leaveMessage.userName = info;
  },
  setLeaveMessageMsgContent (state, info) {
    console.log(info, 'setLeaveMessageMsgContent');
    state.leaveMessage.msgContent = info;
  },
  setClickItems (state, info) {
    console.log(info, 'setClickItems');
    state.tabClickItems.clickItems = info;
  },
  setLoadingText (state, info) {
    console.log(info, 'setLoadingText');
    state.loading.loadingText = info;
  },
  setFlowInlet (state, info) {
    console.log(info, 'setFlowInlet');
    state.flowInlet.pageList = info;
  },
  setFlowInletSearchText (state, info) {
    console.log(info, 'setFlowInletSearchText');
    state.flowInlet.search.searchText = info;
  },
  setFlowInletIsSearch (state, info) {
    console.log(info, 'setFlowInletIsSearch');
    state.flowInlet.search.isSearch = info;
  },
  setFlowInletSearchItemsNum (state, info) {
    console.log(info, 'setFlowInletSearchItemsNum');
    state.flowInlet.search.searchItemsNum = info;
  },
  setFlowInletPageNum (state, info) {
    console.log(info, 'setFlowInletPageNum');
    state.flowInlet.search.pageNum = info;
  },
  setFlowInletSearchCondition (state, info) {
    console.log(info, 'setFlowInletSearchCondition');
    state.flowInlet.search.searchCondition = info;
  },
  setFlowInletSearchData (state, info) {
    console.log(info, 'setFlowInletSearchData');
    info.map((items, index) => {
      if (items.typeNames) {
        items.typeNames = items.typeNames.split(',');
      }
    });
    state.flowInlet.search.searchData = info;
  },
  setFlowInletSearchHistoryData (state, info) {
    console.log(info, 'setFlowInletSearchHistoryData');
    state.flowInlet.search.searchHistoryData = info;
  },
  setFindBusiness (state, info) {
    console.log(info, 'setFindBusiness');
    state.findBusiness.pageList = info;
  },
  setFindBusinessSearchText (state, info) {
    console.log(info, 'setFindBusinessSearchText');
    state.findBusiness.search.searchText = info;
  },
  setFindBusinessIsSearch (state, info) {
    console.log(info, 'setFindBusinessIsSearch');
    state.findBusiness.search.isSearch = info;
  },
  setFindBusinessSearchItemsNum (state, info) {
    console.log(info, 'setFindBusinessSearchItemsNum');
    state.findBusiness.search.searchItemsNum = info;
  },
  setFindBusinessPageNum (state, info) {
    console.log(info, 'setFindBusinessPageNum');
    state.findBusiness.search.pageNum = info;
  },
  setFindBusinessSearchCondition (state, info) {
    console.log(info, 'setFindBusinessSearchCondition');
    state.findBusiness.search.searchCondition = info;
  },
  setFindBusinessSearchData (state, info) {
    console.log(info, 'setFindBusinessSearchData');
    info.map((items, index) => {
      if (items.typeNames) {
        items.typeNames = items.typeNames.split(',');
      }
    });
    console.log(info, '重置');
    state.findBusiness.search.searchData = info;
  },
  setFindBusinessSearchHistoryData (state, info) {
    console.log(info, 'setFindBusinessSearchHistoryData');
    state.findBusiness.search.searchHistoryData = info;
  },
  setHome (state, info) {
    console.log(info, 'setHome');
    state.home.tabItems = info;
  },
  setQuickNavShow (state, info) {
    console.log(info, 'setQuickNavShow');
    state.quickNav.quickNavShow = info;
  },
  setTrendKan (state, info) {
    console.log(info, 'setTrendKan');
    state.trendKanban = info;
  },
  setPutInBusiness (state, info) {
    console.log(info, 'setPutInBusiness');
    state.putInBusiness.putInBusinessData = info;
  },
  setPutInBusinesSsearch (state, info) {
    console.log(info, 'setPutInBusinesSsearch');
    state.putInBusiness.searchCondition = info;
  },
  setPutBusinessPageNum (state, info) {
    console.log(info, 'setPutBusinessPageNum');
    state.putInBusiness.pageNum = info;
  },
  setPutInBusinessShow (state, info) {
    console.log(info, 'setPutInBusinessShow');
    state.putInBusiness.putInBusinessShow = info;
  },
  setDataReportItemsData (state, info) {
    console.log(info, 'setDataReportItemsData');
    state.putInBusiness.dataReportItemsData = info;
  },
  setInstName (state, info) {
    console.log(info, 'setInstName');
    state.putInBusiness.instName = info;
  },
  setInstIds (state, info) {
    console.log(info, 'setInstIds');
    state.putInBusiness.instIds = info;
  },
  setKanBanData (state, info) {
    console.log(info, 'setKanBanData');
    state.putInBusiness.kanBanData = info;
  },
  setNewsTitle (state, info) {
    console.log(info, 'setNewsTitle');
    state.newsCenter.newsTitle = info;
  },
  setNewsCenterSearch (state, info) {
    console.log(info, 'setNewsCenterSearch');
    state.newsCenter.system.searchCondition = info;
  },
  setNewsCenterPageNum (state, info) {
    console.log(info, 'setNewsCenterPageNum');
    state.newsCenter.system.pageNum = info;
  },
  setNewsCenterNewsItemsData (state, info) {
    console.log(info, 'setNewsCenterNewsItemsData');
    state.newsCenter.system.newsItemsData = info;
  },
  setNewsCenterSearch1 (state, info) {
    console.log(info, 'setNewsCenterSearch1');
    state.newsCenter.business.searchCondition1 = info;
  },
  setNewsCenterPageNum1 (state, info) {
    console.log(info, 'setNewsCenterPageNum1');
    state.newsCenter.business.pageNum = info;
  },
  setNewsCenterNewsItemsData1 (state, info) {
    console.log(info, 'setNewsCenterNewsItemsData1');
    state.newsCenter.business.newsItemsData1 = info;
  },
  setPersonTitle (state, info) {
    console.log(info, 'setPersonTitle');
    state.personCenter.personTitle = info;
  },
  setIndustryShow (state, info) {
    console.log(info, 'setIndustryShow');
    state.personCenter.industry.industryShow = info;
  },
  setIndustryData (state, info) {
    console.log(info, 'setIndustryData');
    state.personCenter.industry.industryData = info;
  },
  setIndustryCheck (state, info) {
    console.log(info, 'setIndustryCheck');
    state.personCenter.industry.industryCheck = info;
  },
  setPersonMaterial (state, info) {
    console.log(info, 'setPersonMaterial');
    state.personCenter.personMaterial = info;
  },
  setBasicInfor (state, info) {
    console.log(info, 'setBasicInfor');
    state.personCenter.basicInfor = info;
  },
  setQualificatCert (state, info) {
    console.log(info, 'setQualificatCert');
    state.personCenter.qualificatCert = info;
  },
  setBasicInforEdit (state, info) {
    console.log(info, 'setBasicInforEdit');
    state.personCenter.basicInforEdit = info;
  },
  setAddShow (state, info) {
    console.log(info, 'setAddShow');
    state.personCenter.info.addShow = info;
  },
  setIdStringAddress (state, info) {
    console.log(info, 'setIdStringAddress');
    state.personCenter.info.idStringAddress = info;
  },
  setIdString (state, info) {
    console.log(info, 'setIdString');
    state.personCenter.info.idString = info;
  },
  setAddrPcode (state, info) {
    console.log(info, 'setAddrPcode');
    state.personCenter.info.addrPcode = info;
  },
  setAddrCcode (state, info) {
    console.log(info, 'setAddrCcode');
    state.personCenter.info.addrCcode = info;
  },
  setAddrAcode (state, info) {
    console.log(info, 'setAddrAcode');
    state.personCenter.info.addrAcode = info;
  },
  setIdAddress (state, info) {
    console.log(info, 'setIdAddress');
    state.personCenter.info.idaddress = info;
  },
  setQualificatCertEdit (state, info) {
    console.log(info, 'setQualificatCertEdit');
    state.personCenter.qualificatCertEdit = info;
  },
  setHeadImg (state, info) {
    console.log(info, 'setHeadImg');
    state.imgData.headImg = info;
  },
  setCompLogo (state, info) {
    console.log(info, 'setCompLogo');
    state.imgData.compLogo = info;
  },
  setWechatQrImg (state, info) {
    console.log(info, 'setWechatQrImg');
    state.imgData.wechatQrImg = info;
  },
  setAuthQualImg (state, info) {
    console.log(info, 'setAuthQualImg');
    state.imgData.authQualImg = info;
  },
  setAuthLegalNum (state, info) {
    console.log(info, 'setAuthLegalNum');
    state.imgData.authLegalNum = info;
  },
  setAuthEnclosureImg01 (state, info) {
    console.log(info, 'setAuthEnclosureImg01');
    state.imgData.authEnclosureImg01 = info;
  },
  setAuthEnclosureImg02 (state, info) {
    console.log(info, 'setAuthEnclosureImg02');
    state.imgData.authEnclosureImg02 = info;
  },
  setAuthEnclosureImg03 (state, info) {
    console.log(info, 'setAuthEnclosureImg03');
    state.imgData.authEnclosureImg03 = info;
  },
  setImg001 (state, info) {
    console.log(info, 'setImg001');
    state.imgData.img001 = info;
  },
  setImg002 (state, info) {
    console.log(info, 'setImg002');
    state.imgData.img002 = info;
  },
  setImg003 (state, info) {
    console.log(info, 'setImg003');
    state.imgData.img003 = info;
  },
  setImg004 (state, info) {
    console.log(info, 'setImg004');
    state.imgData.img004 = info;
  },
  setImg005 (state, info) {
    console.log(info, 'setImg005');
    state.imgData.img005 = info;
  },
  setMemberCenterData (state, info) {
    console.log(info, 'setMemberCenterData');
    state.memberCenter.memberCenterData = info;
  },
  setAccountCenterTitle (state, info) {
    console.log(info, 'setAccountCenterTitle');
    state.accountCenter.accountCenterTitle = info;
  },
  setDataRunWaterParams (state, info) {
    console.log(info, 'setDataRunWaterParams');
    state.accountCenter.dataRunWaterParams = info;
  },
  setSurveyPageNum (state, info) {
    console.log(info, 'setSurveyPageNum');
    state.accountCenter.survey.pageNum = info;
  },
  setSurveyNum (state, info) {
    console.log(info, 'setSurveyNum');
    state.accountCenter.survey.num = info;
  },
  setRunWaterPageNum (state, info) {
    console.log(info, 'setRunWaterPageNum');
    state.accountCenter.runWater.pageNum = info;
  },
  setRunWaterNum (state, info) {
    console.log(info, 'setRunWaterNum');
    state.accountCenter.runWater.num = info;
  },
  setRunWaterTopData (state, info) {
    console.log(info, 'setRunWaterTopData');
    state.accountCenter.runWaterTopData = info;
  },
  setReportRunWaterData (state, info) {
    console.log(info, 'setReportRunWaterData');
    state.accountCenter.reportRunWaterData = info;
  },
  setSetUpData (state, info) {
    console.log(info, 'setSetUpData');
    state.setUp.setUpData = info;
  },
  setFeedBackTitle (state, info) {
    console.log(info, 'setFeedBackTitle');
    state.feedBack.feedBackTitle = info;
  },
  setFeedBackEdit (state, info) {
    console.log(info, 'setFeedBackEdit');
    state.feedBack.feedBackEdit = info;
  },
  setFeedBackSearch (state, info) {
    console.log(info, 'setFeedBackSearch');
    state.feedBack.myOpinion.searchCondition = info;
  },
  setFeedBackPageNum (state, info) {
    console.log(info, 'setFeedBackPageNum');
    state.feedBack.myOpinion.pageNum = info;
  },
  setFeedBackItemsData (state, info) {
    console.log(info, 'setFeedBackItemsData');
    state.feedBack.myOpinion.myOpinionData = info;
  },
  setFindIndex (state, info) {
    console.log(info, 'setFindIndex');
    state.feedBack.findIndex = info;
  },
  setIsDelete (state, info) {
    console.log(info, 'setIsDelete');
    state.feedBack.isDelete = info;
  },
  setIsFindAll (state, info) {
    console.log(info, 'setIsFindAll');
    state.feedBack.isFindAll = info;
  }
};
export default mutations;

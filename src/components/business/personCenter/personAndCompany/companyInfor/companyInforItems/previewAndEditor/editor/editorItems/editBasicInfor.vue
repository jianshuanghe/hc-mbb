<template>
  <div class="editBasicInfor-content">
    <div class="editBasicInfor">
      <div class="editBasicInfor-box">
        <!--logo 名称-->
        <div class="MI-box M-Bttom">
          <div class="MI-items">
            <div class="MI-left-EBI left">
              <img :src="xing" alt="" class="img">
              <p class="">企业logo</p>
            </div>
            <div class="MI-right right">
              <div class="right-Box-MI">
                <div class="img-MI left"  @touchstart="goTouchStart('faRen', UserData.compLogo)" @touchmove="goTouchMove('faRen')" @touchend="goTouchend('faRen')">
                  <cube-upload
                    ref="upload"
                    v-model="files"
                    :action="action"
                    :processFile="processFile"
                    @files-added="addedHandler"
                    @file-error="errHandler"
                    @file-success="sucHandlerLogo">
                    <div class="clear-fix touxiang">
                      <!--<cube-upload-file class='imgTou'v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>-->
                      <cube-upload-btn :multiple="false">
                        <div>
                          <p class="imgKongText" v-if="!UserData.compLogo">点击上传</p>
                          <img :src="UserData.compLogo" alt="" class="imgTouXiang right"  v-else>
                        </div>
                      </cube-upload-btn>
                    </div>
                  </cube-upload>
                  <!--<img :src="touxiang" alt="" class="right">-->
                </div>
                <div class="arrow-img-MI left">
                  <img :src="lineRightArrow" alt="" class="right">
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="line"></div>
          </div>
          <div class="MI-items">
            <div class="MI-left-EBI left">
              <img :src="xing" alt="" class="img">
              <p class="">企业名称</p>
            </div>
            <div class="MI-right right">
              <div class="right-Box-MI">
                <div class="img-MI EBI-img-MI left">
                  <input type="text" maxlength="18" v-model="UserData.companyName" name="lname" class="perInfoItemR" placeholder="点击填写"/>
                  <!--<input class="" type="text" minlength="2" maxlength="20" v-model="" placeholder="嘿，姓名会显示在说明书的海报二维码中哦">-->
                </div>
                <div class="arrow-img-MI left">
                  <!--<img :src="lineRightArrow" alt="" class="right">-->
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="line"></div>
          </div>
        </div>
        <!--简介-->
        <div class="EBI-textArea M-Bttom">
          <div class="MI-left-EBI left">
            <p class="">企业简介</p>
          </div>
          <div class="textAarea-box">
            <x-textarea class="introduce2" v-model="UserData.companyIntro" :max="300" placeholder="请简单描述您的企业" :rows="8" :cols="30"></x-textarea>
          </div>
        </div>
        <!--行业 地址 二维码-->
        <div class="MI-box">
          <div class="MI-items">
            <div class="MI-left-EBI left">
              <img :src="xing" alt="" class="img">
              <p class="">所属行业</p>
            </div>
            <div class="MI-right right">
              <div class="right-Box-MI" @click="clickIndustry">
                <div class="img-MI left">
                  <p :class="industryDataCkeck.compTypePcodeStr ? 'intro-MI2' : 'intro-MI'">{{industryDataCkeck.compTypePcodeStr || '点击选择'}}</p>
                </div>
                <div class="arrow-img-MI left">
                  <img :src="lineRightArrow" alt="" class="right">
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="line"></div>
          </div>
          <div class="MI-items">
            <div class="MI-left-EBI left">
              <img :src="xing" alt="" class="img">
              <p class="">联系地址</p>
            </div>
            <div class="MI-right right">
              <div class="right-Box-MI" @click="clickAddress">
                <div class="img-MI left">
                  <p :class="addressDetail ? 'intro-MI2' : 'intro-MI'">{{addressDetail || '点击选择'}}</p>
                </div>
                <div class="arrow-img-MI left">
                  <img :src="lineRightArrow" alt="" class="right">
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="line"></div>
          </div>
          <div class="MI-items">
            <div class="MI-left-EBI left">
              <p class="">微信公众号二维码</p>
            </div>
            <div class="MI-right right">
              <div class="right-Box-MI">
                <div class="img-MI left"  @touchstart="goTouchStart('faRen', UserData.wechatQrImg)" @touchmove="goTouchMove('faRen')" @touchend="goTouchend('faRen')">
                  <cube-upload
                    ref="upload"
                    v-model="files2"
                    :action="action"
                    :processFile="processFile"
                    @files-added="addedHandler"
                    @file-error="errHandler"
                    @file-success="sucHandlerQrImg">
                    <div class="clear-fix touxiang">
                      <!--<cube-upload-file class='imgTou'v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>-->
                      <cube-upload-btn :multiple="false">
                        <div>
                          <p class="imgKongText" v-if="!UserData.wechatQrImg">点击上传</p>
                          <img :src="UserData.wechatQrImg" alt="" class="imgTouXiang right" v-else>
                        </div>
                      </cube-upload-btn>
                    </div>
                  </cube-upload>
                  <!--<p class="intro-MI">点击上传</p>-->
                </div>
                <div class="arrow-img-MI left">
                  <img :src="lineRightArrow" alt="" class="right">
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="line"></div>
          </div>
        </div>
        <!--提示-->
        <div class="topTips">
          <p class="T-left">上传官方微信公众号二维码，方便更多用户关注您</p>
        </div>
        <!--电话 邮箱-->
        <div class="MI-box M-Bttom">
          <div class="MI-items">
            <div class="MI-left-EBI left">
              <img :src="xing" alt="" class="img">
              <p class="">联系人</p>
            </div>
            <div class="MI-right right">
              <div class="right-Box-MI">
                <div class="img-MI EBI-img-MI left">
                  <input type="text"v-model="UserData.contactMan"  name="lname" class="perInfoItemR" placeholder="点击填写"/>
                  <!--<input class="" type="text" minlength="2" maxlength="20" v-model="" placeholder="嘿，姓名会显示在说明书的海报二维码中哦">-->
                </div>
                <div class="arrow-img-MI left">
                  <!--<img :src="lineRightArrow" alt="" class="right">-->
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="line"></div>
          </div>
          <div class="MI-items">
            <div class="MI-left-EBI left">
              <img :src="xing" alt="" class="img">
              <p class="">联系电话</p>
            </div>
            <div class="MI-right right">
              <div class="right-Box-MI">
                <div class="img-MI EBI-img-MI left">
                  <input type="text" v-model="UserData.contactTelphone" name="lname" class="perInfoItemR" placeholder="点击填写"/>
                  <!--<input class="" type="text" minlength="2" maxlength="20" v-model="" placeholder="嘿，姓名会显示在说明书的海报二维码中哦">-->
                </div>
                <div class="arrow-img-MI left">
                  <!--<img :src="lineRightArrow" alt="" class="right">-->
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="line"></div>
          </div>
          <div class="MI-items">
            <div class="MI-left-EBI left">
              <p class="">联系邮箱</p>
            </div>
            <div class="MI-right right">
              <div class="right-Box-MI">
                <div class="img-MI EBI-img-MI left">
                  <input type="text" v-model="UserData.contactEmail"name="lname" class="perInfoItemR" placeholder="点击填写"/>
                  <!--<input class="" type="text" minlength="2" maxlength="20" v-model="" placeholder="嘿，姓名会显示在说明书的海报二维码中哦">-->
                </div>
                <div class="arrow-img-MI left">
                  <!--<img :src="lineRightArrow" alt="" class="right">-->
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="line"></div>
          </div>
        </div>
      </div>

    </div>
    <div class="BIF-bottom">
      <div class="BIF-btn" @click="clickSaveBasicInfor">
        <p class="">保存</p>
      </div>
    </div>
    <!--行业组件-->
    <industry v-if="industryShow"></industry>
    <!--图片预览组件-->
    <previewImg :previewImgSrc="ImgSrc"  @sendValueToParent = "getValueFromChild"v-if="previewImgShow"></previewImg>
  </div>
</template>

<script>
  import touXiang from '@/assets/images/business/home/extendManageList/touxiang.png';
  import lineRightArrow from '@/assets/images/common/line-right-arrow.png';
  import xing from '@/assets/images/common/xing.png';
  import industry from './industryAddress/industry';
  import previewImg from './../../../../../../../../common/previewImg';
  import { XTextarea } from 'vux';
  import { mapMutations, mapGetters } from 'vuex';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  import lrz from 'lrz';
  export default {
    name: 'editBasicInfor',
    components: {
      previewImg,
      industry,
      XTextarea
    },
    data () {
      return {
        text: '',
        touxiang: '',
        touxiang1: touXiang,
        lineRightArrow: lineRightArrow,
        xing: xing,
        timeOutEvent: 0,
        previewImgShow: false, // 预览组件显示，默认为false
        ImgSrc: '', // 预览图片路径参数
        action: 'http://img01.iambuyer.com/imgup/upLoad/fileUpload',
        files: [],
        files2: [],
        industryShow: false,
        addressDetail: '',
        idStringAddress: '',
        addrPcode: '', // 省
        addrCcode: '', // 市
        addrAcode: '', // 区
        industryDataCkeck: { // 所属行业
          compTypePcodeStr: '',
          compTypePcode: 0
        },
        UserData: {},
        imgData: {}
      };
    },
    created () {
      if (this.EVN === 'production') {
        axios.defaults.baseURL = this.apiProd2;
      }
      this.getUserData();
      this.$store.commit('setAddShow', false); // 更新vuex setAddShow
    },
    computed: {
      ...mapGetters(['PERSONCENTER', 'IMGDATA'])
    },
    watch: {
      PERSONCENTER: {
        handler (a, b) {
          this.UserData = a.basicInforEdit; // 基本信息
          this.addressDetail = a.info.idStringAddress;
          this.industryShow = a.industry.industryShow;
          this.industryDataCkeck = a.industry.industryCheck; // 所属会员
          this.addrPcode = a.info.addrPcode; // 省
          this.addrCcode = a.info.addrCcode; // 市
          this.addrAcode = a.info.addrAcode; // 区
        },
        deep: true
      },
      IMGDATA: {
        handler (a, b) {
          this.imgData = a; // 附件信息
        },
        deep: true
      }
    },
    mounted () {},
    methods: {
      ...mapMutations({
        setAddShow: 'setAddShow',
        setIdStringAddress: 'setIdStringAddress',
        setIdString: 'setIdString',
        setAddrPcode: 'setAddrPcode',
        setAddrCcode: 'setAddrCcode',
        setAddrAcode: 'setAddrAcode',
        setIdAddress: 'setIdAddress',
        setLoadingShow: 'setLoadingShow',
        setLoadingText: 'setLoadingText',
        setIndustryShow: 'setIndustryShow',
        setIndustryData: 'setIndustryData',
        setIndustryCheck: 'setIndustryCheck',
        setBasicInforEdit: 'setBasicInforEdit',
        setCompLogo: 'setCompLogo',
        setWechatQrImg: 'setWechatQrImg'
      }),
      goToBriefIntro () {
        console.log('to个人介绍');
        this.$router.push({
          path: '/briefIntro',
          query: { }
        });
      },
      clickAddress () {
        console.log('to地址选择');
        this.$store.commit('setAddShow', true); // 更新vuex setAddShow
      },
      clickIndustry () {
        console.log('触发所属行业按钮');
        this.$store.commit('setIndustryShow', true); // 更新vuex setIndustry
      },
      getUserData () {
        console.log('获取用户信息，全部');
        this.$store.commit('setLoadingShow', true); // 更新vuex loading
        let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
        console.log(landRegistLG.user.id);
        axios.get(this.api2 + '/rest-rp/user/' + landRegistLG.user.id).then((response) => {
          console.log(response);
          if (response.data.ret === '200') {
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            this.$store.commit('setBasicInforEdit', response.data.content); // 更新vuex loading
            let industryDataCkeck = {
              compTypePcodeStr: response.data.content.compTypePcodeStr,
              compTypePcode: response.data.content.compTypePcode
            };
            this.$store.commit('setIndustryCheck', industryDataCkeck); // 更新vuex setIndustryCheck
            this.$store.commit('setCompLogo', response.data.content.compLogo); // 更新vuex sCompLogo
            this.$store.commit('setWechatQrImg', response.data.content.wechatQrImg); // 更新vuex WechatQrImg
            if (response.data.content.addressDetail) {
              let address0 = response.data.content.provinceCodeStr;
              let address1 = response.data.content.cityCodeStr;
              let address2 = response.data.content.areaCodeStr;
              let address3 = response.data.content.addressDetail;
              let idString = address0 + address1 + address2; // 省市区
              let idaddress = '';
              if (address3) {
                idaddress = address3; // 详细地址
              };
              this.$store.commit('setIdString', idString); // 更新vuex setIdString
              this.$store.commit('setIdAddress', idaddress); // 更新vuex setIdAddress
              this.$store.commit('setIdStringAddress', idString + ',' + idaddress); // 更新vuex setIdStringAddress
            };
          } else {
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            Toast(response.data.msg);
          }
        }).catch((error) => {
          this.$store.commit('setLoadingShow', false); // 更新vuex loading
          Toast('网络繁忙，请稍后');
          console.log(error, '网络繁忙，请稍后');
        });
      },
      // 开始长按
      goTouchStart (e, imgSrc) {
        let that = this;
        clearTimeout(that.timeOutEvent); // 清除定时器
        that.timeOutEvent = 0;
        that.timeOutEvent = setTimeout(function () {
          // 执行长按要执行的内容，
          that.longPress(e, imgSrc);
        }, 600); // 这里设置定时
      },
      // 手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
      goTouchend (e) {
        clearTimeout(this.timeOutEvent);
        if (this.timeOutEvent !== 0) {
          // 这里写要执行的内容（尤如onclick事件）
        }
      },
      // 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
      goTouchMove (e) {
        clearTimeout(this.timeOutEvent); // 清除定时器
        this.timeOutEvent = 0;
      },
      // 真正长按后应该执行的内容
      longPress (item, imgSrc) {
        this.timeOutEvent = 0;
        // 执行长按要执行的内容，如弹出菜单
        console.log(item, '触发长按行为');
        if (item === 'faRen') {
          if (imgSrc === '') { // 预览的地方没有图片
            return false;
          } else {
            this.ImgSrc = imgSrc;
            this.previewImgShow = true; // 显示预览状态
          }
        }
      },
      // processFile
      processFile (file, next) {
        console.log(file);
        // 压缩图片
        lrz(file).then(resImg => {
          file = resImg.file;
          console.log(file);
          next(file);
        });
      },
      addedHandler () {
        const file = this.files[0];
        file && this.$refs.upload.removeFile(file);
        console.log(file);
      },
      errHandler (file) {
        // const msg = file.response.message
        Toast('上传失败！');
      },
      sucHandlerLogo (file) {
        console.log(file);
        console.log('更新logo');
        this.UserData.compLogo = file.response.httpUrl;
        this.$store.commit('setBasicInforEdit', this.UserData); // 更新vuex setBasicInforEdit
        this.$store.commit('setCompLogo', file.response.name); // 更新vuex loading
      },
      sucHandlerQrImg (file) {
        console.log(file);
        console.log('更新二维码');
        this.UserData.wechatQrImg = file.response.httpUrl;
        this.$store.commit('setBasicInforEdit', this.UserData); // 更新vuex setBasicInforEdit
        this.$store.commit('setWechatQrImg', file.response.name); // 更新vuex loading
      },
      clickSaveBasicInfor () {
        console.log('触发保存基本信息按钮');
        let params = JSON.parse(JSON.stringify(this.UserData));
        params.compLogo = this.imgData.compLogo;
        params.wechatQrImg = this.imgData.wechatQrImg;
        params.compTypePcodeStr = this.industryDataCkeck.compTypePcodeStr;
        params.compTypePcode = this.industryDataCkeck.compTypePcode;
        params.addressDetail = this.addressDetail.split(',')[3];
        params.provinceCode = this.addrPcode;
        params.cityCode = this.addrCcode;
        params.areaCode = this.addrAcode;
        console.log(this.addressDetail, '地址');
        delete params.userPhone;
        delete params.userEmail;
        delete params.passWord;
        delete params.wxId;
        if (params.compLogo === '') { // logo不能为空
          Toast('企业logo不能为空');
          return false;
        };
        if (params.companyName === '') { // 企业名称不能为空
          Toast('企业名称不能为空');
          return false;
        };
        if (params.companyName.length < 2) { // 企业名称必须大于两个字符
          Toast('企业名称必须大于两个字符');
          return false;
        };
        if (params.compTypePcodeStr === '') { // 所属行业不能为空
          Toast('所属行业不能为空');
          return false;
        };
        if (params.addressDetail === '') { // 联系地址不能为空
          Toast('联系地址不能为空');
          return false;
        };
        if (params.contactMan === '') { // 联系人不能为空
          Toast('联系人不能为空');
          return false;
        };
        if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(params.contactTelphone)) { // 联系电话不能为空
          Toast('联系电话格式有误');
          return false;
        };
        if (params.contactEmail) {
          if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(params.contactEmail)) { // 校验邮箱格式
            Toast('邮箱格式有误');
            return false;
          };
        };
        this.upUserData(params);
      },
      upUserData (params) {
        console.log('更新用户基本信息');
        this.$store.commit('setLoadingShow', true); // 更新vuex loading
        if (localStorage.getItem('landRegist')) {
          let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
          console.log(landRegistLG.user.id);
          axios.post(this.api2 + '/rest-rp/user/' + landRegistLG.user.id, params).then((response) => {
            console.log(response);
            if (response.data.ret === '200') {
              this.$store.commit('setLoadingShow', false); // 更新vuex loading
              Toast('保存成功！');
              setTimeout(() => {
                this.$router.back(-1);
              }, 1000);
            } else {
              this.$store.commit('setLoadingShow', false); // 更新vuex loading
              Toast(response.data.msg);
            }
          }).catch((error) => {
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            Toast('网络繁忙，请稍后');
            console.log(error, '网络繁忙，请稍后');
          });
        }
      },
      getValueFromChild (e) {
        this.previewImgShow = e; // 关闭预览
      }
    }
  };
</script>

<style scoped>
  .editBasicInfor-content{
    position: relative;
    width: 100%;
    background: #F9F9F9;
  }
  .editBasicInfor{
    position: relative;
    width: 100%;
    background: #F9F9F9;
    padding-bottom: 5vh;
    -webkit-overflow-scrolling:touch;
  }
  .editBasicInfor-box{
    position: relative;
    width: 100%;
    margin-bottom: 20vw;
  }
  .topTips{
    position: relative;
    width: 100%;
    background: #F9F9F9;
    padding: 0 4vw 0 4vw;
  }
  .topTips>p{
    position: relative;
    width: 100%;
    font-family: PingFangSC-Light;
    font-size: 3.2vw;
    color: #9B9B9B;
    line-height: 8vw;
    text-align: center;
  }
  .EBI-textArea{
    position: relative;
    width: 100%;
    background: #fff;
    padding: 0 4vw 0 4vw;
  }
  .textAarea-box{
    position: relative;
    width: 100%;
  }
  .introduce2{
    position: relative;
    width: 96%;
    margin-left: 4%;
  }
  .MI-box{
    position: relative;
    width: 100%;
    padding: 0vw 4vw 0 4vw;
    background: #fff;
  }
  .MI-items{
    position: relative;
    width: 100%;
  }
  .MI-left-EBI{
    position: relative;
    width: 50%;
    height: 15vw;
  }
  .MI-left-EBI>img{
    position: relative;
    width: 2vw;
    float: left;
    top: 5.5vw;
    margin-right: 1vw;
    left: 0;
    display: inline-block;
  }
  .MI-left-EBI>p{
    position: absolute;
    font-family: PingFangSC-Light;
    font-size: 3.733vw;
    color: #2E2E30;
    line-height: 15vw;
    margin-left: 4vw;
  }
  .MI-right{
    position: relative;
    width: 50%;
  }
  .right-Box-MI{
    position: relative;
    width: 100%;
  }
  .img-MI{
    position: relative;
    width: 90%;
  }
  .EBI-img-MI{
    width: 100% !important;
  }
  .img-MI .touxiang{
    position: relative;
    width: 100%;
    float: right;
  }
  .imgTouXiang{
    position: relative;
    width: 10.66vw;
    height: 10.66vw;
    margin-top: 2.1vw;
  }
  .imgKongText{
    position: relative;
    width: 100%;
    font-family: PingFang-SC-Medium;
    font-size: 3.733vw;
    color: #D2D2D2;
    letter-spacing: 0;
    text-align: right;
    line-height: 15vw;
  }
  .arrow-img-MI{
    position: relative;
    width: 10%;
  }
  .arrow-img-MI>img{
    position: relative;
    width: 2vw;
    height: 2vw;
    margin-top: 6.5vw;
    float: right;
  }
  .perInfoItemR {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #3C3C3F;
    letter-spacing: 0;
    /* height: 15vw; */
    padding: 5vw 0;
    /* margin: 5vw 0; */
    line-height: 5vw;
    text-align: right;
    margin-right: 1vw;
    float: left;
  }
  .intro-MI{
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #D2D2D2;
    letter-spacing: 0;
    text-align: right;
    line-height: 15vw;
  }
  .intro-MI2{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #3C3C3F;
    letter-spacing: 0;
    text-align: right;
    line-height: 15vw;
  }
  .BIF-bottom{
    position: fixed;
    width: 100%;
    padding: 1.5vw 4vw 1.5vw 4vw;
    bottom: 0;
    z-index: 105;
    background: #fff;
  }
  .BIF-btn{
    position: relative;
    width: 100%;
    background: #02C2A2;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #FFFFFF;
    text-align: center;
    letter-spacing: 0;
    line-height: 12vw;
  }
</style>

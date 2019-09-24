<template>
  <div class="basicInfor-content">
    <div class="basicInfor">
      <div class="BIF-top">
        <div class="BIF-top-left left">
          <p class="">{{UserData.companyName || '未填写'}}</p>
          <div class="qualifed-box">
            <div class="BIF-qua-img" v-if="UserData.companyAccountVo.authState === '1' || UserData.companyAccountVo.authState === '2'">
              <img :src="UserData.companyAccountVo.authState === '2' ? certified : noCertified" alt="" class="">
            </div>
          </div>
        </div>
        <div class="BIF-top-right right">
          <img :src="UserData.compLogo || 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png'" alt="" class="img">
        </div>
      </div>
      <div class="BIF-cont">
        <div class="BIF-intro">
          <div class="BIF-intro-box">
            <p class="title-BIF">公司简介</p>
            <p class="text-BIF">{{UserData.companyIntro || '未填写'}}</p>
          </div>
          <div class="line"></div>
        </div>
        <div class="BIF-intro">
          <div class="BIF-intro-box">
            <p class="title-BIF">所属行业</p>
            <p class="text-BIF">{{UserData.compTypePcodeStr || '未填写'}}</p>
          </div>
          <div class="line"></div>
        </div>
        <div class="BIF-intro">
          <div class="BIF-intro-box">
            <p class="title-BIF">联系地址</p>
            <p class="text-BIF">{{addressDetail || '未填写'}}</p>
          </div>
          <div class="line"></div>
        </div>
        <div class="BIF-intro">
          <div class="BIF-intro-box">
            <p class="title-BIF">微信公众号二维码</p>
            <div class="qr-code-BIF">
              <img :src="UserData.wechatQrImg" alt="" class="">
            </div>
          </div>
          <div class="line"></div>
        </div>
        <div class="BIF-intro">
          <div class="BIF-intro-box">
            <p class="title-BIF">联系信息</p>
            <div class="contat-BIF">
              <div class="contat-box">
                <p class="contat-left">联系人</p>
                <p class="contat-right right">{{UserData.contactMan || '未填写'}}</p>
              </div>
              <div class="contat-box">
                <p class="contat-left">联系电话</p>
                <p class="contat-right right">{{UserData.contactTelphone || '未填写'}}</p>
              </div>
              <div class="contat-box">
                <p class="contat-left">联系邮箱</p>
                <p class="contat-right right">{{UserData.contactEmail || '未填写'}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="BIF-bottom">
      <div class="BIF-btn" @click="clickBasicInforEdit">
        <p class="">编辑</p>
      </div>
    </div>
  </div>
</template>

<script>
    import logo from '@/assets/images/business/home/personCenter/company/logo.jpg';
    import certified from '@/assets/images/business/home/personCenter/company/certified.png';
    import noCertified from '@/assets/images/business/home/personCenter/company/noCertified.png';
    import qrCodeIcon from '@/assets/images/business/home/personCenter/company/qrCodeIcon.png';
    import { mapMutations, mapGetters } from 'vuex';
    import { Toast } from 'mint-ui';
    import axios from 'axios';
    export default {
        name: 'basicInfor',
        components: {
        },
        data () {
          return {
            certified: certified,
            noCertified: noCertified,
            logo: logo,
            qrCodeIcon,
            addressDetail: '', // 页面显示地址
            UserData: {}
          };
        },
        created () {
          this.UserData = this.PERSONCENTER.basicInfor;
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          this.getUserData();
        },
        computed: {
          ...mapGetters(['PERSONCENTER'])
        },
        watch: {
          PERSONCENTER: {
            handler (a, b) {
              this.UserData = a.basicInfor; // 基本信息
              this.addressDetail = this.UserData.provinceCodeStr + this.UserData.cityCodeStr + this.UserData.areaCodeStr + this.UserData.addressDetail; // 省市区+详细地址
              let idString = '';
              if (this.UserData.provinceCodeStr && this.UserData.cityCodeStr && this.UserData.areaCodeStr) {
                idString = this.UserData.provinceCodeStr + ',' + this.UserData.cityCodeStr + ',' + this.UserData.areaCodeStr;
              };
              this.$store.commit('setIdString', idString); // 更新vuex setIdString
              this.$store.commit('setIdAddress', this.UserData.addressDetail); // 更新vuex setIdAddress
            },
            deep: true
          }
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText',
            setBasicInfor: 'setBasicInfor',
            setIdString: 'setIdString',
            setIdAddress: 'setIdAddress'
          }),
          getUserData () {
            console.log('获取用户信息，全部');
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            console.log(landRegistLG.user.id);
            axios.get(this.api2 + '/rest-rp/user/' + landRegistLG.user.id).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                if (response.data.content.companyName) { // 后台返回数据
                  this.$store.commit('setBasicInfor', response.data.content); // 更新vuex loading
                } else {
                  this.$router.push({ // 公司信息为空
                    path: '/companyInforEdit',
                    query: { }
                  });
                }
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
          clickBasicInforEdit () {
            console.log('基本信息编辑');
            this.$router.push({
              path: '/companyInforEdit',
              query: { }
            });
          }
        }
      };
</script>

<style scoped>
  .basicInfor-content{
    position: relative;
    width: 100%;
  }
  .basicInfor{
    position: relative;
    width: 100vw;
    -webkit-overflow-scrolling:touch;
  }
  .BIF-top{
    position: relative;
    width: 100%;
    padding: 4vw 4vw 4vw 4vw;
    margin-bottom: 1.5vw;
    background: #fff;
    height: 28vw;
  }
  .BIF-top-left{
    position: relative;
    width: 80%;
  }
  .BIF-top-left>p{
    font-family: PingFang-SC-Bold;
    font-size: 5.33vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 11vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .qualifed-box{
    position: relative;
    width: 100%;
  }
  .BIF-qua-img>img{
    position: relative;
    width: 16.6vw;
    height: 5.33vw;
  }
  .BIF-top-right{
    position: relative;
    width: 20%;
  }
  .BIF-top-right>img{
    position: relative;
    width: 16vw;
    height: 16vw;
    border-radius: 50%;
    float: right;
  }
  .BIF-cont{
    position: relative;
    width: 100%;
    padding: 4vw;
    background: #fff;
    margin-bottom: 20vw;
  }
  .BIF-intro{
    position: relative;
    width: 100%;
  }
  .BIF-intro-box{
    position: relative;
    width: 100%;
    padding-bottom: 3vw;

  }
  .title-BIF{
    position: relative;
    font-family: PingFang-SC-Bold;
    font-size: 4.5vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 10vw;
  }
  .text-BIF{
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #5D5D5D;
    line-height: 8vw;
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
  .qr-code-BIF{
    position: relative;
    width: 100%;
  }
  .qr-code-BIF>img{
    position: relative;
    width: 19.7vw;
    height: 19.7vw;
  }
  .contat-BIF{
    position: relative;
    width: 100%;
  }
  .contat-box{
    position: relative;
    width: 100%;
  }
  .contat-left{
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #5D5D5D;
    line-height: 8vw;
  }
  .contat-right{
    position: absolute;
    right: 0;
    top: 0;
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #5D5D5D;
    line-height: 8vw;
  }
</style>

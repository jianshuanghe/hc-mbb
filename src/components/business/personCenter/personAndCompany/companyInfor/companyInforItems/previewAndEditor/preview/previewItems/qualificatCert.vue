<template>
    <div class="qualificatCert-content">
      <div class="basicInfor">
        <div class="QC-top-tips1" v-if="state === '1'">
          <div class="QC-tips left" >
            <div class="img-qc left">
              <img :src="tipsImg" alt="" class="img">
            </div>
            <p class="left colorState1">正在全力审核中，请耐心等待…</p>
            <div class="clear"></div>
          </div>
        </div>
        <div class="QC-top-tips2" v-if="state === '2'">
          <div class="QC-tips left">
            <div class="img-qc left">
              <img :src="tipsImg" alt="" class="img">
            </div>
            <p class="left colorState2">您的资质认证审核已通过</p>
            <div class="clear"></div>
          </div>
        </div>
        <div class="QC-top-tips3" v-if="state === '3'">
          <div class="QC-tips left">
            <div class="img-qc left">
              <img :src="tipsImg" alt="" class="img">
            </div>
            <p class="left colorState3">您的资质认证审核失败</p>
            <div class="clear"></div>
            <div class="find-Qc-tips right">
              <p class="colorState3"  @click="clickFindReason">查看原因</p>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="BIF-cont">
          <div class="BIF-intro">
            <div class="BIF-intro-box">
              <p class="title-BIF">品牌名称</p>
              <p class="text-BIF">{{UserData.authBrandName || '未填写'}}</p>
              <!--<span class="error-tips">审核未通过</span>-->
            </div>
            <div class="line"></div>
          </div>
          <div class="BIF-intro">
            <div class="BIF-intro-box">
              <p class="title-BIF">推广内容</p>
              <p class="text-BIF">{{UserData.authBrandContent || '未填写'}}</p>
            </div>
            <div class="line"></div>
          </div>
          <div class="BIF-intro">
            <div class="BIF-intro-box">
              <p class="title-BIF">验证类型</p>
              <p class="text-BIF" v-if="UserData.authCompType === ''">未选择</p>
              <p class="text-BIF" v-else>{{UserData.authCompType === '0' ? '企业' : '个体'}}</p>
            </div>
            <div class="line"></div>
          </div>

          <div class="BIF-intro">
          <div class="BIF-intro-box">
            <p class="title-BIF">资质类型</p>
            <p class="text-BIF" v-if="UserData.authQualType === ''">未选择</p>
            <p class="text-BIF" v-else>{{UserData.authQualType === '0' ? '企业营业执照' : '个体工商户营业执照'}}</p>
          </div>
          <div class="line"></div>
        </div>
          <div class="BIF-intro">
            <div class="BIF-intro-box">
              <p class="title-BIF">资质图片</p>
              <div class="qr-code-BIF">
                <img :src="UserData.authQualImg || blank" alt="" class="">
              </div>
            </div>
            <div class="line"></div>
          </div>
          <div class="BIF-intro">
            <div class="BIF-intro-box">
              <p class="title-BIF">资质号码</p>
              <p class="text-BIF">{{UserData.authQualNum || '未填写'}}</p>
            </div>
            <div class="line"></div>
          </div>
          <div class="BIF-intro">
            <div class="BIF-intro-box">
              <p class="title-BIF">法人身份证</p>
              <div class="qr-code-BIF">
                <img :src="UserData.authLegalNum || blank" alt="" class="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="BIF-bottom" v-if="state === '1'">
        <div class="BIF-btn noEdit" @click="clickQualificatCertEdit">
          <p class="">编辑</p>
        </div>
      </div>
      <div class="BIF-bottom" v-else>
        <div class="BIF-btn"@click="clickQualificatCertEdit">
          <p class="">编辑</p>
        </div>
      </div>
      <div>
        <confirm
          v-model="confirmShow"
          :show-cancel-button="false"
          :title=confirmTitle
          :confirm-text=confirmBtn
          @on-cancel="onCancel"
          @on-confirm="onConfirm">
          <p style="text-align:center;">{{confirmText}}</p>
        </confirm>
      </div>
    </div>
</template>

<script>
    import blank from '@/assets/images/business/home/blank.png';
    import logo from '@/assets/images/business/home/personCenter/company/logo.jpg';
    import certified from '@/assets/images/business/home/personCenter/company/certified.png';
    import check from '@/assets/images/business/home/personCenter/company/check.png';
    import time from '@/assets/images/business/home/personCenter/company/time.png';
    import warn from '@/assets/images/business/home/personCenter/company/warn.png';
    import { Confirm } from 'vux';
    import { mapMutations, mapGetters } from 'vuex';
    import { Toast } from 'mint-ui';
    import axios from 'axios';
    export default {
        name: 'qualificatCert',
        components: {
          Confirm
        },
        data () {
          return {
            confirmShow: false,
            confirmBtn: '知道了',
            confirmTitle: '',
            confirmText: '这里是审核失败的原因，这里是审核失败的原因。',
            blank: blank, // 空白图
            certified: certified,
            logo: logo,
            state: 3, // 认证状态
            tipsImg: '',
            UserData: {}
          };
        },
        created () {
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
              this.UserData = a.qualificatCert; // 认证资质
              this.state = a.qualificatCert.authState; // 认证状态
              this.confirmText = a.qualificatCert.authContent; // 审核失败原因
              this.authStateType(this.state);
            },
            deep: true
          }
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText',
            setQualificatCert: 'setQualificatCert'
          }),
          authStateType (e) {
            console.log(e, '侦听状态切换Icon');
            if (e === '1') {
              this.tipsImg = time;
            } else if (e === '2') {
              this.tipsImg = check;
            } else if (e === '3') {
              this.tipsImg = warn;
            };
          },
          onCancel () {
           console.log('触发取消');
          },
          onConfirm () {
            console.log('触发确定');
          },
          clickFindReason () {
            this.confirmShow = true;
          },
          getUserData () {
            console.log('获取用户信息，全部');
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            console.log(landRegistLG.user.id);
            axios.get(this.api2 + '/rest-rp/compAuth/' + landRegistLG.user.id).then((response) => {
              console.log(response);
              if (response.data.ret === '200') { // 后台返回不为空
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                this.$store.commit('setQualificatCert', response.data.content); // 更新vuex loading
                if (response.data.content) {
                  this.$store.commit('setQualificatCert', response.data.content); // 更新vuex loading
                } else { // 后台返回空，用户没有认证过
                  let content = {
                    ssoUserId: 0,
                    authState: null,
                    authBrandName: null,
                    authBrandContent: null,
                    authCompType: null,
                    authQualType: null,
                    authQualImg: 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png',
                    authQualNum: null,
                    authLegalNum: 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png',
                    authEnclosureImg01: 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png',
                    authEnclosureImg02: 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png',
                    authEnclosureImg03: 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png'
                  };
                  this.$store.commit('setQualificatCert', content); // 更新vuex loading
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
          clickQualificatCertEdit () {
            console.log('基本资质认证编辑');
            if (this.state === '1') {
              Toast('审核中，不可编辑！');
              return;
            };
            this.$router.push({
              path: '/companyInforEdit',
              query: { }
            });
          }
        }
      };
</script>

<style scoped>
  .qualificatCert-content{
    position: relative;
    width: 100%;
  }
  .basicInfor{
    position: relative;
    width: 100vw;
    -webkit-overflow-scrolling:touch;
  }
  .QC-top-tips1{
    position: relative;
    width: 100%;
    padding: 0 4vw 0 4vw;
    height: 8vw;
    background: #FEEEC7;
  }
  .QC-top-tips2{
    position: relative;
    width: 100%;
    padding: 0 4vw 0 4vw;
    height: 8vw;
    background: #CBF3EC;
  }
  .QC-top-tips3{
    position: relative;
    width: 100%;
    padding: 0 4vw 0 4vw;
    height: 8vw;
    background: #FFBFC9;
  }
  .QC-tips{
    position: relative;
    width: 100%;
  }
  .QC-tips>p{
    position: relative;
    width: 90%;
    font-family: PingFang-SC-Medium;
    font-size: 3.2vw;
    color: #FF4D6A;
    letter-spacing: 0;
    line-height: 8vw;
  }
  .error-tips{
    position: relative;
    padding: 0 1vw 0 1vw;
    font-size: 3vw;
    line-height: 5vw;
    margin-top: 1vw;
    text-align: center;
    border: 1px solid #FF4D6A;
    border-radius: 2px;
    color: #FF4D6A;
  }
  .colorState1{
    color: #FAB100 !important;
  }
  .colorState2{
    color: #02C2A2 !important;
  }
  .colorState3{
    color: #FF4D6A !important;
  }
  .img-qc{
    position: relative;
    width: 6%;
  }
  .img-qc>img{
    position: relative;
    width: 4vw;
    height: 4vw;
    margin-top: 2vw;
  }
  .find-Qc-tips{
    position: absolute;
    width: 50%;
    top: 0;
    right: 0;
  }
  .find-Qc-tips>p{
    font-family: PingFang-SC-Medium;
    font-size: 3.2vw;
    color: #FF4D6A;
    letter-spacing: 0;
    line-height: 8vw;
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
    line-height: 6vw;
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
  .noEdit{
    opacity: 0.5;
  }
</style>

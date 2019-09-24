<template>
  <div class="personInfor-content">
    <div class="pInfor-box" @click="goToMaterial">
      <div class="pI-name left">
        <div class="name-pI-box">
          <div class="name-pI">
            <p class="name-pI-span left">{{UserData.nickname || '昵称'}}</p>
            <span class="imgSty left">
            </span>
            <div class="clear"></div>
          </div>
          <div class="name-pI">
            <p class="com-pI left">{{UserData.companyName || '公司名称'}}</p>
            <span class="imgSty left">
              <img :src="certifie.certified" alt="" class="memberStatus"  v-if="UserData.companyAccountVo.authState === '2'">
              <img :src="certifie.noCertified" alt="" class="memberStatus"  v-else>
            </span>
            <div class="clear"></div>
          </div>
        </div>
      </div>
      <div class="img-pI right">
        <div class="img-pI-box">
          <div class="img-pI-img left">
            <img :src="UserData.headImg || 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png'" alt="" class="img">
            <div class="vip-box-pI">
              <!--未成为会员0， 过期3-->
              <img :src="openList.openNo" alt="" class="" v-if="UserData.vipState === '3' || UserData.vipState === '0' ">
              <!--会员1. 企业孵化器2-->
              <img :src="openList.open" alt="" class="" v-else>
            </div>
          </div>
          <div class="img-rightArrow right">
            <img :src="lineRightArrow" alt="" class="img">
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="line"></div>
    <div class="account-pI">
      <div class="pI-acc-box">
        <div class="acc-box left"  @click="goToAccountCenter">
          <p class="num-pI">{{UserData.companyAccountVo.money || 0}}</p>
          <p class="text-pI">账户余额(元)</p>
        </div>
        <div class="acc-box left"  @click="goToDataReport">
          <p class="num-pI">{{UserData.companyAccountVo.consMoney || 0}}</p>
          <p class="text-pI">已消耗(元)</p>
        </div>
        <div class="acc-box left"  @click="goToPutInBusiness">
          <p class="num-pI">{{UserData.companyAccountVo.putInCount || 0}}</p>
          <p class="text-pI">投放商机(个)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import touXiang from '@/assets/images/business/home/extendManageList/touxiang.png';
  import lineRightArrow from '@/assets/images/common/line-right-arrow.png';
  import status1 from '@/assets/images/business/home/personCenter/company/status1.png';
  import status2 from '@/assets/images/business/home/personCenter/company/status2.png';
  import status3 from '@/assets/images/business/home/personCenter/company/status3.png';
  import Vipstatus1 from '@/assets/images/business/home/personCenter/company/Vipstatus1.png';
  import Vipstatus2 from '@/assets/images/business/home/personCenter/company/Vipstatus2.png';
  import Vipstatus3 from '@/assets/images/business/home/personCenter/company/Vipstatus3.png';
  import certified from '@/assets/images/business/home/personCenter/company/certified.png';
  import noCertified from '@/assets/images/business/home/personCenter/company/noCertified.png';
  import open from '@/assets/images/business/home/personCenter/company/open.png';
  import openNo from '@/assets/images/business/home/personCenter/company/openNo.png';
  import vip from '@/assets/images/business/home/personCenter/vip.png';
  import { mapMutations } from 'vuex';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  export default {
    name: 'personInfor',
    components: {},
    data () {
      return {
        touxiang: touXiang,
        lineRightArrow: lineRightArrow,
        vipImg: vip,
        memberVip: {
          Vipstatus1: Vipstatus1, // 基础会员
          Vipstatus2: Vipstatus2, // vip会员
          Vipstatus3: Vipstatus3 // 高级会员
        },
        certifie: {
          certified: certified, // 已认证
          noCertified: noCertified // 未认证
        },
        openList: {
          open: open, // 开通
          openNo: openNo // 未开通
        },
        memberStatus: {
          status1: status1, // 会员
          status2: status2, // 未开通
          status3: status3 // 已过期
        },
        UserData: {} // 用户信息全部
      };
    },
    created () {
      if (this.EVN === 'production') {
        axios.defaults.baseURL = this.apiProd2;
      }
      this.getUserData();
    },
    mounted () {},
    methods: {
      ...mapMutations({
        setLoadingShow: 'setLoadingShow',
        setLoadingText: 'setLoadingText'
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
            this.UserData = response.data.content;
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
      goToMaterial () {
        let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
        console.log(landRegistLG.user.id);
        console.log('to个人资料');
        this.$router.push({
          path: '/personMaterial',
          query: {userId: landRegistLG.user.id}
        });
      },
      goToAccountCenter () {
        console.log('to账户中心');
        this.$router.push({
          path: '/accountCenter',
          query: { }
        });
      },
      goToPutInBusiness () {
        console.log('to投放商机');
        this.$router.push({
          path: '/putInBusiness',
          query: { }
        });
      },
      goToDataReport () {
        console.log('to数据报表');
        this.$router.push({
          path: '/dataReport',
          query: { }
        });
      }
    }
  };
</script>

<style scoped>
  .personInfor-content{
    position: relative;
    width: 100%;
    margin-bottom: 1.5vw;
    height: 56vw;
  }
  .pInfor-box{
    position: relative;
    width: 100%;
    padding: 9vw 4vw 9vw 4vw;
    background: #fff;
    height: 36vw;
  }
  .pI-name{
    position: relative;
    width: 70%;
  }
  .name-pI-box{
    position: relative;
    width: 100%;
  }
  .name-pI{
    position: relative;
    width: 96%;
  }
  .name-pI-span{
    position: relative;
    width: 100%;
    ont-family: PingFangSC-Medium;
    font-size: 5.33vw;
    color: #3C3D3F;
    letter-spacing: 0;
    line-height: 10vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .com-pI{
    position: relative;
    font-size: 3.5vw;
    color: #3C3D3F;
    letter-spacing: 0;
    line-height: 8vw;
    max-width: 75%;
    ont-family: PingFangSC-Medium;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .img-pI{
    position: relative;
    width: 30%;
  }
  .img-pI-box{
    position: relative;
    width: 100%;
  }
  .img-pI-img{
    position: relative;
    width: 80%;
  }
  .img-pI-img>img{
    position: relative;
    width: 16vw;
    height: 16vw;
    border-radius: 50%;
    float: right;
  }
  .img-rightArrow{
    position: relative;
    width: 20%;
  }
  .img-rightArrow>img{
    position: relative;
    width: 3vw;
    margin-top: 6.5vw;
    float: right;
  }
  .account-pI{
    position: relative;
    width: 100%;
    padding: 2vw 4vw 0 4vw;
    background: #fff;
    height: 20vw;
  }
  .pI-acc-box{
    position: relative;
  }
  .acc-box{
    position: relative;
    width: 33.3333%;
  }
  .num-pI{
    position: relative;
    width: 100%;
    font-family: PingFang-SC-Bold;
    font-size: 4.8vw;
    color: #2E2E30;
    line-height: 8vw;
    text-align: center;
  }
  .text-pI{
    position: relative;
    width: 100%;
    font-family: PingFang-SC-Regular;
    font-size: 3.5vw;
    color: #2E2E30;
    line-height: 8vw;
    text-align: center;
  }
  .vip-box-pI{
    position: absolute;
    width: 13vw;
    bottom: -6vw;
    right: -4vw;
  }
  .vip-box-pI>img{
    position: relative;
    width: 100%;
  }
  .imgSty{
    position: relative;
    top: 1.8vw;
  }
  .memberStatus{
    position: relative;
    width: 15vw;
  }
</style>

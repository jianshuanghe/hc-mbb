<template>
  <div class="memberCenterAccount-contnet">
    <div class="memberCenterAccount-box">
      <div class="memberCenterAccount" :class="{ 'memberCenterAccount1': UserData.cydVipLv === '1', 'memberCenterAccount2':UserData.cydVipLv === '4', 'memberCenterAccount3':UserData.cydVipLv === '5'}">
        <div class="MCA-person-box">
          <div class="MCA-top">
            <div class="MAC-vip left">
              <!--如何秀会员-->
              <div class="MAC-vip-Hy"v-if="UserData.vipState !== '2'">
                <div class="MAC-HY left" >
                  <p class="">VIP会员</p>
                </div>
                <div class="MAC-vip-img left">
                  <img :src="vip" alt="" class="">
                </div>
                <div class="clear"></div>
              </div>
              <!--企业孵化器会员-->
              <div class="MAC-vip-Hy"v-if="UserData.vipState === '2'">
                <div class="MAC-HY left" >
                  <p class="" v-if="UserData.cydVipLv === 3">普通会员</p>
                  <p class="" v-if="UserData.cydVipLv === 4">高级会员</p>
                  <p class="" v-if="UserData.cydVipLv === 5">VIP会员</p>
                </div>
                <div class="MAC-vip-img left">
                  <img :src="vip" alt="" class="">
                </div>
                <div class="clear"></div>
              </div>
            </div>
            <div class="MAC-vip-btn-time left" v-if="!UserData.applyNum">
              <div class="btn-MAC"  @click="goToBuyMember" v-if="UserData.vipState === '0'">
                <img :src="suo" alt="" class="">
                <p class="btn-MAC-DKT">待开通</p>
              </div>
              <div class="btn-MAC" v-if="UserData.vipState === '1' || UserData.vipState === '2'">
                <p class="btn-MAC-DKT" v-if="UserData.endTimeStr">有效期至 {{MEMBERCENTER.memberCenterData.endTimeStr | formatDate}}</p>
              </div>
              <div class="btn-MAC" v-if="UserData.vipState === '3'">
                <p class="btn-MAC-DKT" v-if="UserData.endTimeStr">已过期 {{overdueDay}}天</p>
              </div>
            </div>
            <!--待付款状态-->
            <div class="MAC-vip-btn-time left" v-else>
              <div class="btn-MAC"  @click="goToBuyMember">
                <p class="btn-MAC-DKT">待付款</p>
              </div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="touxiang-name-MAC">
            <div class="touxiang-MAC">
              <img :src="UserData.compLogo || 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png'" alt="" class="">
            </div>
            <p class="name-MAC">{{UserData.userName || '用户昵称'}}</p>
            <p class="name-MAC" v-if="UserData.compName">{{UserData.compName || '公司名称'}}</p>
          </div>
        </div>
      </div>
      <div class="GB-MAC">
        <div class="GB-img left">
          <img :src="tongzhi" alt="" class="">
        </div>
        <div class="GB-cont left"  v-if="!UserData.applyNum">
          <!--未开通-->
          <p class="" v-if="UserData.vipState === '0'">3大会员特权，预计每月至少可节省{{UserData.moeny || 320}}元</p>
          <!--过期-->
          <p class="" v-if="UserData.vipState === '3'">会员开通期间，会员特权已为您节省{{UserData.moeny || 320}}元</p>
          <!--开通-->
          <p class="" v-if="UserData.vipState === '1' || UserData.vipState === '2'">会员特权已为您节省{{UserData.moeny || 320}}元</p>
        </div>
        <!--待付款状态-->
        <div class="GB-cont left" v-else>
          <p class="" v-if="UserData.vipState === '0'">开通会员后，预计每月至少可节省{{UserData.moeny || 320}}元</p>
          <!--过期-->
          <p class="" v-if="UserData.vipState === '3'">会员开通期间，会员特权已为您节省{{UserData.moeny || 320}}元</p>
          <!--开通-->
          <p class="" v-if="UserData.vipState === '1' || UserData.vipState === '2'">会员特权已为您节省{{UserData.moeny || 320}}元</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import vip from '@/assets/images/business/home/personCenter/Combined-Shape.png';
    import suo from '@/assets/images/business/home/personCenter/suo.png';
    import touXiang from '@/assets/images/business/home/extendManageList/touxiang.png';
    import tongzhi from '@/assets/images/business/home/personCenter/tongzhi.png';
    import { mapMutations, mapGetters } from 'vuex';
    import { Toast } from 'mint-ui';
    import axios from 'axios';
    export default {
        name: 'memberCenterAccount',
        components: {
        },
        data () {
          return {
            vip: vip,
            suo: suo,
            touXiang: touXiang,
            tongzhi: tongzhi,
            overdueDay: '', // 过期天数
            effectiveTime: '', // 有效时间
            UserData: {} // 接口返回的会员数据
          };
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          this.UserData = this.MEMBERCENTER.memberCenterData; // 侦听
          if (this.UserData.vipState === '3') {
            this.overdueDay = this.getDay(this.UserData.endTimeStr);
          };
          if (this.UserData.vipState === '1' || this.UserData.vipState === '2') {
            console.log(this.UserData.endTimeStr, '有效期时间');
            if (this.UserData.endTimeStr) {
              this.effectiveTime = this.UserData.endTimeStr.replace('///g', '.');
            }
          };
        },
        computed: {
          ...mapGetters(['MEMBERCENTER'])
        },
        watch: {
          MEMBERCENTER: {
            handler (a, b) {
              this.UserData = a.memberCenterData; // 侦听
            },
            deep: true
          }
        },
        filters: {
          /* 格式化时间戳 */
          formatDate (val) {
            return val.replace('///g', '.');
          }
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText',
            setMemberCenterData: 'setMemberCenterData'
          }),
          getDay (e) { // 计算过期时间
            let s1 = new Date(e);
            let s2 = new Date();
            let endTime = e.split('/')[0] + '/' + Number(e.split('/')[1]) + '/' + e.split('/')[2];
            let toDay = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate();
            console.log(toDay, endTime, '判断过期时间和但钱时间是否一致');
            let days = s2.getTime() - s1.getTime();
            let time = parseInt(days / (1000 * 60 * 60 * 24));
            if (endTime === toDay) {
              console.log('会员到期时间是今天');
              time = 0;
            };
            return time;
          },
          createOrder () {
            console.log('创建订单');
            if (this.UserData.applyNum) {
              if (this.EVN === 'production') {
                window.location.href = this.apiProd2 + '/rest-rp/vip/createWxPayOrder?applyVipNum=' + this.UserData.applyNum;
              } else {
                window.location.href = this.api2 + '/rest-rp/vip/createWxPayOrder?applyVipNum=' + this.UserData.applyNum;
              }
            } else {
              this.$store.commit('setLoadingShow', true); // 更新vuex loading
              let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
              console.log(landRegistLG.user.id);
              axios.get(this.api2 + '/rest-rp/vip/vipApply?userId=' + landRegistLG.user.id + '&lvId=' + this.UserData.lvId).then((response) => {
                console.log(response);
                if (response.data.ret === '200') {
                  this.$store.commit('setLoadingShow', false); // 更新vuex loading
                  console.log('创建订单成功');
                  let params = response.data.content;
                  console.log(params);
                  // return false;
                  if (this.EVN === 'production') {
                    window.location.href = this.apiProd2 + '/rest-rp/vip/createWxPayOrder?applyVipNum=' + params;
                  } else {
                    window.location.href = this.api2 + '/rest-rp/vip/createWxPayOrder?applyVipNum=' + params;
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
            }
          },
          goToBuyMember () {
            console.log('to购买会员');
            if (localStorage.getItem('browserType') === 'WX') {
              this.createOrder();
            } else if (localStorage.getItem('browserType') === 'FWX') {
              this.$router.push({
                path: '/buyMember',
                query: { }
              });
            }
          }
        }
      };
</script>

<style scoped>
  .memberCenterAccount-contnet{
    position: relative;
    width: 100vw;
    padding: 2vw 4vw;
    background: #fff;
  }
  .memberCenterAccount-box{
    position: relative;
    width: 100%;
  }
  .memberCenterAccount{
    position: relative;
    width: 100%;
    height: 47.2vw;
    background-image: linear-gradient(-134deg,#57D6CF 0%,#15D49F 100%);
    box-shadow: 0 2px 10px 0 rgba(2,194,162,0.30);
    border-radius: 4px;
  }
  .memberCenterAccount1{
    position: relative;
    width: 100%;
    height: 47.2vw;
    background-image: linear-gradient(-46deg, #DBDBE4 0%, #9FA2AE 100%) !important;
    box-shadow: 0 2px 10px 0 rgba(124,122,135,0.35);
    border-radius: 4px;
  }
  .memberCenterAccount2{
    position: relative;
    width: 100%;
    height: 47.2vw;
    background-image: linear-gradient(-46deg, #F7DB9A 0%, #C99C4C 100%) !important;
    box-shadow: 0 2px 10px 0 rgba(213,172,96,0.50);
    border-radius: 4px;
  }
  .memberCenterAccount3{
    position: relative;
    width: 100%;
    height: 47.2vw;
    background-image: linear-gradient(-225deg, #3D3D40 0%, #7C7A87 100%) !important;
    box-shadow: 0 2px 10px 0 rgba(62,62,65,0.50);
    border-radius: 4px;
  }
  .MCA-person-box{
    position: relative;
    width: 90%;
    margin-left: 5%;
    padding-top: 5vw;
  }
  .MCA-top{
    position: relative;
    width: 100%;
  }
  .MAC-vip{
    position: relative;
    width: 50%;
  }
  .MAC-vip-Hy{
    position: relative;
    width: 100%;
  }
  .MAC-HY{
    position: relative;
    width: 45%;
  }
  .MAC-HY>p{
    font-family: PingFang-SC-Bold;
    font-size: 4.8vw;
    color: #FFFFFF;
    line-height: 10vw;
  }
  .MAC-vip-img{
    position: relative;
    width: 40%;
  }
  .MAC-vip-img>img{
    position: relative;
    width: 4.8vw;
    margin-top: 2.6vw;
  }


  .MAC-vip-btn-time{
    position: relative;
    width: 50%;
  }
  .btn-MAC{
    position: relative;
    width: 100%;
  }
  .btn-MAC>img{
    position: relative;
    width: 4vw;
    height: 4.2vw;
    margin-top: 3vw;
    float: right;
    margin-right: 12vw;
  }
  .btn-MAC-DKT{
    position: absolute;
    text-align: right;
    font-family: PingFang-SC-Regular;
    font-size: 3.5vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 10vw;
    right: 0;
    top: 0;
  }
  .touxiang-name-MAC {
    position: relative;
    width: 100%;
  }
  .touxiang-MAC{
    position: relative;
    width:11.2vw;
    margin: 0 auto;
  }
  .touxiang-MAC>img{
    position: relative;
    width:11.2vw;
    height: 11.2vw;
    border-radius: 50%;
  }
  .name-MAC{
    position: relative;
    width: 100%;
    font-family: PingFang-SC-Medium;
    font-size: 3.75vw;
    color: #FFFFFF;
    text-align: center;
    line-height: 10vw;
  }
  .GB-MAC{
    position: relative;
    width: 100%;
    margin-top: 2vw;
    background: #fff;
    height: 10vw;
  }
  .GB-img{
    position: relative;
    width: 7%;
  }
  .GB-img>img{
    width: 4vw;
    margin-top: 3vw;
  }
  .GB-cont{
    position: relative;
    width: 90%;
  }
  .GB-cont>p{
    font-family: PingFang-SC-Medium;
    font-size: 3.2vw;
    color: #5D5D5D;
    letter-spacing: 0;
    line-height: 10vw;
  }
</style>

<template>
  <div class="memberCenterAtOpen-content">
    <div class="memberCenterAtOpen">
      <div class="MCO-btn-box1">
        <div class="MCO-btn-left1 left">
          <p class=""><span class="text-MCO1">¥</span>999 <span class="text-MCO1">.00</span></p>
        </div>
        <div class="MCO-btn-right1 left">
          <p class="text-MCO1" @click="goToBuyMember">{{UserData.vipState === '0' ? '立即开通' : '立即续费'}}</p>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  export default {
    name: 'memberCenterAtOpen',
    data () {
      return {
        UserData: {} // 接口返回的会员数据
      };
    },
    created () {
      if (this.EVN === 'production') {
        axios.defaults.baseURL = this.apiProd2;
      }
      this.UserData = this.MEMBERCENTER.memberCenterData; // 侦听
      // this.getUserData();
    },
    computed: {
      ...mapGetters(['MEMBERCENTER'])
    },
    watch: {
      MEMBERCENTER: {
        handler (a, b) {
          this.UserData = b.memberCenterData; // 侦听
        },
        deep: true
      }
    },
    mounted () {},
    methods: {
      ...mapMutations({
        setLoadingShow: 'setLoadingShow',
        setLoadingText: 'setLoadingText',
        setMemberCenterData: 'setMemberCenterData'
      }),
      getUserData () {
        console.log('获取用户信息，全部');
        this.$store.commit('setLoadingShow', true); // 更新vuex loading
        let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
        console.log(landRegistLG.user.id);
        axios.get(this.api2 + '/rest-rp/vip/vipInfo?userId=' + landRegistLG.user.id).then((response) => {
          console.log(response);
          if (response.data.ret === '200') {
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            let UserData = response.data.content;
            this.$store.commit('setMemberCenterData', UserData); // 更新vuex setPersonMaterial
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
  .memberCenterAtOpen-content{
    position: fixed;
    width: 100%;
    z-index: 999;
    bottom: 0;
  }
  .memberCenterAtOpen{
    position: relative;
    width: 100%;
    margin-top: 2vw;
  }
  .MCO-btn-box1{
    position: relative;
    width: 100%;
    background: #fff;
  }
  .MCO-btn-left1{
    position: relative;
    width: 55%;
  }
  .MCO-btn-left1>p{
    position: relative;
    width: 100%;
    font-family: PingFang-SC-Medium;
    font-size: 5.866vw;
    color: #FAB100;
    padding-left: 10vw;
    line-height: 13.3vw;
  }
  .text-MCO1{
    position: relative;
    width: 100%;
    text-align: center;
    font-family: PingFang-SC-Medium;
    font-size: 4.266vw;
    text-align: center;
    line-height: 13.3vw;
  }
  .MCO-btn-right1{
    position: relative;
    width: 45%;
    background-image: linear-gradient(-134deg,#57D6CF 0%,#15D49F 100%);
    height: 14vw;
  }
  .MCO-btn-right1>p{
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 14vw;
  }
</style>

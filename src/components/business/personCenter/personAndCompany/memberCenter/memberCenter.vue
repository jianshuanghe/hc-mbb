<template>
    <div class="memberCenter-content">
      <topBox>
        <p class="title-putIn">VIP会员</p>
      </topBox>
      <div class="memberCenter-box">
        <div class="MCB-box">
          <!--tips-->
          <memberCenterTips v-if="UserData.vipState === '0'"></memberCenterTips>
          <!--账户-->
          <memberCenterAccount></memberCenterAccount>
          <!--开通-->
          <memberCenterOpen v-if="UserData.vipState !== '2'"></memberCenterOpen>
          <!--权益-->
          <memberCenterEquity></memberCenterEquity>
          <!--创意-->
          <memberCenterCreate></memberCenterCreate>
          <!--广告-->
          <memberCenterAd></memberCenterAd>
          <!--投放-->
          <memberCenterPutIn></memberCenterPutIn>
          <!--监测-->
          <memberCenterTest></memberCenterTest>
          <!--推广-->
          <memberCenterExtend></memberCenterExtend>
        </div>
        <div class="MCB-btn" v-if="UserData.vipState !== '2'">
          <!--立即开通-->
          <memberCenterAtOpen  v-if="!UserData.applyNum"></memberCenterAtOpen>
          <!--待付款状态-->
          <memberCenterCancelAtOpen v-else></memberCenterCancelAtOpen>
        </div>
      </div>
    </div>
</template>

<script>
  import topBox from './../../../../common/topBox';
  import memberCenterTips from './memberCenterItems/memberCenterTips';
  import memberCenterAccount from './memberCenterItems/memberCenterAccount';
  import memberCenterOpen from './memberCenterItems/memberCenterOpen';
  import memberCenterEquity from './memberCenterItems/memberCenterEquity';
  import memberCenterCreate from './memberCenterItems/memberCenterCreate';
  import memberCenterAd from './memberCenterItems/memberCenterAd';
  import memberCenterPutIn from './memberCenterItems/memberCenterPutIn';
  import memberCenterTest from './memberCenterItems/memberCenterTest';
  import memberCenterExtend from './memberCenterItems/memberCenterExtend';
  import memberCenterCancelAtOpen from './memberCenterItems/memberCenterCancelAtOpen';
  import memberCenterAtOpen from './memberCenterItems/memberCenterAtOpen';
  import { mapMutations, mapGetters } from 'vuex';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
    export default {
        name: 'memberCenter',
        components: {
          topBox,
          memberCenterTips,
          memberCenterAccount,
          memberCenterOpen,
          memberCenterEquity,
          memberCenterCreate,
          memberCenterAd,
          memberCenterPutIn,
          memberCenterTest,
          memberCenterExtend,
          memberCenterCancelAtOpen,
          memberCenterAtOpen
        },
        data () {
          return {
            UserData: {} // 接口返回的会员数据
          };
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          this.getUserData();
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
          }
        }
      };
</script>

<style scoped>
  .memberCenter-content{
    position: fixed;
    min-height: 100vh;
    background: #F9F9F9;
  }
  .MCB-box{
    position: fixed;
    width: 100%;
    height: 91vh;
    overflow: scroll;
    padding-bottom: 10vh;
  }
  .MCB-btn{
    position: fixed;
    bottom: 0;
    z-index: 106;
    width: 100%;
  }
</style>

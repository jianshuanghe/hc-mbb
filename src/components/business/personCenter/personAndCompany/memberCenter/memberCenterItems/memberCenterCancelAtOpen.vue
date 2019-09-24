<template>
  <div class="memberCenterAtOpen-content">
    <div class="memberCenterAtOpen">
      <div class="MCO-btn-box1">
        <div class="MCO-btn-left3 left" @click="CancelApplication">
          <p class="">撤销申请</p>
        </div>
        <div class="MCO-btn-right2 left">
          <div class="MCO-btn-right3 left">
            <p class=""><span class="text-MCO1">¥</span>999 <span class="text-MCO1">.00</span></p>
          </div>
          <div class="MCO-btn-right3 left">
            <p class="text-MCO1" @click="goToBuyMember">{{UserData.vipState === '0' ? '立即开通' : '立即续费'}}</p>
          </div>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <div>
      <confirm
        v-model="confirmShow"
        :show-cancel-button="true"
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
  import { Confirm } from 'vux';
  import { mapMutations, mapGetters } from 'vuex';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  export default {
    name: 'memberCenterCancelAtOpen',
    data () {
      return {
        confirmShow: false,
        confirmBtn: '确认',
        confirmTitle: '撤销申请',
        confirmText: '您是否确认撤销该会员申请?',
        UserData: {} // 接口返回的会员数据
      };
    },
    components: {
      Confirm
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
      },
      onCancel () {
        console.log('触发取消按钮');
      },
      onConfirm (msg) {
        console.log('触发撤销申请');
        this.$store.commit('setLoadingShow', true); // 更新vuex loading
        let params = {
          vipState: '2',
          vipApplyNum: this.UserData.applyNum
        };
        if (localStorage.getItem('landRegist')) {
          axios.post(this.api2 + '/rest-rp/vip/vipPay', params).then((response) => {
            console.log(response);
            if (response.data.ret === '200') {
              this.$store.commit('setLoadingShow', false); // 更新vuex loading
              Toast('撤销成功！');
              this.getUserData();
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
      CancelApplication () {
        this.confirmShow = true;
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
  .MCO-btn-left3{
    position: relative;
    width: 33.333%;
    height: 14vw;
  }
  .MCO-btn-left3>p{
    position: relative;
    width: 100%;
    font-family: PingFang-SC-Medium;
    font-size: 4.266vw;
    color: #fff;
    background: #cccccc;
    line-height: 14vw;
    text-align: center;
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
  .MCO-btn-right2{
    position: relative;
    width: 66.6666%;
    background-image: linear-gradient(-134deg,#57D6CF 0%,#15D49F 100%);
    height: 14vw;
  }
  .MCO-btn-right3{
    position: relative;
    width: 50%;
  }
  .MCO-btn-right3>p{
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 14vw;
  }
</style>

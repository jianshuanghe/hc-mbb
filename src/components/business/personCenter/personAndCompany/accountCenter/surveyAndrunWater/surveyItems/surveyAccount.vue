<template>
  <div class="content-SU">
    <div class="account-box">
      <div class="account-SU">
        <div class="my-account-SU">
          <p class="accout-title">账户余额 (元)</p>
          <p class="account-num">{{availableAmount}} <span class="unit">元</span></p>
          <p class="account-can">可用余额 {{UserData.money}}元 <span class="question" @click="question"><img :src="questionImg" alt=""
                                                                                             class="questionImg"></span></p>
        </div>
        <div>
          <confirm
            v-model="confirmShow"
            :show-cancel-button="false"
            :title=confirmTitle
            :confirm-text=confirmBtn
            @on-confirm="onConfirm">
            <p style="text-align:center;">{{confirmText}}</p>
          </confirm>
        </div>
      </div>
      <div class="amountMoney">
        <div class="amountMoney-box">
          <div class="amountMoney-cont">
            <div class="AM-box left">
              <p class="AM-title">今日充值 </p>
              <p class="AM-text-left">+{{UserData.toDayRechMoney}}.00</p>
            </div>
            <div class="AM-box left">
              <p class="AM-title MG-left">昨日花费 </p>
              <p class="AM-text-right MG-left">-{{UserData.yesterdayConsMoney}}.00</p>
            </div>
            <div class="clear"></div>
            <div class="Y-line-box">
              <div class="Y-line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Confirm } from 'vux';
  import questionImg from '@/assets/images/business/home/extendManageList/question.png';
  import { mapMutations } from 'vuex';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  export default {
    name: 'surveyAccount',
    components: {
      Confirm
    },
    data () {
      return {
        questionImg: questionImg,
        UserData: {}, // 接口返回的会员数据
        availableAmount: 0, // 可用余额
        confirmShow: false,
        confirmBtn: '知道了',
        confirmTitle: '什么是可用余额？',
        confirmText: '可用余额：即账户余额减去冻结金额后的余额。'
      };
    },
    created () {
      if (this.EVN === 'production') {
        axios.defaults.baseURL = this.apiProd2;
      }
      this.getUserData();
    },
    methods: {
      ...mapMutations({
        setLoadingShow: 'setLoadingShow',
        setLoadingText: 'setLoadingText'
      }),
      getUserData () {
        console.log('获取账户中心，账户数据');
        this.$store.commit('setLoadingShow', true); // 更新vuex loading
        let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
        console.log(landRegistLG.user.id);
        axios.get(this.api2 + '/rest-rp/compAccount/' + landRegistLG.user.id).then((response) => {
          console.log(response);
          if (response.data.ret === '200') {
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            this.UserData = response.data.content;
            console.log(Number(this.UserData.money), '可用金额判断条件');
            if (Number(this.UserData.money) === 0) {
              this.availableAmount = 0;
            } else {
              this.availableAmount = Number(this.UserData.money) + Number(this.UserData.frozenMoney);
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
      question () {
        this.confirmShow = true;
      },
      onConfirm (msg) {
        console.log('on confirm');
        if (msg) {
          alert(msg);
        }
      }
    }
  };
</script>

<style scoped>
  .content-SU{
    position: relative;
    width: 100vw;
    background: #fff;
  }
  .account-box{
    position: relative;
    width: 100%;
  }
  .account-SU{
    position: relative;
    width: 100%;
    height: 47.2vw;
    background-image: linear-gradient(-134deg,#57D6CF 0%,#15D49F 100%);
    box-shadow: 0 2px 10px 0 rgba(2,194,162,0.30);
  }

  .my-account-SU{
    position: relative;
    width: 100%;
    padding-top: 7vw;
  }
  .accout-title{
    position: relative;
    width: 100%;
    font-size: 3.5vw;
    line-height: 5vw;
    color: #fff;
    text-align: center;
  }
  .account-num{
    position: relative;
    width: 100%;
    font-size: 9vw;
    color: #fff;
    text-align: center;
  }
  .account-num>span{
    position: relative;
    font-size: 3.5vw;
    line-height: 9vw;
    color: #fff;
  }
  .account-can{
    position: relative;
    width: 100%;
    font-size: 3.5vw;
    line-height: 5vw;
    color: #fff;
    text-align: center;
  }
  .account-can>span{
    position: relative;
    font-size: 3.5vw;
    line-height: 9vw;
    color: #fff;
  }
  .questionImg{
    position: relative;
    width: 3.5vw;
    top: 0.5vw;
  }
  .amountMoney{
    position: relative;
    width: 100%;
  }
  .amountMoney-box{
    position: relative;
    width: 100%;
    height: 20vw;
  }
  .amountMoney-cont{
    position: relative;
    width: 89.33vw;
    margin: 0 auto;
    top: -11vw;
    background: #FFFFFF;
    -webkit-box-shadow: 0 4px 12px 0 rgba(226,226,226,0.50);
    box-shadow: 0 4px 12px 0 rgba(226,226,226,0.50);
    border-radius: 3px;
    padding: 4vw 8vw;

  }
  .AM-box{
    position: relative;
    width: 50%;
  }
  .AM-title{
    font-family: PingFang-SC-Medium;
    font-size: 3.5vw;
    color: #000000;
    letter-spacing: 0;
    line-height: 7vw;
  }
  .AM-text-left{
    font-family: PingFangSC-Medium;
    font-size: 4.8vw;
    color: #02C2A2;
    letter-spacing: 0;
    line-height: 7vw;
  }
  .AM-text-right{
    font-family: PingFangSC-Medium;
    font-size: 4.8vw;
    color: #FF4D6A;
    letter-spacing: 0;
    line-height: 7vw;
  }
  .Y-line-box{
    position: absolute;
    right: 50%;
    height: 10vw;
    width: 2px;
    top: 28%;
    z-index: 109;
  }
  .MG-left{
    margin-left: 10vw;
  }
</style>

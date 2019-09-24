<template>
  <div class="PayResult-content">
    <div class="PayResult">
      <div class="PR-top">
        <p class="">{{payTitle}}</p>
        <div class="PR-time">
          <div :class="payAnimate ? 'timeRound ' : 'timeRound1'">
            <img :src="timeRoud" alt="" class="">
          </div>
          <div class="timeBox-text">
            <p class="timeText" v-if="payAnimate">{{time}}S</p>
            <img :src="payImg" alt="" class="payResout" v-else>
          </div>
        </div>
      </div>
      <div class="PR-tips">
        <p class="tips1-PR">温馨提示:</p>
        <p class="tips2-PR">结果返回前，请不要重复支付</p>
      </div>
    </div>
  </div>
</template>

<script>
  import timeRoud from '@/assets/images/common/timeRoud.png';
  import success from '@/assets/images/success.png';
  import error from '@/assets/images/error.png';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
    export default {
        name: 'PayResult',
        components: {
        },
        data () {
          return {
            payResult: false, // 支付结果
            payAnimate: true, // 支付动画
            payTitle: '正等待支付宝返回结果…',
            payImg: '', // 支付结果返回时展示的图片
            timeRoud: timeRoud,
            success: success,
            error: error,
            time: 0 // 记录请求时间
          };
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
        },
        mounted () {
          let j = setInterval(() => {
            this.time++;
            console.log(this.time);
            if (this.time >= 2) { // 两秒之后轮询接口
              this.getPayResultData();
            };
            if (this.time >= 15 && this.payResult === false) {
              window.clearInterval(j);
              this.payTitle = '支付失败了！';
              this.payAnimate = false; // 停止动画
              this.payImg = this.error; // 失败
              Toast('支付失败');
            };
          }, 1000);
        },
        methods: {
          getPayResultData () {
            console.log('获取支付结果数据');
            axios.get(this.api2 + '/rest-rp/vip/selectPayNumByState?out_trade_no=' + this.$route.query.out_trade_no).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.payTitle = '支付成功！';
                this.payResult = true;
                this.payImg = this.success; // 失败
                Toast('支付成功');
                this.payAnimate = false; // 停止动画
                setTimeout(() => {
                  this.$router.push({
                    path: '/memberCenter',
                    query: { }
                  });
                }, 1000);
              }
            }).catch((error) => {
              console.log(error, '网络繁忙，请稍后');
              this.payAnimate = false; // 停止动画
            });
          }
        }
      };
</script>

<style scoped>
  .PayResult-content{
    position: relative;
    width: 100%;
    height: 100vh;
    background: #F2F2F2;
  }
  .PayResult{
    position: relative;
    width: 100%;
  }
  .PR-top{
    position: relative;
    width: 100%;
    background: #fff;
    padding: 4vw 0 12vw 0;
  }
  .PR-top>p{
    position: relative;
    width: 100%;
    text-align: center;
    font-family: PingFang-SC-Bold;
    font-size: 4.2vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 10vw;
    margin-bottom: 10vw;
  }
  .payResout{
    position: relative;
    width: 90%;
    height: 90%;
    margin: 5%;
  }
  .PR-time{
    position: relative;
    width: 24vw;
    height: 24vw;
    margin: auto;
  }
  .timeRound1{
    position: relative;
    width: 100%;
  }
  .timeRound1>img{
    position: relative;
    width: 100%;
  }
  .timeRound{
    position: relative;
    width: 100%;
  }
  .timeRound>img{
    position: relative;
    width: 100%;
    animation:lds-hourglass 1s infinite
  }
  @keyframes lds-hourglass {
    0% {
      transform:rotate(0);
    }
    100% {
      transform:rotate(360deg)
    }
  }
  .timeBox-text{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    border-radius: 50%;
    background: #fff;
  }
  .timeText{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 7vw;
    font-weight: 550;
  }
  .PR-tips{
    position: relative;
    width: 100%;
    padding: 4vw;
  }
  .tips1-PR{
    font-family: PingFangSC-Regular;
    font-size: 3.2vw;
    color: #9B9B9B;
    letter-spacing: 0;
    line-height: 5vw;
  }
  .tips2-PR{
    font-family: PingFangSC-Regular;
    font-size: 3.2vw;
    color: #FAB100;
    letter-spacing: 0;
    line-height: 10vw;
  }
</style>

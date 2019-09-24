<template>
  <div class="content">
      <div class="account-box">
        <div class="account">
          <div class="person-box">
            <div class="person-img left"  @click="clickQuickBtn">
              <img :src="UserData.headImg || 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png'" alt="" class="">
            </div>
            <div class="person-name left">
              <p class="">{{UserData.nickname || '用户昵称'}}</p>
            </div>
            <div class="clear"></div>
          </div>
          <div class="my-account">
            <p class="accout-title">账户余额 (元)</p>
            <p class="account-num">{{availableAmount}} <span class="unit">元</span></p>
            <p class="account-can">可用余额 {{msgData.money}}元 <span class="question" @click="question"><img src="./../../../../assets/images/business/home/extendManageList/question.png" alt=""
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
      </div>
  </div>
</template>

<script>
    import { Confirm, Loading } from 'vux';
    import axios from 'axios';
    import { Toast } from 'mint-ui';
    import { mapMutations } from 'vuex';
    export default {
        name: 'account',
        components: {
          Confirm,
          Loading
        },
        data () {
          return {
            loadingShow: false, // loading
            accountData: '', // 个人账户信息数据
            confirmShow: false,
            confirmBtn: '知道了',
            confirmTitle: '什么是可用余额？',
            confirmText: '可用余额：即账户余额减去冻结金额后的余额。',
            availableAmount: 0, // 可用余额
            UserData: {} // 用户信息全部
          };
        },
        props: ['msgData'],
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          if (localStorage.getItem('UserData')) { // 获取缓存中的用户信息
            this.UserData = JSON.parse(localStorage.getItem('UserData'));
          };
          this.getAccountData();
        },
        methods: {
          ...mapMutations({
            setQuickNavShow: 'setQuickNavShow',
            setTrendKan: 'setTrendKan',
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          getAccountData () { // 获取账户信息
            console.log('获取账户信息');
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            console.log(landRegistLG.user.id);
            axios.get(this.api2 + '/rest-rp/putIn/' + landRegistLG.user.id).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.accountData = response.data.content;
                console.log(Number(this.accountData.money), '可用金额判断条件');
                if (Number(this.accountData.money) === 0) {
                  this.availableAmount = 0;
                } else {
                  this.availableAmount = Number(this.accountData.money) + Number(this.accountData.frozenMoney);
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
          clickQuickBtn () {
            this.$store.commit('setQuickNavShow', true);
            console.log('触发快捷导航按钮');
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
  .content{
    position: relative;
    width: 100vw;
    padding: 2vw 4vw;
    background: #fff;
  }
  .account-box{
    position: relative;
    width: 100%;
  }
  .account{
    position: relative;
    width: 100%;
    height: 47.2vw;
    background-image: linear-gradient(-134deg,#57D6CF 0%,#15D49F 100%);
    box-shadow: 0 2px 10px 0 rgba(2,194,162,0.30);
    border-radius: 4px;
  }
  .person-box{
    position: relative;
    width: 90%;
    margin-left: 5%;
    padding-top: 5vw;
  }
  .person-img{
    position: relative;
    width: 10vw;
    height: 10vw;
  }
  .person-img>img{
    position: relative;
    width: 100%;
    border-radius: 50%;
    height: 100%;
  }
  .person-name{
    position: relative;
    width: 60%;
  }
  .person-name>p{
    position: relative;
    font-family: PingFang-SC-Medium;
    font-size: 4.5vw;
    color: #FFFFFF;
    letter-spacing: 0;
    margin-left: 2vw;
    line-height: 10vw;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .my-account{
    position: relative;
    width: 100%;
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
</style>

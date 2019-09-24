<template>
  <div class="landRegistration-content">
    <div class="landRegistration">
      <div class="phone-passWord-LR">
        <!--手机号登录-->
        <div class="phonw-LR">
          <div class="top-PWLR">
            <img :src="logo" alt="" class="">
          </div>
          <div class="LR-cont">
            <div class="inputPhone-PLR">
              <x-input name="mobile" placeholder="请输入手机号码" keyboard="number" :show-clear='false'  v-model="phoneLand.phone"></x-input>
              <div class="line"></div>
            </div>
            <div class="inputYan-PLR">
              <div class="yan-left-PLR left">
                <x-input name="mobile" placeholder="请输入验证码" keyboard="number" :show-clear='false'  v-model="phoneLand.code"></x-input>
              </div>
              <div class="ma-right-PLR left">
                <!--<p class="">获取验证码</p>-->
                <div v-bind:class="{ yazm: isOvertime , 're-yazm': !isOvertime }" slot="right" type="primary" action-type="button" mini @click="sendMessage">{{word}}</div>
              </div>
              <div class="clear"></div>
              <div class="line"></div>
            </div>
          </div>
        </div>
        <div class="landBtn">
          <div class="" >
            <!--登录-->
            <div class="land-btn-box" @click="bindPhone">
              <p class="">绑定</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { XInput, Loading } from 'vux';
  import { Toast } from 'mint-ui';
  import logo from '@/assets/images/business/home/landRegistration/logo.png';
  import axios from 'axios';
  import { mapMutations } from 'vuex';
  // var querystring = require('querystring');

  export default {
    name: 'bindPhone',
    components: {
      XInput,
      Loading
    },
    data () {
      return {
        logo: logo,
        loadingShow: false, // loading
        isOvertime: false,
        phoneLand: { // 账号登录
          phone: '',
          code: '',
          passWord: '' // 设置密码
        },
        queryParams: {}, // 链接上的参数
        word: '发送验证码',
        setPassWorld: false, // 设置密码，true，需要用户设置密码
        landType: 1 // 登录方式默认 1 账号登录， 2密码登录
      };
    },
    created () {
      // 绑定 http://10.158.41.177:8080/#/?userId=964&token=E101605CAA9700410B44EF5D5C0A826C687CA085E4C831CFF5ED492F5C6D86EBDAFD7D5852C4C1559FE7F9162D7B3E71155A0F793DB0E374&uuid=59a356d3-e002-49c5-8cd3-574baf4ad91c
      // 未绑定: http://10.158.41.177:8080/#/bindPhone?compLogo=http%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FQ0j4TwGTfTIBhKlVSP7RQupqnV4iaYfvqoDoSBjOdaL65OEWdpkibNicKCP7AFicSbkLMOiceZ6TXicdica30FYNMFF7g%2F132&wxId=ocggxv_pYwDrxjWR_tP4M8eRXGJM&nickname=%E8%8F%85%E5%8F%8C%E9%B9%A4&openId=oUeVP1e6PCC7ca_fhivW4qVqp8Xc&uuid=99be59fc-5874-41f5-8421-df4f15894d87
      this.queryParams = this.$route.query;
      if (localStorage.getItem('UUID') && localStorage.getItem('UUID') === this.queryParams.uuid) { // 存在UUID，说明是本手机触发的微信登录 校验uuid一致性
        localStorage.setItem('bindPhone', JSON.stringify(this.queryParams)); // 缓存用户网页授权信息
      } else { // 不存在UUID，或者校验不一致
        this.$router.push({
          path: '/',
          query: { }
        });
        localStorage.clear(); // 清除缓存
      }
      console.log(this.$route.query, '连接参数！');
    },
    mounted () {
    },
    methods: {
      ...mapMutations({
        setLoadingShow: 'setLoadingShow',
        setLoadingText: 'setLoadingText'
      }),
      sendMessage () {
        let phone = this.phoneLand.phone;
        if (phone === '') { // 校验手机号不能为空
          Toast('手机号为不能为空');
          return false;
        };
        if (!(/^1[34578]\d{9}$/.test(phone))) { // 校验手机号格式
          Toast('手机号码有误,请重填');
          return false;
        } else {
          if (this.isOvertime) {
            return false;
          }
          this.getCode();  // 获取验证码方法
        };
      },
      sendState () { // 成功发送短信倒计时
        let that = this;
        let time = 60;
        let sendTimer = setInterval(function () {
          that.isOvertime = true;
          time--;
          that.word = '重新获取(' + time + 's)';
          if (time < 0) {
            that.isOvertime = false;
            clearInterval(sendTimer);
            that.word = '获取验证码';
          };
        }, 1000);
      },
      getCode () {
        this.$store.commit('setLoadingShow', true); // 更新vuex loading
        let params = { // 发送短信参数
          phone: this.phoneLand.phone,
          businessName: '1',
          portal: 'ruhexiu'
        };
        if (this.EVN === 'production') {
          axios.defaults.baseURL = this.apiProd1;
        }
        axios.post(this.api1 + '/rest-sso/phoneSms', params).then((response) => {
          console.log(response);
          if (response.data.ret === '200') {
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            Toast('短信发送成功！');
            this.sendState(); // 倒计时
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
      bindPhone () { // 手机号登录
        let code = this.phoneLand.code;
        let phone = this.phoneLand.phone;
        if (phone === '') { // 校验手机号不能为空
          Toast('手机号为不能为空');
          return false;
        };
        if (!(/^1[34578]\d{9}$/.test(phone))) { // 校验手机号格式
          Toast('手机号码有误,请重填');
          return false;
        };
        if (code === '') { // 短信验证码不能为空
          Toast('短信验证码不能为空');
          return false;
        };
        if (!(/^\d{4}$/.test(code))) { // 校验验证码格式
          Toast('验证码格式有误,请重填');
          return false;
        } else {
          this.$store.commit('setLoadingShow', true); // 更新vuex loading
          let params = { // 登录参数
            phone: this.phoneLand.phone,
            portal: 'ruhexiu',
            businessName: '1',
            phoneCode: this.phoneLand.code
          };
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd1;
          }
          axios.post(this.api1 + '/rest-sso/phoneSmsVali', params).then((response) => {
            console.log(response);
            if (response.data.ret === '200') {
              this.$store.commit('setLoadingShow', false); // 更新vuex loading
              this.bindPhoneNum(); // 绑定手机号
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
      bindPhoneNum () { // 绑定手机号
        console.log('绑定手机号');
        let params = { // 登录参数
          compLogo: this.queryParams.compLogo,
          nickname: this.queryParams.nickname,
          wxId: this.queryParams.wxId,
          phone: this.phoneLand.phone,
          openId: this.queryParams.openId
        };
        if (this.EVN === 'production') {
          axios.defaults.baseURL = this.apiProd2;
        }
        axios.post(this.api2 + '/rest-rp/mbUser/reg', params).then((response) => {
          console.log(response);
          if (response.data.ret === '200') {
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            let landRegist = {
              sign: response.data.content.token,
              user: {
                id: response.data.content.userId
              }
            };
            localStorage.setItem('landRegist', JSON.stringify(landRegist)); // 缓存用户登录信息
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
      },
      getUserData () {
        console.log('获取用户信息，全部');
        let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
        console.log(landRegistLG.user.id);
        this.$store.commit('setLoadingShow', true); // 更新vuex loading
        if (this.EVN === 'production') {
          axios.defaults.baseURL = this.apiProd2;
        }
        axios.get(this.api2 + '/rest-rp/user/' + landRegistLG.user.id).then((response) => {
          console.log(response);
          if (response.data.ret === '200') {
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            let UserData = response.data.content;
            localStorage.setItem('UserData', JSON.stringify(UserData)); // 缓存用户信息
            Toast({
              message: '登陆成功！',
              duration: 500
            });
            setTimeout(() => {
              this.$router.back(-1);
            }, 1000);
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
        console.log('to代理商注册');
        this.$router.push({
          path: '/agentRegistration',
          query: { }
        });
      }
    }
  };
</script>

<style scoped>
  .landRegistration-content{
    position: relative;
    width: 100%;
    height: 100vh;
    background: #fff;
  }
  .landRegistration{
    position: relative;
    width: 100%;
    padding: 7vw;
  }
  .phone-passWord-LR{
    position: relative;
    width: 100%;
    margin-top: 12vw;
  }
  .phonw-LR{
    position: relative;
    width: 100%;
    margin-top: 6vw;
  }
  .top-PLR{
    position: relative;
    width: 100%;
  }
  .top-PLR>p{
    font-family: PingFangSC-Semibold;
    font-size: 6.4vw;
    color: #2E2E30;
    line-height: 10vw;
  }
  .LR-cont{
    position: relative;
    width: 100%;
    margin-top: 8vw;

  }
  .inputPhone-PLR{
    position: relative;
    width: 100%;
    margin-top: 5vw;
  }
  .inputYan-PLR{
    position: relative;
    width: 100%;
    margin-top: 6vw;

  }
  .yan-left-PLR{
    position: relative;
    width: 60%;
  }
  .ma-right-PLR{
    position: relative;
    width: 40%;
  }
  .yazm{
    font-family: PingFangSC-Light;
    font-size: 4vw;
    color: #ccc;
    line-height: 12vw;
    text-align: right;
  }
  .re-yazm{
    font-family: PingFangSC-Light;
    font-size: 4vw;
    color: #02C2A2;
    line-height: 12vw;
    text-align: right;
  }
  .switchPassWorld>p{
    font-family: PingFangSC-Light;
    font-size: 3.5vw;
    color: #02C2A2;
    line-height: 12vw;
    width: 50%;
  }
  .top-PWLR{
    position: relative;
    width: 33.6vw;
    margin-top: 6vw;
    margin: auto;
  }
  .top-PWLR>img{
    position: relative;
    width: 100%;
  }
  .landBtn{
    position: relative;
    width: 100%;
    margin-top: 8vw;
  }
  .land-btn-box{
    position: relative;
    width: 100%;
    height: 12vw;
    margin-bottom: 6vw;
  }
  .land-btn-box>p{
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 12vw;
    background: #02C2A2;
  }
</style>

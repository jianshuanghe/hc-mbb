<template>
  <div class="landRegistration-content">
    <div class="landRegistration">
      <div class="phone-passWord-LR">
        <!--手机号登录-->
        <div class="phonw-LR">
          <div class="top-PLR1">
            <p class="">{{this.$route.query.content === 4 ? '修改密码' : '找回密码'}}</p>
            <div class="line"></div>
          </div>
          <div class="LR-cont">
            <div class="inputPhone-PLR">
              <x-input name="mobile" placeholder="请输入手机号码" keyboard="number" :show-clear='false'  v-model="phone"></x-input>
              <div class="line"></div>
            </div>
            <div class="inputYan-PLR">
              <div class="yan-left-PLR left">
                <x-input name="mobile" placeholder="请输入验证码" keyboard="number" :show-clear='false'  v-model="code"></x-input>
              </div>
              <div class="ma-right-PLR left">
                <div v-bind:class="{ yazm: isOvertime , 're-yazm': !isOvertime }" slot="right" type="primary" action-type="button" mini @click="sendMessage">{{word}}</div>
              </div>
              <div class="clear"></div>
              <div class="line"></div>
            </div>
            <div class="inputPhone-PLR">
              <x-input name="mobile" type="password" placeholder="请输入新密码" keyboard="number" :show-clear='false'  v-model="passWord"></x-input>
              <div class="line"></div>
            </div>
            <div class="inputPhone-PLR">
              <x-input name="mobile" type="password" placeholder="确认新密码" keyboard="number" :show-clear='false'  v-model="passWord1"></x-input>
              <div class="line"></div>
            </div>
          </div>
        </div>
        <!--登录按钮-->
        <div class="landBtn">
          <div class="">
            <!--登录-->
            <div class="land-btn-box" @click="clickSubmit">
              <p class="">提交</p>
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
  import axios from 'axios';
  import { mapMutations } from 'vuex';
  export default {
    name: 'forgetPassWord',
    components: {
      XInput,
      Loading
    },
    data () {
      return {
        loadingShow: false, // loading
        word: '发送验证码',
        isOvertime: false,
        phone: '',
        code: '',
        passWord: '', // 输入新密码
        passWord1: '' // 确认新密码
      };
    },
    created () {
      if (!this.$route.query.isRouter) {
        localStorage.removeItem('tabItems'); // 移除用户点击tabbar缓存数据
        localStorage.removeItem('UserData'); // 移除用户信息缓存数据
        localStorage.removeItem('landRegist'); // 移除用户登录缓存数据
        localStorage.removeItem('userId'); // 移除用户登录缓存数据
      }
    },
    mounted () {},
    methods: {
      ...mapMutations({
        setLoadingShow: 'setLoadingShow',
        setLoadingText: 'setLoadingText'
      }),
      sendMessage () {
        let phone = this.phone;
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
          phone: this.phone,
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
      clickSubmit () {
        console.log('触发提交按钮');
        let phone = this.phone;
        let code = this.code;
        let passWord = this.passWord;
        let passWord1 = this.passWord1;
        if (phone === '') { // 校验手机号不能为空
          Toast('手机号为不能为空');
          return false;
        };
        if (!(/^1[34578]\d{9}$/.test(phone))) { // 校验手机号格式
          Toast('手机号码有误,请重填');
          return false;
        }
        if (code === '') { // 短信验证码不能为空
          Toast('短信验证码不能为空');
          return false;
        };
        if (!(/^\d{4}$/.test(code))) { // 校验验证码格式
          Toast('验证码格式有误,请重填');
          return false;
        };
        if (passWord === '') { // 密码不能为空
          Toast('密码不能为空');
          return false;
        };
        if (passWord.length < 6) { // 密码不能为空
          Toast('密码不能少于6个字符');
          return false;
        };
        if (passWord1 === '') { // 确认密码不能为空
          Toast('确认密码不能为空');
          return false;
        };
        if (passWord1 !== passWord) { // 两次输入密码不一致
          Toast('两次输入密码不一致！');
          return false;
        } else {
          this.$store.commit('setLoadingShow', true); // 更新vuex loading
          let params = { // 登录参数
            phone: this.phone,
            loginType: '0',
            phoneCode: this.code
          };
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          axios.post(this.api2 + '/rest-rp/mbUser/login', params).then((response) => {
            console.log(response);
            if (response.data.ret === '200') {
              let landRegist = response.data.content;
              localStorage.setItem('landRegist', JSON.stringify(landRegist)); // 缓存用户登录信息
              let params = {
                passWord: this.passWord
              };
              if (localStorage.getItem('landRegist')) {
                let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
                console.log(landRegistLG.user.id);
                if (this.EVN === 'production') {
                  axios.defaults.baseURL = this.apiProd2;
                }
                axios.post(this.api2 + '/rest-rp/user/' + landRegistLG.user.id, params).then((response) => {
                  console.log(response);
                  if (response.data.ret === '200') {
                    this.$store.commit('setLoadingShow', false); // 更新vuex loading
                    Toast('密码重置成功！');
                    localStorage.removeItem('landRegist'); // 移除用户登录信息
                    console.log('清空用户信息');
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
      goToMaterial () {
        console.log('to个人资料');
        this.$router.push({
          path: '/personMaterial',
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
  }
  .phone-passWord-LR{
    position: relative;
    width: 100%;
  }
  .phonw-LR{
    position: relative;
    width: 100%;
  }
  .top-PLR1{
    position: relative;
    width: 100%;
  }
  .top-PLR1>p{
    ont-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #2E2E30;
    letter-spacing: 0;
    text-align: center;
    line-height: 12vw;
  }
  .LR-cont{
    position: relative;
    width: 100%;
    padding: 7vw;

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
  .top-PWLR>img{
    position: relative;
    width: 100%;
  }
  .landBtn{
    position: relative;
    width: 100%;
    margin-top: 8vw;
    padding: 7vw;
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

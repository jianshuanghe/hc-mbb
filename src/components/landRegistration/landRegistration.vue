<template>
  <div class="landRegistration-content">
    <div class="landRegistration">
      <div class="phone-passWord-LR">
        <!--手机号登录-->
        <div class="phonw-LR" v-if="landType === 1 && !setPassWorld">
          <div class="top-PLR">
            <p class="">你好，<br/>
              欢迎来到陌拜商机</p>
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
            <div class="switchPassWorld">
              <p class="" @click="clickPassWordLand">账号密码登录</p>
            </div>
          </div>
        </div>
        <!--账号登陆-->
        <div class="passWord-LR" v-if="landType === 2 && !setPassWorld">
          <div class="top-PWLR">
            <img :src="logo" alt="" class="">
          </div>
          <div class="LR-cont">
            <div class="inputPhone-PLR">
              <x-input name="mobile" placeholder="请输入手机号码" keyboard="number" :show-clear='false'  v-model="passWordLand.phone"></x-input>
              <div class="line"></div>
            </div>
            <div class="inputPhone-PLR">
              <x-input name="mobile" placeholder="请输入登录密码" keyboard="number" type="password"  :show-clear='false'  v-model="passWordLand.passWord"></x-input>
              <div class="line"></div>
            </div>
            <div class="switchPassWorld">
              <p class="left"  @click="clickPhoneLand">手机号验证码登录</p>
              <p class="right text-Right" @click="clickForgetPassWord">忘记密码</p>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <!--设置密码-->
        <div class="passWord-LR" v-if="setPassWorld">
          <div class="top-PWLR">
            <img :src="logo" alt="" class="">
          </div>
          <div class="LR-cont">
            <div class="inputPhone-PLR">
              <x-input name="mobile" placeholder="请设置登录密码" keyboard="number" :show-clear='false'  v-model="phoneLand.passWord"></x-input>
              <div class="line"></div>
            </div>
          </div>
        </div>
        <!--登录按钮-->
        <div class="landBtn">
          <div class="" v-if="!setPassWorld">
            <!--登录-->
            <div class="land-btn-box" @click="clickLand">
              <p class="">登录</p>
            </div>
            <!--微信登录-->
            <div class="land-btn-box" @click="clickWxLand" v-if="browserType === 'WX'">
              <p class="wx-land">微信账号登录</p>
            </div>
          </div>
          <!--保存密码-->
          <div class="land-btn-box"  v-if="setPassWorld" >
            <p class=""@click="clickSetPassWorld">保存</p>
            <div class="skipLand" @click="clickSkipLand">
              <p class="">暂不设置</p>
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
    import { LAND_REGISTRATION } from '@/utils/restUrl.js';
    import { mapMutations } from 'vuex';
    // var querystring = require('querystring');

    export default {
        name: 'landRegistration',
        components: {
          XInput,
          Loading
        },
        data () {
          return {
            browserType: '', // 判断浏览器
            logo: logo,
            loadingShow: false, // loading
            isOvertime: false,
            phoneLand: { // 账号登录
              phone: '',
              code: '',
              passWord: '' // 设置密码
            },
            passWordLand: { // 密码登录
              phone: '',
              passWord: ''
            },
            word: '发送验证码',
            setPassWorld: false, // 设置密码，true，需要用户设置密码
            landType: 1, // 登录方式默认 1 账号登录， 2密码登录
            password: '' // 记录后台返回账户的密码
          };
        },
        created () {
          if (localStorage.getItem('landRegist')) {
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            if (landRegistLG.user.password === '' || landRegistLG.user.password === null || landRegistLG.user.password === undefined) {
              this.setPassWorld = true; // 设置密码显示
            }
          } else {
            localStorage.setItem('tabItems', 1);
          }
          if (localStorage.getItem('landType')) {
            this.landType = Number(localStorage.getItem('landType'));
          };
          if (localStorage.getItem('browserType') === 'WX') {
            this.browserType = 'WX';
          } else if (localStorage.getItem('browserType') === 'FWX') {
            this.browserType = 'FWX';
          }
        },
        mounted () {
          console.log(LAND_REGISTRATION, this.api2);
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
          clickPassWordLand () {
            console.log('触发账号密码登录按钮');
            this.landType = 2;
            localStorage.setItem('landType', this.landType); // 缓存登录方式
          },
          clickPhoneLand () {
            console.log('触发手机号登录按钮');
            this.landType = 1;
            localStorage.setItem('landType', this.landType); // 缓存登录方式
          },
          clickForgetPassWord () {
            console.log('触发忘记密码按钮');
            this.$router.push({
              path: '/forgetPassWord',
              query: { }
            });
          },
          clickLand () {
            console.log('触发登录按钮');
            if (this.landType === 1) { // 手机号登陆
              console.log('手机号登录');
              this.phoneLandFn();
            } else if (this.landType === 2) { // 密码登录
              console.log('密码登录');
              this.passWordLandFn();
            }
          },
          phoneLandFn () { // 手机号登录
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
                loginType: '0',
                phoneCode: this.phoneLand.code
              };
              if (this.EVN === 'production') {
                axios.defaults.baseURL = this.apiProd2;
              }
              axios.post(this.api2 + '/rest-rp/mbUser/login', params).then((response) => {
                console.log(response);
                if (response.data.ret === '200') {
                  this.$store.commit('setLoadingShow', false); // 更新vuex loading
                  let landRegist = {
                    sign: response.data.content.sign,
                    user: {
                      id: response.data.content.user.id
                    }
                  };
                  localStorage.setItem('landRegist', JSON.stringify(landRegist)); // 缓存用户登录信息
                  console.log('登陆成功！');
                  this.password = response.data.content.user.password; // 村密码
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
          passWordLandFn () { // 密码登录
            let phone = this.passWordLand.phone;
            let passWord = this.passWordLand.passWord;
            console.log(this.passWordLand);
            if (phone === '') { // 校验手机号不能为空
              Toast('手机号为不能为空');
              return false;
            };
            if (!(/^1[34578]\d{9}$/.test(phone))) { // 校验手机号格式
              Toast('手机号码有误,请重填');
              return false;
            }
            if (passWord === '') { // 校验密码不能为空
              Toast('密码为不能为空');
              return false;
            }
            if (passWord.length < 6) { // 密码不能为空
              Toast('密码不能少于6个字符');
              return false;
            };
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            let params = { // 登录参数
              phone: this.passWordLand.phone,
              loginType: '1',
              passWord: this.passWordLand.passWord
            };
            if (this.EVN === 'production') {
              axios.defaults.baseURL = this.apiProd2;
            }
            axios.post(this.api2 + '/rest-rp/mbUser/login', params).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                let landRegist = {
                  sign: response.data.content.sign,
                  user: {
                    id: response.data.content.user.id
                  }
                };
                localStorage.setItem('landRegist', JSON.stringify(landRegist)); // 缓存用户登录信息
                this.password = response.data.content.user.password; // 村密码
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
            if (this.EVN === 'production') {
              axios.defaults.baseURL = this.apiProd2;
            }
            axios.get(this.api2 + '/rest-rp/user/' + landRegistLG.user.id).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                let UserData = response.data.content;
                localStorage.setItem('UserData', JSON.stringify(UserData)); // 缓存用户信息
                if (this.password === '' || this.password === null || this.password === undefined) { // 查询没有密码，去设置密码
                  this.setPassWorld = true; // 设置密码显示
                } else { // 查询存在密码 返回登录
                  Toast({
                    message: '登陆成功！',
                    duration: 500
                  });
                  setTimeout(() => {
                    this.$router.back(-1);
                  }, 500);
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
          clickSetPassWorld () {
            console.log('触发保存密码按钮');
            let passWord = this.phoneLand.passWord;
            if (passWord === '') { // 密码不能为空
              Toast('密码不能为空');
              return false;
            };
            if (passWord.length < 6) { // 密码不能为空
              Toast('密码不能少于6个字符');
              return false;
            };
            let params = {
              passWord: this.phoneLand.passWord
            };
            if (localStorage.getItem('landRegist')) {
              let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
              console.log(landRegistLG.user.id);
              this.$store.commit('setLoadingShow', true); // 更新vuex loading
              if (this.EVN === 'production') {
                axios.defaults.baseURL = this.apiProd2;
              }
              axios.post(this.api2 + '/rest-rp/user/' + landRegistLG.user.id, params).then((response) => {
                console.log(response);
                if (response.data.ret === '200') {
                  this.$store.commit('setLoadingShow', false); // 更新vuex loading
                  Toast({
                    message: '登陆成功！',
                    duration: 500
                  });
                  if (localStorage.getItem('landRegist')) {
                    let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
                    landRegistLG.user.password = this.phoneLand.passWord;
                    localStorage.setItem('landRegist', JSON.stringify(landRegistLG)); // 缓存用户登录信息
                  }
                  setTimeout(() => {
                    this.$router.back(-1);
                  }, 500);
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
          clickSkipLand () {
            console.log('触发暂不设置');
            this.$router.back(-1);
          },
          clickWxLand () {
            console.log('触发微信登录');
            let UUID = this.generateUUID(); // 用户唯一ID
            localStorage.setItem('UUID', UUID);
            if (this.EVN === 'production') {
              window.location.href = this.apiProd2 + '/rest-rp/mbUser/goWxLogin?uuid=' + UUID;
            } else {
              window.location.href = this.api2 + '/rest-rp/mbUser/goWxLogin?uuid=' + UUID;
            }
          },
          generateUUID () { // 生成用户唯一ID
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
              var r = (d + Math.random() * 16) % 16 | 0;
              d = Math.floor(d / 16);
              return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
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
  .switchPassWorld{
    position: relative;
    width: 100%;
  }
  .switchPassWorld>p{
    font-family: PingFangSC-Light;
    font-size: 3.5vw;
    color: #02C2A2;
    line-height: 12vw;
    width: 50%;
  }
  .passWord-LR{
    position: relative;
    width: 100%;
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
  .wx-land{
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #02C2A2 !important;
    letter-spacing: 0;
    text-align: center;
    line-height: 12vw;
    border: 1px solid #E2E2E2;
    background: #fff !important;
  }
  .text-Right{
    text-align: right;
  }
  .skipLand{
    position: relative;
    width: 100%;
    margin-top: 4vw;
  }
  .skipLand>p{
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 4vw;
    line-height: 12vw;
    color: #15D49F;
  }
</style>

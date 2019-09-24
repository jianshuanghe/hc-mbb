<template>
  <div class="phoneBind-content">
    <topBox>
      <p class="title-putIn">更换手机号</p>
    </topBox>
    <div class="phoneBind">
      <div class="PB-top">
        <p class="">您当前绑定的手机号码为：<span class="phoneNum">{{UserData.userPhone}}</span></p>
        <p class="GH-PB">更换后可用新手机号登录</p>
        <div class="PB-subStep">
          <div class="substep">
            <div class="ST-items left">
              <div class="ST-box" @click="clickStep(1)">
                <div class="ST-img isST-div">
                  <p class="">1</p>
                  <div class="line line-right isST-line"></div>
                </div>
                <p class="isST-p">输入新手机号</p>
              </div>
            </div>
            <div class="ST-items left">
              <div class="ST-box"  @click="clickStep(2)">
                <div class="ST-img" :class="!isShow ? 'isST-div' : '' ">
                  <p class="">2</p>
                  <div class="line line-left " :class="!isShow ? 'isST-line' : '' "></div>
                </div>
                <p :class="!isShow ? 'isST-p' : '' ">验证并绑定</p>
              </div>
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </div>
      <div class="MGT"></div>
      <div class="input-PB">
        <div class="input-PB-box" v-show="isShow">
          <x-input name="mobile" placeholder="请输入您要绑定的手机号" keyboard="number" :show-clear='false'  v-model="phoneLand.phone"></x-input>
          <div class="line"></div>
        </div>
        <!--验证码-->
        <div class="input-PB-box" v-if="!isShow">
          <div class="yan-left-PLR left">
            <x-input name="mobile" placeholder="请输入验证码" keyboard="number" :show-clear='false'  v-model="phoneLand.code"></x-input>
          </div>
          <div class="ma-right-PLR left">
            <div v-bind:class="{ yazm: isOvertime , 're-yazm': !isOvertime }" slot="right" type="primary" action-type="button" mini @click="sendMessage">{{word}}</div>
          </div>
          <div class="clear"></div>
          <div class="line"></div>
        </div>
      </div>
      <div class="">
        <div :class="phoneLand.phone ? 'btn-RB' : 'btn-RB2'" v-if="isShow"  @click="clickNextStep">
          <p class="">下一步</p>
        </div>
        <div :class="phoneLand.phone && phoneLand.code ? 'btn-RB' : 'btn-RB2'" v-if="!isShow" @click="clickUpData">
          <p class="">完成绑定</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { XInput } from 'vux';
  import topBox from './../../../../common/topBox';
  import { mapMutations, mapGetters } from 'vuex';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
    export default {
        name: 'phoneBind',
        components: {
          XInput,
          topBox
        },
        data () {
          return {
            UserData: {},
            phoneLand: { // 账号登录
              phone: '',
              code: '',
              passWord: '' // 设置密码
            },
            isShow: true, // 显示
            loadingShow: false, // loading
            isOvertime: false,
            word: '发送验证码',
            setPassWorld: false // 设置密码，true，需要用户设置密码
          };
        },
        computed: {
          ...mapGetters(['SETUP'])
        },
        created () {
          this.UserData = this.SETUP.setUpData;
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          clickStep (e) {
            console.log('触发步进器');
            if (e === 1) {
              if (this.isShow !== true) {
                this.isShow = !this.isShow;
              };
            };
            if (e === 2) {
              this.clickNextStep();
            };
          },
          sendMessage () {
            if (this.isOvertime) {
              return false;
            }
            this.getCode();  // 获取验证码方法
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
          clickNextStep () {
           console.log('触发下一步');
            let phone = this.phoneLand.phone;
            if (phone === '') { // 校验手机号不能为空
              Toast('手机号为不能为空');
              return false;
            };
            if (!(/^1[34578]\d{9}$/.test(phone))) { // 校验手机号格式
              Toast('手机号码有误,请重填');
              return false;
            };
            if (phone === this.UserData.userPhone) {
              Toast('不能和当前已经绑定的手机号相同');
              return false;
            } else {
              this.isShow = !this.isShow;
            };
          },
          clickUpData () {
            console.log('触发完成绑定');
            let params = {
              phone: this.phoneLand.phone,
              businessName: '1',
              phoneCode: this.phoneLand.code,
              portal: 'ruhexiu'
            };
            if (this.EVN === 'production') {
              axios.defaults.baseURL = this.apiProd1;
            }
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            axios.post(this.api1 + '/rest-sso/phoneSmsVali', params).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                Toast('验证码校验成功！');
                let paramsData = {
                  userPhone: this.phoneLand.phone
                };
                this.upDataUser(paramsData);
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
          upDataUser (params) {
            console.log('更新手机号数据');
            if (localStorage.getItem('landRegist')) {
              this.$store.commit('setLoadingShow', true); // 更新vuex loading
              let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
              console.log(landRegistLG.user.id);
              if (this.EVN === 'production') {
                axios.defaults.baseURL = this.apiProd2;
              }
              axios.post(this.api2 + '/rest-rp/user/' + landRegistLG.user.id, params).then((response) => {
                console.log(response);
                if (response.data.ret === '200') {
                  this.$store.commit('setLoadingShow', false); // 更新vuex loading
                  Toast('更新成功！');
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
          }
        }
      };
</script>

<style scoped>
  .phoneBind-content{
    position: fixed;
    width: 100%;
    min-height: 100vh;
    background: #fff;
    overflow: scroll;
    -webkit-overflow-scrolling:touch;
  }
  .MGT{
    position: relative;
    width: 100%;
    height: 1.5vw;
    background: #F9F9F9;
  }
  .phoneBind{
    position: relative;
    width: 100%;
  }
  .PB-top{
    position: relative;
    width: 100%;
    padding: 4vw;
    background: #fff;
  }
  .PB-top>p{
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #2E2E30;
    text-align: center;
    line-height: 11vw;
  }
  .phoneNum{
    color: #02C2A2 !important;
  }
  .GH-PB{
    position: relative;
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #9B9B9B;
    text-align: center;
  }
  .PB-subStep{
    position: relative;
    width: 80%;
    margin: auto;
    margin-top: 6vw;
  }
  .substep{
    position: relative;
    width: 100%;
  }
  .ST-items{
    position: relative;
    width: 50%;
  }
  .ST-box{
    position: relative;
    width: 100%;
  }
  .ST-box>p{
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #2E2E30;
    line-height: 10vw;
    text-align: center;
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
  .ST-img{
    position: relative;
    width: 4.8vw;
    height: 4.8vw;
    background: #D2D2D2;
    border-radius: 50%;
    margin: auto;
  }
  .ST-img>p{
    width: 4.8vw;
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 4.8vw;
  }
  .line-left{
    position: absolute !important;
    right: 4.8vw !important;
    top: 2.4vw !important;
    width: 16.5vw !important;
  }
  .line-right{
    position: absolute !important;
    left: 4.8vw !important;
    top: 2.4vw !important;
    width: 16.5vw !important;
  }
  .isST-div{
    background: #24D5AA !important;
  }
  .isST-line{
    background: #24D5AA !important;
  }
  .isST-p{
    color: #24D5AA !important;
  }

  .input-PB{
    position: relative;
    width: 100%;
    background: #ffffff;
  }
  .input-PB-box{
    position: relative;
    width: 100%;
    padding: 4vw;
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
  .ma-right-PLR>p{
    font-family: PingFangSC-Light;
    font-size: 4vw;
    color: #02C2A2;
    line-height: 12vw;
    text-align: right;
  }




  .btn-RB{
    position: relative;
    width: 100%;
    padding: 4vw;
    margin-top: 6vw;
  }
  .btn-RB>p{
    background: #02C2A2;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 12vw;
  }

  .btn-RB2{
    position: relative;
    width: 100%;
    padding: 4vw;
    margin-top: 6vw;
    opacity: 0.5;
  }
  .btn-RB2>p{
    background: #02C2A2;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 12vw;
  }
</style>

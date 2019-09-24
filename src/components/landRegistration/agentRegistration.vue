<template>
  <div class="landRegistration-content">
    <div class="landRegistration" v-if="isSuccess">
      <div class="phone-passWord-LR">
        <!--手机号登录-->
        <div class="phonw-LR">
          <div class="top-PLR">
            <div class="agent-box">
              <div class="ag-img left">
                <img :src="touXiang" alt="" class="">
              </div>
              <p class="left">代理商名称的管理员</p>
              <div class="clear"></div>
            </div>
            <p class="">邀请您加入膜拜商机</p>
            <p class="GB">帮助您快速低价获取谷歌、百度、今日头条等
              多个平台的用户流量</p>
          </div>
          <div class="LR-cont">
            <div class="inputPhone-PLR">
              <x-input name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
              <div class="line"></div>
            </div>
            <div class="inputYan-PLR">
              <div class="yan-left-PLR left">
                <x-input name="mobile" placeholder="请输入验证码" keyboard="number" is-type="china-mobile"></x-input>
              </div>
              <div class="ma-right-PLR left">
                <p class="">获取验证码</p>
              </div>
              <div class="clear"></div>
              <div class="line"></div>
            </div>
          </div>
          <div class="inputPhone-PLR">
            <x-input name="mobile" placeholder="请设置登录密码" type="password" keyboard="number" is-type="china-mobile"></x-input>
            <div class="line"></div>
          </div>
        </div>
        <!--登录按钮-->
        <div class="landBtn">
          <div class="">
            <!--登录-->
            <div class="land-btn-box" @click="clickAgentRegistration">
              <p class="">注册</p>
            </div>
            <p class="XieYi">注册即表示您已同意陌拜商机的 <span class="XY-span">《用户协议》</span></p>
          </div>
        </div>
      </div>
    </div>
    <agentSuccess v-else></agentSuccess>
  </div>
</template>

<script>
  import { XInput } from 'vux';
  import touXiang from '@/assets/images/business/home/extendManageList/touxiang.png';
  import agentSuccess from './agentSuccess';
  export default {
    name: 'agentRegistration',
    components: {
      XInput,
      agentSuccess
    },
    data () {
      return {
        touXiang: touXiang,
        isSuccess: true // 授权状态 true授权成功
      };
    },
    created () {},
    mounted () {},
    methods: {
      clickAgentRegistration () {
        console.log('触发注册按钮');
        this.isSuccess = true; // 注册成功显示
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
  .agent-box{
    position: relative;
    width: 100%;
  }
  .ag-img{
    position: relative;
    width: 12%;
  }
  .ag-img>img{
    position: relative;
    width: 8vw;
    height: 8vw;
    margin-top: 2vw;
    border-radius: 50%;
  }
  .agent-box>p{
    font-family: PingFangSC-Light;
    font-size: 4vw;
    color: #2E2E30;
    line-height: 12vw;
  }
  .top-PLR>p{
    font-family: PingFangSC-Semibold;
    font-size: 6.4vw;
    color: #2E2E30;
    line-height: 10vw;
  }
  .GB{
    font-size: 4vw !important;
    color: #9B9B9B !important;
    line-height: 5vw !important;
    margin-top: 2vw;
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
  .ma-right-PLR>p{
    font-family: PingFangSC-Light;
    font-size: 4vw;
    color: #02C2A2;
    line-height: 12vw;
    text-align: right;
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
  .XieYi{
    position: relative;
    width: 100%;
  }
  .XieYi{
    ont-family: PingFangSC-Light;
    font-size: 3.5vw;
    color: #9B9B9B;
  }
  .XY-span{
    color: #02C2A2;
  }
</style>

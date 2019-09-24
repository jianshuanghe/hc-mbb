<template>
    <div class="agentSuccess-conetnt">
      <div class="agentSuccess">
        <div class="top-AS">
          <div class="success-AS">
            <img :src="success" alt="" class="">
          </div>
          <p class="title-AS">授权成功</p>
          <p class="text-AS">恭喜您已授权代理商</p>
        </div>
        <div class="cont-AS">
          <div class="agent-items">
            <div class="AI-left left">
              <p class="">代理商名称:</p>
            </div>
            <div class="AI-right left">
              <p class="">我是代理商</p>
            </div>
            <div class="clear"></div>
            <div class="line"></div>
          </div>
          <div class="agent-items">
            <div class="AI-left left">
              <p class="">工作人员:</p>
            </div>
            <div class="AI-right left">
              <p class="">我是工作人员</p>
            </div>
            <div class="clear"></div>
            <div class="line"></div>
          </div>
          <div class="agent-items">
            <div class="AI-left left">
              <p class="">联系电话:</p>
            </div>
            <div class="AI-right left">
              <p class="">134 1224 3698</p>
            </div>
            <div class="clear"></div>
            <div class="line"></div>
          </div>
        </div>
        <div class="btn-AS">
          <div class="btn-left-AS left">
            <p class="">加入会员</p>
          </div>
          <div class="btn-right-AS right">
            <p class="">推广投放</p>
          </div>
          <div class="clear"></div>
        </div>
        <div class="goToMB">
          <p class="">进入我的陌拜商机</p>
        </div>
      </div>
      <div class="bottom-AS">
        <div class="imgLogo">
          <img :src="chanYeDai" alt="" class="">
        </div>
      </div>
    </div>
</template>

<script>
  import success from '@/assets/images/business/home/extendManageList/success.png';
  import chanYeDai from '@/assets/images/business/home/extendManageList/chanyedai.png';
    export default {
        name: 'agentSuccess',
        components: {
        },
        data () {
          return {
            success: success,
            chanYeDai: chanYeDai
          };
        },
        created () {},
        mounted () {},
        methods: {
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
  .agentSuccess-conetnt{
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #fff;
  }
  .agentSuccess{
    position: relative;
    width: 100%;
    padding: 7vw;
  }
  .top-AS{
    position: relative;
    width: 100%;
    margin-top: 3vw;
  }
  .success-AS{
    width: 10vw;
    margin: auto;
  }
  .success-AS>img{
    width: 10vw;
    margin: auto;
  }
  .title-AS{
    font-family: PingFangSC-Medium;
    font-size: 4.533vw;
    color: #2E2E30;
    letter-spacing: 0;
    text-align: center;
    line-height: 10vw;
  }
  .text-AS{
    position: relative;
    width: 100%;
    font-family: PingFang-SC-Medium;
    font-size: 4vw;
    color: #2E2E30;
    line-height: 8vw;
    text-align: center;
  }
  .cont-AS{
    position: relative;
    width: 100%;
    margin-top: 6vw;
  }
  .agent-items{
    position: relative;
    width: 100%;
  }
  .AI-left{
    position: relative;
    width: 50%;
  }
  .AI-left>p{
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #5D5D5D;
    line-height: 15vw;
  }
  .AI-right{
    position: relative;
    width: 50%;
  }
  .AI-right>p{
    font-family: PingFang-SC-Medium;
    font-size: 3.5vw;
    color: #2E2E30;
    line-height: 15vw;
    text-align: right;
  }
  .btn-AS{
    position: relative;
    width: 100%;
    margin-top: 18vw;
  }
  .btn-left-AS{
    position: relative;
    width: 48%;
  }
  .btn-left-AS>p{
    background: #02C2A2;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 12vw;
    position: relative;
    width: 100%;
    text-align: center;
  }
  .btn-right-AS{
    position: relative;
    width: 48%;
  }
  .btn-right-AS>p{
    border: 1px solid #E2E2E2;
    border-radius: 2px;
    position: relative;
    width: 100%;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 12vw;
  }
  .goToMB{
    position: relative;
    width: 100%;
  }
  .goToMB>p{
    font-family: PingFang-SC-Medium;
    font-size: 3.5vw;
    color: #02C2A2;
    line-height: 18vw;
    text-align: center;
    text-decoration:underline
  }
  .bottom-AS{
    position: relative;
    width: 100%;
    /* bottom: 13vw; */
    margin-bottom: 10vw;
  }
  .imgLogo{
    position: relative;
    width: 60vw;
    margin: auto;
  }
  .imgLogo>img{
    position: relative;
    width: 100%;
  }
</style>

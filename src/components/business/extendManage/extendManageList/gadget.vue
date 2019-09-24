<template>
  <div class="content">
    <div class="gadget-box">
      <div class="gadget-title">
        <p class="">小工具</p>
      </div>
      <div class="gadget-cont">
        <div class="gadget-toufang left">
          <div class="conten-box" @click="goToPutInBusiness">
            <div class="img left">
              <img src="./../../../../assets/images/business/home/extendManageList/toufang.png" alt="" class="">
            </div>
            <div class="text left">
              <p class="title">投放管理</p>
              <p class="text-box">便捷管理商机信息</p>
            </div>
            <div class="clear"></div>
          </div>
        </div>
        <div class="gadget-toufang left">
          <div class="conten-box" @click="goToDataReport">
            <div class="img left">
              <img src="./../../../../assets/images/business/home/extendManageList/shuju.png" alt="" class="">
            </div>
            <div class="text left">
              <p class="title">数据报表</p>
              <p class="text-box">实时查看投放数据</p>
            </div>
            <div class="clear"></div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'gadget',
      data () {
        return {};
      },
      created () {},
      mounted () {},
      methods: {
        goToPutInBusiness () {
          console.log('to投放商机');
          this.$router.push({
            path: '/putInBusiness',
            query: { }
          });
        },
        goToDataReport () {
          console.log('to数据报表');
          this.$router.push({
            path: '/dataReport',
            query: { }
          });
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
    margin-bottom: 1.5vw;
  }
  .gadget-box{
    position: relative;
    width: 100%;
    padding-bottom: 2vw;
  }
  .gadget-title{
    position: relative;
    width: 100%;
  }
  .gadget-title>p {
    position: relative;
    width: 100%;
    font-family: PingFang-SC-Bold;
    font-size: 4.26vw;
    color: #2E2E30;
    line-height: 6vw;
  }
  .gadget-cont{
    position: relative;
    width: 100%;
  }
  .gadget-toufang{
    position: relative;
    width: 50%;
  }
  .conten-box{
    position: relative;
    width: 100%;
  }
  .img{
    position: relative;
    width: 30%;
    padding-left: 5%;
  }
  .img>img{
    position: relative;
    width: 6vw;
    height: 6vw;
    margin-top: 2vw;
  }
  .text{
    position: relative;
    width: 70%;
  }
  .title{
    font-family: PingFang-SC-Bold;
    font-size: 3.7vw;
    color: #2E2E30;
    line-height: 5vw;
  }
  .text-box{
    font-family: PingFang-SC-Medium;
    font-size: 3.2vw;
    color: #9B9B9B;
    line-height: 6vw;
  }
</style>

<template>
  <div class="memberCenterTips-content">
    <div class="memberCenterTips">
      <div class="MCT-type-box">
        <div class="MCT-text left">
          <!--<p class="">开通企业孵化器的会员，还可享受更多免费服务哦</p>-->
          <p class="">开通陌拜商机的会员，还可享受更多免费服务哦</p>
        </div>
        <div class="MCT-open right">
          <div class="MCT-opne-Img" @click="goToBuyMember">
            <p class="">去开通</p>
            <img :src="rightArrow" alt="" class="MCTopne-Img">
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
      import rightArrow3 from '@/assets/images/business/home/extendManageList/rightArrow3.png';
      export default {
        name: 'memberCenterTips',
        components: {
        },
        data () {
          return {
            rightArrow: rightArrow3 // 右侧箭头
          };
        },
        methods: {
          goToBuyMember () {
            console.log('to购买会员');
            this.$router.push({
              path: '/buyMember',
              query: { }
            });
          }
        }
      };
</script>

<style scoped>
  .memberCenterTips-content{
    position: relative;
    width: 100%;
  }
  .memberCenterTips{
    position: relative;
    width: 100%;
    padding: 0 4vw 0 4vw;
    background: #FEEEC7;
  }
  .MCT-type-box{
    position: relative;
    width: 100%;
  }
  .MCT-text{
    position: relative;
    width: 80%;
  }
  .MCT-text>p{
    font-family: PingFang-SC-Medium;
    font-size: 3.2vw;
    color: #FAB100;
    letter-spacing: 0;
    line-height: 9vw;
  }
  .MCT-open{
    position: relative;
    width: 20%;
  }
  .MCT-opne-Img{
    position: relative;
    width: 100%;
  }
  .MCT-opne-Img>p{
    font-family: PingFang-SC-Medium;
    font-size: 3.2vw;
    color: #FAB100;
    letter-spacing: 0;
    line-height: 9vw;
    text-align: right;
    margin-right: 4vw;
  }
  .MCTopne-Img{
    position: absolute;
    width: 3.2vw;
    height: 3.2vw;
    margin-top: 2.8vw;
    right: 0;
    top: 0;
  }
</style>

<template>
  <div class="MCY-content">
    <div class="MCY-Box">
      <div class="MCY-top">
        <div class="title-MCY">
          <p class="">会员权益</p>
        </div>
      </div>
      <div class="MCY-cont">
        <div class="MCY-items">
          <div class="MCY-left left">
            <img :src="vip2" alt="" class="">
          </div>
          <div class="MCY-right left">
            <p class="title-MCY-items">各大流量平台推广，价格更优</p>
            <p class="text-MCY-items">多个流量平台精准推广，花更少的钱获取更多用户</p>
          </div>
          <div class="clear"></div>
        </div>
        <div class="MCY-items">
          <div class="MCY-left left">
            <img :src="vip1" alt="" class="">
          </div>
          <div class="MCY-right left">
            <p class="title-MCY-items">制作投放全流程，专业人员跟进指导</p>
            <p class="text-MCY-items">由专业人员帮你制作投放说明书，方便快捷</p>
          </div>
          <div class="clear"></div>
        </div>
        <div class="MCY-items">
          <div class="MCY-left left">
            <img :src="vip3" alt="" class="">
          </div>
          <div class="MCY-right left">
            <p class="title-MCY-items">更多创意模版免费使用</p>
            <p class="text-MCY-items">免费使用定制模版和多种行业模版</p>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
    import vip1 from '@/assets/images/business/home/personCenter/vip1.png';
    import vip2 from '@/assets/images/business/home/personCenter/vip2.png';
    import vip3 from '@/assets/images/business/home/personCenter/vip3.png';
    export default {
        name: 'memberCenterEquity',
        components: {
        },
        data () {
          return {
            vip1: vip1,
            vip2: vip2,
            vip3: vip3
          };
        },
        created () {},
        mounted () {},
        methods: {
        }
      };
</script>

<style scoped>
  .MCY-content{
    position: relative;
    width: 100%;
    background: #fff;
  }
  .MCY-Box{
    position: relative;
    width: 100%;
    padding: 4vw;
  }
  .MCY-top{
    position: relative;
    width: 100%;
  }
  .title-MCY{
    position: relative;
    width: 100%;
  }
  .title-MCY>p{
    font-family: PingFangSC-Semibold;
    font-size: 5.33vw;
    color: #2E2E30;
    text-align: left;
    line-height: 12vw;
  }
  .MCY-cont{
    position: relative;
    width: 100%;
    margin-bottom: 5vw;
  }
  .MCY-items{
    position: relative;
    width: 100%;
    padding: 4vw 0 2vw 0;
  }
  .MCY-left{
    position: relative;
    width: 12.66vw;
    height: 12.66vw;
    border-radius: 50%;
    background: #E2F8F5;
    margin-right: 3vw;
  }
  .MCY-left>img{
    position: absolute;
    top:50%;
    left:50%;
    width:100%;
    transform:translate(-50%,-50%);
    width: 11vw;
    height: 11vw;
  }
  .MCY-right{
    position: relative;
    width: 80%;
  }
  .title-MCY-items{
    font-family: PingFang-SC-Bold;
    font-size: 3.733vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 8vw;
  }
  .text-MCY-items{
    font-family: PingFang-SC-Regular;
    font-size: 3.2vw;
    color: #9B9B9B;
    line-height: 4vw;
  }
</style>

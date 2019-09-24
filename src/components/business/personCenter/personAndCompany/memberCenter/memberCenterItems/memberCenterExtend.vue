<template>
  <div class="MCY-content">
    <div class="MCY-Box">
      <div class="MCY-top">
        <div class="title-MCY">
          <p class="">自主推广</p>
        </div>
        <div class="derc-MCY">
          <p class="">平台即将推出商家自主推广计划，一次只需几毛钱，即可让社交平台的好友自发传播推广，敬请期待～</p>
        </div>
      </div>
      <div class="MCY-cont">
        <div class="MCY-img-Box">
          <div class="MCY_Items-img">
            <img :src="copy3" alt="" class="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import copy3 from '@/assets/images/business/home/personCenter/copy3.png';
  export default {
    name: 'memberCenterExtend',
    components: {
    },
    data () {
      return {
        copy3: copy3
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
    margin-bottom: 7vw;
  }
  .MCY-top{
    position: relative;
    width: 100%;
    padding: 0 4vw;
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
  .derc-MCY{
    position: relative;
    width: 100%;
    margin-bottom: 4vw;
  }
  .derc-MCY>p{
    font-family: PingFang-SC-Medium;
    font-size: 4.266vw;
    color: #2E2E30;
    line-height: 7vw;
  }
  .MCY-cont{
    position: relative;
    width: 100%;
    padding: 2vw;
  }
  .MCY-img-Box{
    position: relative;
    width: 100%;
  }
  .MCY-img-Box{
    position: relative;
    width: 100%;
  }
  .MCY_Items-img{
    position: relative;
    width: 100%;
    background: #FFFFFF;
    border-radius: 4px;
  }
  .MCY_Items-img>img{
    position: relative;
    width: 100%;
    height: 49.06vw;
  }
</style>

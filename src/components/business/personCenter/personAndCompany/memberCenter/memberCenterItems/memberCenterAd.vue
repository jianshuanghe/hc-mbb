<template>
  <div class="MCY-content">
    <div class="MCY-Box">
      <div class="MCY-top">
        <div class="title-MCY">
          <p class="">广告投放</p>
        </div>
        <div class="derc-MCY">
          <p class="">两大流量平台</p>
        </div>
      </div>
      <div class="MCY-cont">
        <div class="MCY-BT">
          <div class="MCY-BT-img left">
            <img :src="baiDu" alt="" class="">
          </div>
          <div class="MCY-BT-img right">
            <img :src="touTiao" alt="" class="">
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import baiDu from '@/assets/images/business/home/personCenter/baidu.png';
  import touTiao from '@/assets/images/business/home/personCenter/toutiao.png';
  export default {
    name: 'memberCenterAd',
    components: {
    },
    data () {
      return {
        baiDu: baiDu,
        touTiao: touTiao
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
  }
  .MCY-BT{
    position: relative;
    width: 100%;
    padding: 0 4vw 5vw 4vw;
  }
  .MCY-BT-img{
    position: relative;
    width: 45%;
  }
  .MCY-BT-img>img{
    position: relative;
    width: 100%;
    height: 26.06vw;
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

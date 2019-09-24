<template>
  <div class="MCY-content">
    <div class="MCY-Box">
      <div class="MCY-top">
        <div class="derc-MCY">
          <p class="">自助化投放工具</p>
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
  import copy3 from '@/assets/images/business/home/personCenter/copy1.png';
  export default {
    name: 'memberCenterPutIn',
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

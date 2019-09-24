<template>
  <div class="top-box-title">
    <div class="quickBtn-search">
      <div class="quickBtn-Fd left">
        <quickBtn></quickBtn>
      </div>
      <div class="search-Fd left">
        <slot></slot>
      </div>
      <div class="clear"></div>
    </div>
  </div>

</template>

<script>
    import quickBtn from './quickBtn';
    export default {
        name: 'topBox',
      components: {
        quickBtn
      }
    };
</script>

<style scoped>
  .top-box-title{
    position: relative;
    height: 12vw;
  }
  .quickBtn-search{
    position: fixed;
    width: 100vw;
    padding: 2vw 4vw;
    background: #fff;
    z-index: 9999;
    height: 12vw;
    background: #FFFFFF;
    box-shadow: 0 1px 0 0 #F5F5F5;
  }
  .quickBtn-Fd{
    position: relative;
    width: 6%;
  }
  .search-Fd{
    position: relative;
    width: 94%;
  }
  .title-putIn{
    position: relative;
    width: 100%;
    text-align: center;
    line-height: 7vw;
    font-size: 3.733vw;
  }
  .right-title{
    position: absolute;
    right: 0;
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #02C2A2;
    letter-spacing: 0;
    text-align: center;
    line-height: 7vw;
    top: 0;
  }
</style>

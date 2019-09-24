<template>
  <div class="runWater">
    <!--账户-->
    <runWaterAccount></runWaterAccount>
    <!--报表-->
    <reportFrom></reportFrom>
  </div>
</template>

<script>
  import runWaterAccount from './runWaterItems/runWaterAccount';
  import reportFrom from './runWaterItems/reportFrom';
  export default {
    name: 'runWater',
    components: {
      runWaterAccount,
      reportFrom
    }
  };
</script>

<style scoped>
  .runWater{
    position: fixed;
    height: 96vh;
    overflow: scroll;
    padding-bottom: 5vh;
    -webkit-overflow-scrolling:touch;
  }
</style>

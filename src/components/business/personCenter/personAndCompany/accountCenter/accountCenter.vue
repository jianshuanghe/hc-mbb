<template>
  <div class="accountCenter-content">
    <topBox>
      <surveyRunWaterTitle></surveyRunWaterTitle>
    </topBox>
    <!--账户概况-->
    <survey v-if="clickItemsIndex === 1"></survey>
    <!--账户流水-->
    <runWater v-if="clickItemsIndex === 2"></runWater>
  </div>
</template>

<script>
  import topBox from './../../../../common/topBox';
  import surveyRunWaterTitle from './surveyAndrunWater/surveyRunWaterTitle';
  import survey from './surveyAndrunWater/survey';
  import runWater from './surveyAndrunWater/runWater';
  import { mapGetters } from 'vuex';
    export default {
        name: 'accountCenter',
        components: {
          topBox,
          surveyRunWaterTitle,
          survey,
          runWater
        },
        data () {
          return {
            clickItemsIndex: 1 // 用户切换类型
          };
        },
        computed: {
          ...mapGetters(['ACCOUNTCENTER'])
        },
        watch: {
          ACCOUNTCENTER: {
            handler (a, b) {
              this.clickItemsIndex = a.accountCenterTitle; // 侦听切换类型
            },
            deep: true
          }
        }
      };
</script>

<style scoped>
  .accountCenter-content{
    position: fixed;
    width: 100%;
    min-height: 100vh;
    background: #cccccc14;
  }
</style>

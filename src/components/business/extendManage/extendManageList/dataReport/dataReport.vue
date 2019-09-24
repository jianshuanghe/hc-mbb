<template>
  <div class="dataReport_content">
    <topBox>
      <p class="title-putIn">效果分析</p>
      <p class="right-title" @click="clickBusinessPutIn">商机投放 <span class="right-arrow"><img :src="rightArrow" alt="" class="rightArrow"></span></p>
    </topBox>
    <businessPutIn v-if="PUTINBUSINESS.putInBusinessShow"></businessPutIn>
    <dataTrendKanban></dataTrendKanban>
  </div>
</template>

<script>
    import topBox from './../../../../common/topBox';
    import businessPutIn from './dataReportItems/businessPutIn';
    import dataTrendKanban from './dataReportItems/dataTrendKanban';
    import rightArrow from '@/assets/images/business/home/extendManageList/rightArrow4.png';
    import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'dataReport',
        components: {
          topBox,
          businessPutIn,
          dataTrendKanban
        },
        data () {
          return {
            rightArrow: rightArrow,
            putInBusinessShow: false // 商机投放组件显示，默认为false
          };
        },
        computed: {
        ...mapGetters(['PUTINBUSINESS'])
        },
        watch: {
          PUTINBUSINESS: {
            handler (a, b) {
              this.putInBusinessShow = a.putInBusinessShow; // 商机投放组件显示
            },
            deep: true
          }
        },
        methods: {
          ...mapMutations({
            setPutInBusinessShow: 'setPutInBusinessShow'
          }),
          clickBusinessPutIn () {
            this.putInBusinessShow = true;
            this.$store.commit('setPutInBusinessShow', this.putInBusinessShow);
            console.log('触发商机投放组件按钮');
          }
        }
      };
</script>

<style scoped>
  .dataReport_content{
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #F6F6F6;
  }
  .right-arrow{
    position: relative;
    width: 2vw;
  }
  .rightArrow{
    position: relative;
    width: 3.2vw;
    top: 0.6vw;
  }
</style>

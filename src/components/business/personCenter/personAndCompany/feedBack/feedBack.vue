<template>
   <div class="feedBack-content">
     <topBox>
       <feedBackTitle></feedBackTitle>
     </topBox>
     <opinion  v-if="clickItemsIndex === 1"></opinion>
     <myOpinion  v-if="clickItemsIndex === 2"></myOpinion>
   </div>
</template>

<script>
  import topBox from './../../../../common/topBox';
  import feedBackTitle from './feedBackItems/feedBackTitle';
  import opinion from './feedBackItems/opinion';
  import myOpinion from './feedBackItems/myOpinion';
  import { mapGetters } from 'vuex';
    export default {
        name: 'feedBack',
        components: {
          topBox,
          feedBackTitle,
          opinion,
          myOpinion
        },
        data () {
          return {
            clickItemsIndex: 1 // 用户切换类型
          };
        },
        computed: {
          ...mapGetters(['FEEDBACK'])
        },
        watch: {
          FEEDBACK: {
            handler (a, b) {
              this.clickItemsIndex = a.feedBackTitle; // 侦听切换类型
            },
            deep: true
          }
        }
      };
</script>

<style scoped>
  .feedBack-content{
    position: fixed;
    width: 100%;
    min-height: 100vh;
    background: #fff;
    overflow: scroll;
    -webkit-overflow-scrolling:touch;
  }
</style>
